import React, { useState } from "react";
import "./SigninPage.css";
import Logo from "../components/Logo/Logo";
import { Link } from "react-router-dom";

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="signin-page">
      <div className="signin-left">
        <Logo />
        <h1>Haaflah – Where Every Event Begins With Insight.</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Examole@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="at least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#">Forgot Password?</a>
          </div>
          <Link to="/dashboard">
            <button type="submit" >Sign In</button>
          </Link>
          <p className="footer">© 2025 ALL RIGHTS RESERVED</p>
        </form>
      </div>

      <div className="signin-right">
        <Logo />
        <p>Streamlining the entire event lifecycle</p>
      </div>
    </div>
  );
};

export default SigninPage;
