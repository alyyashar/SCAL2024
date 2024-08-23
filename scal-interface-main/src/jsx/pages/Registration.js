import React, { useState } from "react";
import axios from 'axios';
import { Modal, Button } from "react-bootstrap";

// Set the base URL for axios (Ensure this is correct for your backend)
axios.defaults.baseURL = 'https://3000-alyyashar-scal2024-zyixncvobqi.ws-eu115.gitpod.io';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '', success: '', issue: '' });
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
    const errorObj = { name: '', email: '', password: '', success: '', issue: '' };

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

    console.log("Sending registration request with data:", postData);

    axios
      .post('/api/register', postData) // Ensure this matches your backend route
      .then((res) => {
        console.log("Registration successful:", res.data);
        setErrors(prevErrors => ({
          ...prevErrors,
          success: 'Account created successfully'
        }));
        setSuccessModal(true);
      })
      .catch((err) => {
        console.error("Registration Error Response:", err.response || err.message);
        setErrors(prevErrors => ({
          ...prevErrors,
          issue: err.response ? err.response.data.errors : err.message
        }));
        setFailureModal(true);
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
                        {errors.name && <div className="alert alert-danger">{errors.name}</div>}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Email</strong>
                        </label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                          className="form-control"
                          placeholder="hello@example.com"
                        />
                        {errors.email && <div className="alert alert-danger">{errors.email}</div>}
                      </div>
                      <div className="form-group mb-3">
                        <label className="mb-1">
                          <strong>Password</strong>
                        </label>
                        <input
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                          className="form-control"
                        />
                        {errors.password && <div className="alert alert-danger">{errors.password}</div>}
                      </div>
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

export default Register;
