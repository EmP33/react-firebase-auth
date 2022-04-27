import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../store/auth-slice";

import { auth } from "../firebase";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const [message, setMessage] = useState("");

  const resetPasswordHandler = async (e) => {
    setMessage("");
    e.preventDefault();
    dispatch(resetPassword(emailRef.current.value));
    setMessage("Check your inbox for further instructions");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>

            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              onClick={resetPasswordHandler}
            >
              {loading && <AiOutlineLoading3Quarters className="spin" />}
              {!loading && "Reset Password"}
            </Button>
          </Form>
        </Card.Body>
        <div className="w100 text-center mt-3">
          <Link to="/login">Login</Link>
        </div>
      </Card>
      <div className="w100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
