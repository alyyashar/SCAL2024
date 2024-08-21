import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { authenticate } from '../helpers/Auth';
import axios from 'axios';

// image
import logo from "../../images/logo-frontal.png";
import loginbg from "../../images/pic1.png";

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [issues, setIssues] = useState('');
  const history = useHistory();

  const postData = {
    email,
    password,
  };

  const onLogin = (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });
    let error = false;
    const errorObj = { email: '', password: '' };
    
    if (email === '') {
      errorObj.email = 'Email is required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is required';
      error = true;
    }
    setErrors(errorObj);

    if (error) {
      return;
    }

    axios
      .post('https://5000-alyyashar-scal2024-zyixncvobqi.ws-us115.gitpod.io/api/login', postData)
      .then((res) => {
        authenticate(res);
        history.push('/dashboard');
      })
      .catch((err) => {
        if (err.response) {
          // Server responded with a status code that falls out of the range of 2xx
          if (err.response.status === 401) {
            setIssues('Invalid credentials');
          } else if (err.response.data.errors) {
            // Handle specific validation errors
            setIssues(err.response.data.errors.join(', '));
          } else {
            setIssues('An error occurred while logging in');
          }
        } else if (err.request) {
          // The request was made but no response was received
          setIssues('No response from the server');
        } else {
          // Something happened in setting up the request that triggered an Error
          setIssues('Error setting up the request');
        }
      });
  };

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      <div className="login-aside text-center d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center mb-4 pt-5">
            <img src={logo} alt="SCAL LOGO" width="55px" />
          </div>
          <p className="mb-2 welcome-color">Welcome back!</p>
          <p>The Smart Contract Audit Lab</p>
        </div>
        <div className="aside-image" style={{ backgroundImage: `url(${loginbg})` }}></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form form-validation">
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">Sign in to your account</h3>
                    <div className='text-danger text-center'>
                      {issues}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email"><strong>Email</strong></label>
                      <div>
                        <input type="email" className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && <div className="text-danger fs-12">{errors.email}</div>}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1"><strong>Password</strong></label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Type Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        <div className="custom-control custom-checkbox ml-1">
                          <input type="checkbox" className="form-check-input" id="basic_checkbox_1" />
                          <label className="form-check-label" htmlFor="basic_checkbox_1">Remember my preference</label>
                        </div>
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button type="submit" className="btn btn-primary btn-block">
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div className="new-account mt-3">
                    <p><Link className="text-primary" to="./forgot-password">Reset/Forgot Password</Link></p>
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

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Login);
