// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import DemoUser from "../DemoUser";
import "./LoginForm.css"

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="Outer-modal-Container">
        <div className="Inner-modal-Container">
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <div className="User-Email-Container">
        <h2>Welcome to AirBnb2</h2>
      <label>
        Username or Email
        <input
        className="form-inputs"
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
        />
      </label>
      </div>
      <div className="Password-Container">
      <label>
        Password
        <input
        className="form-inputs"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      </div>
      <div className="Login-Container">
      <button className="Login-Button" type="submit">Log In</button>
      </div>
      <div className="Demo-Container">
      <DemoUser/>
      </div>
    </form>
      </div>
    </div>
  );
}

export default LoginForm;
