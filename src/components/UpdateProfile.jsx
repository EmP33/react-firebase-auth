import React, { useEffect, useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { changeEmail, changePassword } from "../store/auth-slice";
import { authActions } from "../store/auth-slice";

import { auth } from "../firebase";

import { AiOutlineLoading3Quarters } from "react-icons/ai";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();
  const error = useSelector((state) => state.auth.error);
  const loading = useSelector((state) => state.auth.loading);
  const [curUser, setCurUser] = useState({});
  const { currentUser } = auth;

  const updateHandler = (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      dispatch(authActions.setError("Passwords do not match"));
    }

    const promises = [];

    if (emailRef.current.value !== currentUser.email) {
      promises.push(dispatch(changeEmail(emailRef.current.value)));
    }
    if (passwordRef.current.value) {
      promises.push(dispatch(changePassword(passwordRef.current.value)));
    }
    Promise.all(promises)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        dispatch(authActions.setError(err.message));
      });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurUser(user);
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //   if (curUser) {
  //     navigate("/");
  //   }
  // }, [curUser, navigate]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                required
                ref={emailRef}
                defaultValue={currentUser?.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmationRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button
              disabled={loading}
              className="w-100"
              type="submit"
              onClick={updateHandler}
            >
              {loading && <AiOutlineLoading3Quarters className="spin" />}
              {!loading && "Update"}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  );
};

export default UpdateProfile;
