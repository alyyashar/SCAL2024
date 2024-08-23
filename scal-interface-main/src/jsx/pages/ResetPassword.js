import React, { useState } from "react";
import { Link, useParams, Route, Redirect } from "react-router-dom";
import axios from 'axios';
import { isAuth } from "../helpers/Auth";

const ResetPassword = () => {
  const [issues, setIssues] = useState('');
  const [success, setSuccess] = useState('');
  let errorsObj = { password: '', cpassword: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  let params = useParams();


  const onSubmit = (e) => {
    e.preventDefault();
    setErrors(null);
    setIssues('');
    let error = false;
    const errorObj = { ...errorsObj };

    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    if (confirmPassword === '') {
      errorObj.cpassword = 'Confirm Password is Required';
      error = true;
    }
    if (password !== confirmPassword && confirmPassword !== '') {
      errorObj.cpassword = 'Passwords does not match';
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }

    console.log(params.token)

    axios
      .put(`https://5000-alyyashar-scal2024-zyixncvobqi.ws-eu115.gitpod.io/api/password/reset`, {
        resetPasswordLink: params.token,
        newPassword: password,
      })
      .then((res) => {
        console.log(res.data)
        setSuccess('You can now login with your new password');
      })
      .catch((err) => {
        console.log(err.response.data)
        setIssues(err.response.data);
      });
  };

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <Route exact path="/">
          {isAuth() ? <Redirect to="/" /> : null}
        </Route>
        {" "}
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3">
                    </div>
                    <h3 className="text-center mb-4 ">Create New Password</h3>
                    <p className="text-center mb-4">Your New Password Must be Different from Previous used Password.
            This makes your account more secure</p>
                    <div className='text-danger text-center'>
                      {issues}
                    </div>
                    <div className='text-primary text-center'>
                      {success}
                    </div>
                    <i>Minimum 8 Characters, including UPPER/lowercase and numbers</i>
                    <form onSubmit={(e) => onSubmit(e)}>
                      <div className="form-group">
                        <label className="">
                          <strong>Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Your New Password"
                        />
                      </div>
                      {errors.password && <div className="text-danger fs-12">{errors.password}</div>}
                      <div className="form-group">
                        <label className="">
                          <strong>Confirm Password</strong>
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm New Password"
                        />
                      </div>
                      {errors.cpassword && <div className="text-danger fs-12">{errors.cpassword}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Create password
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

export default ResetPassword;
