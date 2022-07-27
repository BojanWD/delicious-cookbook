import React from "react";
import "../scss/register.scss";
import { useRef, useState, useEffect } from "react";
import { BsX, BsCheck, BsInfoCircle } from "react-icons/bs";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context";

export default function Register() {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const { users, setUsers } = useGlobalContext();
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const onRegister = (e) => {
    e.preventDefault();
    const userNames = users.map((el) => {
      return el.username;
    });
    if (userNames.includes(user)) {
      setErrMsg("That name is taken, please choose another username.");
      return;
    }

    setUsers((pS) => {
      return [...pS, { id: userNames.length, username: user, password: pwd }];
    });

    navigate("/");
  };

  return (
    <>
      <Row className="justify-content-center pt-3">
        <Col lg={6}>
          <h1>Register</h1>
          <Row>
            <Col>
              <p ref={errRef} className={errMsg ? "errmsg" : "none"}>
                {errMsg}
              </p>
            </Col>
          </Row>
          <form onSubmit={onRegister}>
            <Row>
              <Col>
                <label htmlFor="username">
                  Username:
                  <BsCheck className={validName ? "valid" : "none"} />
                  <BsX className={validName || !user ? "none" : "invalid"} />
                </label>
                <input
                  className="form-control my-1"
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={userFocus && user && !validName ? "" : "none"}
                >
                  <BsInfoCircle /> 4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                {" "}
                <label htmlFor="password">
                  Password:
                  <BsCheck className={validPwd ? "valid" : "none"} />
                  <BsX className={validPwd || !pwd ? "none" : "invalid"} />
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control my-1"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                />
                <p
                  id="pwdnote"
                  className={pwdFocus && !validPwd ? "instructions" : "none"}
                >
                  <BsInfoCircle /> 8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <label htmlFor="confirm_pwd">
                  Confirm Password:
                  <BsCheck
                    className={validMatch && matchPwd ? "valid" : "none"}
                  />
                  <BsX
                    className={validMatch || !matchPwd ? "none" : "invalid"}
                  />
                </label>
                <input
                  type="password"
                  id="confirm_pwd"
                  className="form-control my-1"
                  onChange={(e) => setMatchPwd(e.target.value)}
                  value={matchPwd}
                  required
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)}
                />
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "none"
                  }
                >
                  <BsInfoCircle /> Must match the first password input field.
                </p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Button
                  type="submit"
                  className="my-1"
                  disabled={
                    !validName || !validPwd || !validMatch ? true : false
                  }
                >
                  {" "}
                  Sign Up
                </Button>
              </Col>
            </Row>
          </form>
          <Row>
            <Col>
              <p>
                Already registered?
                <br />
                <span>
                  {/*put router link here*/}
                  <Link to="/signin">Sign In</Link>
                </span>
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
