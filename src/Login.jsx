import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./context/AuthContext";
import axios from "./api/axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
const LOGIN_URL = "auth";
const SERVER = "http://localhost:3500";
const Login = () => {
  const {setAuth } = useAuth();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    userRef.current.focus();
  }, []);

  // useEffect(() => {
  //   setErrMsg("");
  // }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({
          user,
          pass: pwd,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      console.log(JSON.stringify(response?.data));
      console.log(import.meta.env.VITE_USER_ROLE);
      const roles = response?.data?.roles.map(role => `${role}`);
      const accessToken = response?.data?.accessToken;
      setAuth({user, pwd, accessToken, roles});
      navigate(from, {replace: true});
      setUser("");
      setPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 400) {
        setErrMsg("Username or password is missing");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }

    setUser("");
    setPwd("");
  };
  return (
    <>
      <div className="w-full h-full grid items-center bg-blue-300">
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offset"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign in</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
            autoComplete="o"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            autoComplete="current-password"
          />
          <button>Sign in</button>
        </form>

        <p>
          Need an Account?
          <br />
          <span className="line">
            {/*put router link here*/}
            <a href="#">Sign Up</a>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
