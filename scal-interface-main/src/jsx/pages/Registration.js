import React, { useState } from "react";
import { connect } from 'react-redux';
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";

function Register(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  let errorsObj = { name: '', email: '', password: '', success: '', issue: '' };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState('');
  const [successModal, setSuccessModal] = useState(false);
  const [failureModal, setFailureModal] = useState(false);

  const postData = {
    name,
    email,
    password,
  };

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (name === '') {
      errorObj.name = 'Name is Required';
      error = true;
    }
    if (email === '') {
      errorObj.email = 'Email is Required';
      error = true;
    }
    if (password === '') {
      errorObj.password = 'Password is Required';
      error = true;
    }
    setErrors(errorObj);
    if (error) return;

    axios
      .post(`https://5000-alyyashar-scal2024-zyixncvobqi.ws-us115.gitpod.io/api/register`, postData)
      .then((res) => {
        errorObj.success = 'Account created successfully';
        setErrors(errorObj);
        setSuccessModal(true);
      })
      .catch((err) => {
        errorObj.issue = err.message; // Log the error message
        setErrors(errorObj);
        setFailureModal(true);
        console.error("Registration Error:", err); // Log the error for debugging
      });
  }

  return (
    <div className="authincation h-100 p-meddle">
      <div className="container h-100">
        <div className="row justify-content-center h-100 align-items-center">
          <div className="col-md-6">
            <div className="authincation-content">
              <div className="row no-gutters">
                <div className="col-xl-12">
                  <div className="auth-form">
                    <div className="text-center mb-3"></div>
                    <h4 className="text-center mb-4">Sign up your SCAL account</h4>
                    {errors.issue && (
                      <div className='alert alert-danger'>
                        {errors.issue}
                      </div>
                    )}
                    {errors.success && (
                      <div className='alert alert-success'>
                        {errors.success}
                      </div>
                    )}
                    <form onSubmit={onSignUp}>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Full Name</strong>
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                        />
                      </div>
                      {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email" // Ensure the type is email
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                      </div>
                      {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password" // Ensure the type is password
                          className="form-control"
                        />
                      </div>
                      {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                      <div className="text-center mt-4">
                        <button
                          type="submit"
                          className="btn btn-primary btn-block"
                        >
                          Sign up
                        </button>
                        {successModal && (
                          <Modal
                            className="fade bd-example-modal-sm"
                            size="sm"
                            show={successModal}
                          >
                            <Modal.Body>SCAL Account created successfully</Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="primary light"
                                onClick={() => setSuccessModal(false)}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        )}
                        {failureModal && (
                          <Modal
                            className="fade bd-example-modal-sm"
                            size="sm"
                            show={failureModal}
                          >
                            <Modal.Body>Account Creation Failed. Try again</Modal.Body>
                            <Modal.Footer>
                              <Button
                                variant="primary light"
                                onClick={() => setFailureModal(false)}
                              >
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        )}
                      </div>
                    </form>
                    {/* Uncomment if needed */}
                    {/* <div className="new-account mt-3">
                      <p>
                        Already have an account?{" "}
                        <Link className="text-primary" to="/login">
                          Sign in
                        </Link>
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};

export default connect(mapStateToProps)(Register);
