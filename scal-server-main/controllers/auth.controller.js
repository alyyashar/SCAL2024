const User = require('../model/auth.model');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const _ = require('lodash');
const { validationResult } = require('express-validator');
const { errorHandler } = require('../helpers/dbErrorHandling');

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

  //custom validation
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log('inside empty error');
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    User.findOne({
      email,
    }).exec((err, user) => {
      if (user) {
        return res.status(400).send('User with this email exists');
      }
      console.log('this should not run with same email');

      const users = new User({
        name,
        email,
        password,
      });

      users.save((err, user) => {
        if (err) {
          return res.status(401).send(errorHandler(err));
        } else {
          return res.send('Registration Successfully');
        }
      });
      /*
          // Email Data
          const emailData = {
            from: 'Spinwash <noreply@spinwash.co.uk>',
            to: email,
            subject: 'Activate Your Account',
            html: `
            <!DOCTYPE html
      PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" style="
                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                box-sizing: border-box;
                font-size: 14px;
                margin: 0;
              ">
    
    <head>
      <meta name="viewport" content="width=device-width" />
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
      <title>Actionable emails e.g. reset password</title>
    
      <style type="text/css">
        img {
          max-width: 100%;
        }
    
        body {
          -webkit-font-smoothing: antialiased;
          -webkit-text-size-adjust: none;
          width: 100% !important;
          height: 100%;
          line-height: 1.6em;
        }
    
        body {
          background-color: #f6f6f6;
        }
    
        @media only screen and (max-width: 640px) {
          body {
            padding: 0 !important;
          }
    
          h1 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
    
          h2 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
    
          h3 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
    
          h4 {
            font-weight: 800 !important;
            margin: 20px 0 5px !important;
          }
    
          h1 {
            font-size: 22px !important;
          }
    
          h2 {
            font-size: 18px !important;
          }
    
          h3 {
            font-size: 16px !important;
          }
    
          .container {
            padding: 0 !important;
            width: 100% !important;
          }
    
          .content {
            padding: 0 !important;
          }
    
          .content-wrap {
            padding: 10px !important;
          }
    
          .invoice {
            width: 100% !important;
          }
        }
      </style>
    </head>
    
    <body itemscope itemtype="http://schema.org/EmailMessage" style="
                  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                  box-sizing: border-box;
                  font-size: 14px;
                  -webkit-font-smoothing: antialiased;
                  -webkit-text-size-adjust: none;
                  width: 100% !important;
                  height: 100%;
                  line-height: 1.6em;
                  background-color: #f6f6f6;
                  margin: 0;
                " bgcolor="#f6f6f6">
      <table class="body-wrap" style="
                    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                    box-sizing: border-box;
                    font-size: 14px;
                    width: 100%;
                    background-color: #f6f6f6;
                    margin: 0;
                  " bgcolor="#f6f6f6">
        <tr style="
                      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                      box-sizing: border-box;
                      font-size: 14px;
                      margin: 0;
                    ">
          <td style="
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        vertical-align: top;
                        margin: 0;
                      " valign="top"></td>
          <td class="container" width="600" style="
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        vertical-align: top;
                        display: block !important;
                        max-width: 600px !important;
                        clear: both !important;
                        margin: 0 auto;
                      " valign="top">
            <div class="content" style="
                          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                          box-sizing: border-box;
                          font-size: 14px;
                          max-width: 600px;
                          display: block;
                          margin: 0 auto;
                          padding: 20px;
                        ">
              <table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope
                itemtype="http://schema.org/ConfirmAction" style="
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            border-radius: 3px;
                            background-color: #fff;
                            margin: 0;
                            border: 1px solid #e9e9e9;
                          " bgcolor="#fff">
                <tr style="
                              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              margin: 0;
                            ">
                  <td class="content-wrap" style="
                                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                                box-sizing: border-box;
                                font-size: 14px;
                                vertical-align: top;
                                margin: 0;
                                padding: 20px;
                              " valign="top">
                    <meta itemprop="name" content="Confirm Email" style="
                                  font-family: 'Helvetica Neue', Helvetica, Arial,
                                    sans-serif;
                                  box-sizing: border-box;
                                  font-size: 14px;
                                  margin: 0;
                                " />
                    <table width="100%" cellpadding="0" cellspacing="0" style="
                                  font-family: 'Helvetica Neue', Helvetica, Arial,
                                    sans-serif;
                                  box-sizing: border-box;
                                  font-size: 14px;
                                  margin: 0;
                                ">
                      <tr style="
                                    font-family: 'Helvetica Neue', Helvetica, Arial,
                                      sans-serif;
                                    box-sizing: border-box;
                                    font-size: 14px;
                                    margin: 0;
                                  ">
                        <td class="content-block" style="
                                      font-family: 'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      box-sizing: border-box;
                                      font-size: 42px;
                                      letter-spacing: 8px;
                                      font-weight: 300;
                                      color: #1b4d7a;
                                      vertical-align: top;
                                      margin: 0;
                                      text-align: center;
                                      padding-top: 4rem;
                                    " valign="top">
                         SPINWASH
                        </td>
                      </tr>
                      <tr style="
                                    font-family: 'Helvetica Neue', Helvetica, Arial,
                                      sans-serif;
                                    box-sizing: border-box;
                                    font-size: 14px;
                                    margin: 0;
                                  ">
                        <td class="content-block" style="
                                      font-family: 'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      box-sizing: border-box;
                                      font-size: 15px;
                                      font-weight: 300;
                                      color: #1b4d7a;
                                      vertical-align: top;
                                      margin: 0;
                                      text-align: center;
                                      padding: 0.4rem;
                                      padding-bottom: 4rem;
                                    " valign="top">
                       YOUR CLOTHES DELIVERED IN A SPIN
                        </td>
                      </tr>
                      <tr style="
                                    font-family: 'Helvetica Neue', Helvetica, Arial,
                                      sans-serif;
                                    box-sizing: border-box;
                                    font-size: 14px;
                                    margin: 0;
                                  ">
                        <td class="content-block" style="
                                      font-family: 'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      box-sizing: border-box;
                                      font-size: 28px;
                                      font-weight: 500;
                                      color: #1b4d7a;
                                      vertical-align: top;
                                      margin: 0;
                                      text-align: center;
                                      padding: 0 0 10px;
                                    " valign="top">
                          Welcome to spinwash
                        </td>
                      </tr>
                      <tr style="
                                    font-family: 'Helvetica Neue', Helvetica, Arial,
                                      sans-serif;
                                    box-sizing: border-box;
                                    font-size: 14px;
                                    margin: 0;
                                  ">
                        <td class="content-block" style="
                                      font-family: 'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      box-sizing: border-box;
                                      font-size: 16px;
                                      font-weight: 200;
                                      text-align: center;
                                      vertical-align: top;
                                      margin: 0;
                                      padding: 2rem 4rem;
                                    " valign="top">
                          We are excited to have you. First, you need to confirm
                          your account. Just press the button Below
                        </td>
                      </tr>
                      <tr style="
                                    font-family: 'Helvetica Neue', Helvetica, Arial,
                                      sans-serif;
                                    box-sizing: border-box;
                                    font-size: 14px;
                                    margin: 0;
                                  ">
                        <td align='center' class="content-block" itemprop="handler" itemscope
                          itemtype="http://schema.org/HttpActionHandler" style="
                                      font-family: 'Helvetica Neue', Helvetica, Arial,
                                        sans-serif;
                                      box-sizing: border-box;
                                      margin: auto;
                                      font-size: 14px;
                                      padding: 10px;
                                    ">
                          <a href=${process.env.CLIENT_URL}/users/activate/${token} class="btn-primary" itemprop="url"
                            style="
                                        font-family: 'Helvetica Neue', Helvetica, Arial,
                                          sans-serif;
                                        box-sizing: border-box;
                                        font-size: 14px;
                                        color: #fff;
                                        text-decoration: none;
                                        line-height: 2em;
                                        font-weight: bold;
                                        text-align: center;
                                        cursor: pointer;
                                        display: inline-block;
                                        text-transform: capitalize;
                                        background-color: #1b4d7a;
                                        margin: 0;
                                        align-items: center;
                                        align-self: center;
                                        border-color: #1b4d7a;
                                        border-style: solid;
                                        border-width: 10px 20px;
                                      ">Confirm email address</a>
                        </td>
                      </tr>
                      
                    </table>
                  </td>
                </tr>
              </table>
              <div class="footer" style="
                            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                            box-sizing: border-box;
                            font-size: 14px;
                            width: 100%;
                            clear: both;
                            color: #999;
                            margin: 0;
                            padding: 20px;
                          ">
                <table width="100%" style="
                              font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                              box-sizing: border-box;
                              font-size: 14px;
                              margin: 0;
                            ">
                  <tr style="
                                font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                                box-sizing: border-box;
                                font-size: 14px;
                                margin: 0;
                              ">
                    <td class="aligncenter content-block" style="
                                  font-family: 'Helvetica Neue', Helvetica, Arial,
                                    sans-serif;
                                  box-sizing: border-box;
                                  font-size: 12px;
                                  vertical-align: top;
                                  color: #999;
                                  text-align: center;
                                  margin: 0;
                                  padding: 0 0 20px;
                                " align="center" valign="top">
                      Spinwash.co.uk
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </td>
          <td style="
                        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
                        box-sizing: border-box;
                        font-size: 14px;
                        vertical-align: top;
                        margin: 0;
                      " valign="top"></td>
        </tr>
      </table>
    </body>
    
    </html>
            `,
          };
    
          // send the email data
          client.messages
            .create(process.env.MAIL_FROM, emailData)
            .then((sent) => {
              console.log(sent);
              return res.json({
                message: `Activation link has been sent to ${email}`,
              });
            })
            .catch((err) => {
              return res.status(400).json({
                success: false,
                errors: errorHandler(err),
              });
            });
            */
    });
  }
};

