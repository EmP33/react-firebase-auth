import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/auth-slice";
import { authActions } from "../store/auth-slice";

import { auth } from "../firebase";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const [curUser, setCurUser] = useState({});
  const { currentUser } = auth;

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(emailRef.current.value, passwordRef.current.value));
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurUser(user);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
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

            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              onClick={loginHandler}
            >
              {loading && <AiOutlineLoading3Quarters className="spin" />}
              {!loading && "Log in"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        Need an account? <Link to="/signup">Sign up</Link>
      </div>
    </>
  );
};

export default Login;
