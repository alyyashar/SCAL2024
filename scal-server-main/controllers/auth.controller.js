const User = require('../model/auth.model');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../helpers/dbErrorHandling');
const _ = require('lodash');

dotenv.config();

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_FROM,
    pass: process.env.MAIL_PASS
  }
});

exports.registerController = (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({ errors: firstError });
  }

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).send('User with this email exists');
    }

    const newUser = new User({ name, email, password });

    newUser.save((err, user) => {
      if (err) {
        return res.status(401).send(errorHandler(err));
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

      const emailData = {
        from: 'Spinwash <noreply@spinwash.co.uk>',
        to: email,
        subject: 'Activate Your Account',
        html: `
          <html>
            <body>
              <h1>Welcome to Spinwash</h1>
              <p>Please use the following link to activate your account:</p>
              <a href="${process.env.CLIENT_URL}/users/activate/${token}">Activate your account</a>
            </body>
          </html>
        `
      };

      transporter.sendMail(emailData, (err, info) => {
        if (err) {
          return res.status(400).json({ success: false, errors: errorHandler(err) });
        }
        return res.json({ message: `Activation link has been sent to ${email}` });
      });
    });
  });
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({ errors: firstError });
  }

  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).send('Email does not exist. Please register');
    }

    if (!user.authenticate(password)) {
      return res.status(400).send('Wrong Password. Try Again');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    const { _id, profilePicture, name, email, role, bio } = user;
    return res.json({ token, user: { _id, profilePicture, name, email, role, bio } });
  });
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({ errors: firstError });
  }

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).send('Email does not exist');
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD, { expiresIn: '10m' });

    return user.updateOne({ resetPasswordLink: token }, (err, success) => {
      if (err) {
        return res.status(400).json({ error: 'Database connection error on user forgot password request' });
      }

      const emailData = {
        from: process.env.MAIL_FROM,
        to: email,
        subject: 'Password Reset Link',
        html: `<p>Please use the following link to reset your password:</p>
               <a href="${process.env.CLIENT_URL}/users/password/reset/${token}">Reset Password</a>`
      };

      transporter.sendMail(emailData, (err, info) => {
        if (err) {
          return res.status(400).json({ success: false, errors: errorHandler(err) });
        }
        return res.json({ message: `Password reset link has been sent to ${email}` });
      });
    });
  });
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({ errors: firstError });
  }

  if (resetPasswordLink) {
    jwt.verify(resetPasswordLink, process.env.JWT_RESET_PASSWORD, (err, decoded) => {
      if (err) {
        return res.status(400).send('Expired link. Try again');
      }

      User.findOne({ resetPasswordLink }, (err, user) => {
        if (err || !user) {
          return res.status(400).send('Something went wrong. Try later');
        }

        const updatedFields = { password: newPassword, resetPasswordLink: '' };

        user = _.extend(user, updatedFields);

        user.save((err, result) => {
          if (err) {
            return res.status(400).send('Error resetting user password');
          }
          res.send('Great! Now you can login with your new password');
        });
      });
    });
  }
};