exports.loginController = (req, res) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).send({
      errors: firstError,
    });
  } else {
    // check if user exist
    User.findOne({
      email,
    }).exec((err, user) => {
      if (err || !user) {
        return res.status(400).send('Email does not exist. Please register');
      }
      // authenticate
      if (!user.authenticate(password)) {
        return res.status(400).send('Wrong Password. Try Again');
      }
      // generate a token and send to client
      const token = jwt.sign(
        {
          _id: user._id,
        },
        `${process.env.JWT_SECRET}`,
        {
          expiresIn: '7d', // token valud for 7 days set [] remember me and set it for 30 days
        }
      );
      const { _id, profilePicture, name, email, role, bio } =
        user;

      return res.json({
        token,
        user: {
          _id,
          profilePicture,
          name,
          email,
          role,
          bio,
        },
      });
    });
  }
};

exports.forgotPasswordController = (req, res) => {
  const { email } = req.body;
  console.log('forgot password - ', email);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    console.log('firstError - ', firstError);
    return res.status(422).send({
      errors: firstError,
    });
  } else {
    // find if the user exists

    User.findOne(
      {
        email,
      },
      (err, user) => {
        if (err || !user) {
          console.log('user does not exists');
          return res.status(400).send('Email does not exist');
        }
        console.log('user exists');
        const token = jwt.sign(
          {
            _id: user._id,
          },
          process.env.JWT_RESET_PASSWORD,
          {
            expiresIn: '10m',
          }
        );
        return user.updateOne(
          {
            resetPasswordLink: token,
          },
          (err, success) => {
            if (err) {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                error:
                  'Database connection error on user forgot password request',
              });
            } else {
              console.log('creating email');
                  return res.send(`${process.env.CLIENT_URL}/users/password/reset/${token}`);
            }
          }
        );
      }
    );
  }
};

exports.resetPasswordController = (req, res) => {
  const { resetPasswordLink, newPassword } = req.body;
  console.log(newPassword);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  } else {
    if (resetPasswordLink) {
      jwt.verify(
        resetPasswordLink,
        `${process.env.JWT_RESET_PASSWORD}`,
        function (err, decoded) {
          if (err) {
            return res.status(400).send('Expired link. Try again');
          }

          User.findOne(
            {
              resetPasswordLink,
            },
            (err, user) => {
              if (err || !user) {
                return res.status(400).send('Something went wrong. Try later');
              }

              const updatedFields = {
                password: newPassword,
                resetPasswordLink: '',
              };

              user = _.extend(user, updatedFields);

              user.save((err, result) => {
                if (err) {
                  return res.status(400).send('Error resetting user password');
                }
                res.send(`Great! Now you can login with your new password`);
              });
            }
          );
        }
      );
    }
  }
};