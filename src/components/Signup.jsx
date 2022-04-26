import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/auth-slice";
import { authActions } from "../store/auth-slice";

import { auth } from "../firebase";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Signup = () => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const [curUser, setCurUser] = useState({});

  const createAccountHandler = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === passwordConfirmationRef.current.value) {
      return dispatch(
        signup(emailRef.current.value, passwordRef.current.value)
      );
    }

    dispatch(authActions.setError("Passwords do not match"));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {auth.currentUser && auth.currentUser.email}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                required
                ref={passwordConfirmationRef}
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              onClick={createAccountHandler}
            >
              {loading && <AiOutlineLoading3Quarters className="spin" />}
              {!loading && "Sign Up"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        Already have an account? Log in
      </div>
    </>
  );
};

export default Signup;
