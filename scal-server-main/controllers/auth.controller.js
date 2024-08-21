const User = require('../model/auth.model');
const sgMail = require('@sendgrid/mail');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../helpers/dbErrorHandling');

dotenv.config();

// Configure SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Register controller
exports.registerController = (req, res) => {
  console.log("Request Body:", req.body);
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log("Validation Error:", firstError);
    return res.status(422).json({ errors: firstError });
  }

  User.findOne({ email }).exec((err, user) => {
    if (err) {
      console.log("Database Error:", err);
      return res.status(500).send('Server error');
    }

    if (user) {
      console.log("User Exists Error:", 'User with this email exists');
      return res.status(400).send('User with this email exists');
    }

    const verificationToken = jwt.sign({ email }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '7d' });
    const newUser = new User({
      name,
      email,
      password,
      isEmailVerified: false,
      emailVerificationToken: verificationToken,
      emailVerificationTokenExpiry: Date.now() + 24 * 60 * 60 * 1000 // Token valid for 24 hours
    });

    newUser.save((err, user) => {
      if (err) {
        console.log("Save Error:", err);
        return res.status(401).send(errorHandler(err));
      }

      const emailData = {
        from: process.env.SENDGRID_FROM_EMAIL,
        to: email,
        subject: 'Activate Your Account',
        html: `
          <html>
            <body>
              <h1>Welcome to SCAL - by Frontal Labs</h1>
              <p>Please use the following link to activate your account:</p>
              <a href="${process.env.CLIENT_URL}/users/activate/${verificationToken}">Activate your account</a>
            </body>
          </html>
        `
      };

      sgMail.send(emailData)
        .then(() => {
          console.log("Email Sent Successfully");
          return res.json({ message: `Activation link has been sent to ${email}. Please activate your account and login.` });
        })
        .catch((error) => {
          console.log("SendGrid Error:", error);
          return res.status(400).json({ success: false, errors: errorHandler(error) });
        });
    });
  });
};

// Login controller
exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log("Validation Error:", firstError);
    return res.status(422).json({ errors: firstError });
  }

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      console.log("User Not Found Error:", err || 'User with that email does not exist.');
      return res.status(400).json({ errors: 'User with that email does not exist. Please register.' });
    }

    if (!user.authenticate(password)) {
      console.log("Authentication Error:", 'Email and password do not match');
      return res.status(400).json({ errors: 'Email and password do not match' });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role }
    });
  });
};

// Forgot password controller
exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log("Validation Error:", firstError);
    return res.status(422).json({ errors: firstError });
  }

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      console.log("User Not Found Error:", err || 'User with that email does not exist.');
      return res.status(400).json({ errors: 'User with that email does not exist. Please register.' });
    }

    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

    const emailData = {
      from: process.env.SENDGRID_FROM_EMAIL,
      to: email,
      subject: 'Password Reset Link',
      html: `
        <h1>Please use the following link to reset your password</h1>
        <p>${process.env.CLIENT_URL}/password/reset/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `
    };

    user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        console.log("Reset Password Link Error:", err);
        return res.status(400).json({ errors: errorHandler(err) });
      } else {
        sgMail.send(emailData)
          .then(() => {
            console.log("Email Sent Successfully");
            return res.json({ message: `Email has been sent to ${email}. Follow the instructions to reset your password.` });
          })
          .catch((error) => {
            console.log("SendGrid Error:", error);
            return res.status(400).json({ errors: errorHandler(error) });
          });
      }
    });
  });
};

// Reset password controller
exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log("Validation Error:", firstError);
    return res.status(422).json({ errors: firstError });
  }

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
      if (err) {
        console.log("JWT Verify Error:", err);
        return res.status(400).json({ errors: 'Expired link. Try again.' });
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          console.log("User Not Found Error:", err || 'Something went wrong. Try later.');
          return res.status(400).json({ errors: 'Something went wrong. Try later.' });
        }

        const updatedFields = {
          password: newPassword,
          resetPasswordLink: ''
        };

        user = Object.assign(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            console.log("Save Reset Password Error:", err);
            return res.status(400).json({ errors: errorHandler(err) });
          }
          res.json({
            message: `Great! Now you can login with your new password.`
          });
        });
      });
    });
  } else {
    console.log("Reset Password Link Missing Error:", 'Authentication error!');
    return res.status(400).json({ errors: 'Authentication error!' });
  }
};

// Email verification controller
exports.verifyEmailController = (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);

    User.findOne({ email: decoded.email }).exec((err, user) => {
      if (err || !user) {
        console.log("Verification Error:", err || 'User not found');
        return res.status(400).json({ success: false, errors: 'User not found' });
      }

      if (user.isEmailVerified) {
        console.log("User Already Verified");
        return res.status(400).json({ success: false, errors: 'Account already verified' });
      }

      user.isEmailVerified = true;
      user.emailVerificationToken = undefined;
      user.emailVerificationTokenExpiry = undefined;

      user.save((err) => {
        if (err) {
          console.log("Save Verification Error:", err);
          return res.status(500).json({ success: false, errors: 'Error verifying account' });
        }

        res.json({ success: true, message: 'Account successfully verified' });
      });
    });
  } catch (error) {
    console.log("JWT Error:", error);
    res.status(400).json({ success: false, errors: 'Invalid or expired token' });
  }
};
