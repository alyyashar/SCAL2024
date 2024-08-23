import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import emailjs from '@emailjs/browser';

const ForgotPassword = ({ history }) => {
  const [issues, setIssues] = useState('');
  const [success, setSuccess] = useState('');
  let errorsObj = { email: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [email, setEmail] = useState('');


  const postData = {
    email
  };


  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    let error = false;
    const errorObj = { ...errorsObj };

    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    axios
      .post(`https://5000-alyyashar-scal2024-zyixncvobqi.ws-eu115.gitpod.ioapi/password/forget`, postData)
      .then((res) => {
        console.log(res.data)
        const reset_link = res.data;
        const to_mail = email;
        let form = {
          reset_link,
          to_mail
        }
        emailjs.send('service_ise1lt8', 'template_x4c0pt6', form, 'hIXh6SedSeGSyILpV')
          .then((result) => {
            console.log(result.text);
          }, (error) => {
            console.log(error.text);
          });
        setSuccess('Kindly check your mailbox. It might take a while to receive our mail');

      })
      .catch((err) => {
        console.log(err)
        setIssues('Cannot send a mail at the moment');
      })
  };
  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                      {/* <Link to="/dashboard">
							<img src={logo} alt="" />
						</Link> */}
                    </div>
                    <h3 className="text-center mb-4 ">Reset Password</h3>
                    <p className="text-center mb-4">Enter the email address you've used to sign up with us and we'll send you a reset link!</p>
                    <div className='text-danger text-center'>
                      {issues}
                    </div>
                    <div className='text-primary text-center'>
                      {success}
                    </div>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="form-group">
                        <label className="">
                          <strong>Email</strong>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Your Email Address"
                        />
                      </div>
                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Get Reset Link
                        </button>
                      </div>
                    </form>
                    <p className="text-center mt-4"><Link className="text-primary" to="/login">Back to Login</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
