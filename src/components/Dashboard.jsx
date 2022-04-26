import React, { useState, useEffect } from "react";
import { Card, Button, Alert } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { logout } from "../store/auth-slice";

import { Link, useNavigate } from "react-router-dom";

import { auth } from "../firebase";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [curUser, setCurUser] = useState({});
  const { currentUser } = auth;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurUser(user);
    });
    return unsubscribe;
  }, []);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/signup");
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>{" "}
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email: </strong>
          {curUser && curUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w100 text-center mt-2">
        <Button variant="link" onClick={logoutHandler}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
