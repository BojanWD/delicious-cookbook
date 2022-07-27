import React from "react";
import "../scss/register.scss";
import { useRef, useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function SignIn() {
  const { users, setActiveUser } = useGlobalContext();
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const onLogIn = (e) => {
    e.preventDefault();
    let userInput = users.filter((el) => {
      return el.username === user && el.password === pwd;
    });

    if (userInput.length === 0) {
      setErrMsg("Wrong username or password, please try again");
      return;
    }

    setActiveUser({ id: userInput[0].id, username: userInput[0].username });
    navigate("/");
  };

  return (
    <>
      <Row className="justify-content-center pt-3">
        <Col lg={6}>
          <h1>Log in</h1>
          <Row>
            <Col>
              <p ref={errRef} className={errMsg ? "errmsg" : "none"}>
                {errMsg}
              </p>
            </Col>
          </Row>
          <form onSubmit={onLogIn}>
            <Row>
              <Col>
                <label htmlFor="username">Username:</label>
                <input
                  className="form-control my-1"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  className="form-control my-1"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <Button
                  type="submit"
                  className="my-1"
                  disabled={!user || !pwd ? true : false}
                >
                  {" "}
                  Sign in
                </Button>
              </Col>
            </Row>
          </form>
          <Row>
            <Col>
              <p>
                Don't have an account? <br></br>
                Either use username: admin and password: admin to add and edit
                recipes or register using the link below.
                <br />
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
