import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { login } from "../app/user/thunks";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h2>Login</h2>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account yet? Click <Link to="/signup">here</Link> to
          sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
