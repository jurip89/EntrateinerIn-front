import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector,useAppDispatch } from "../app/hooks";
import { signUp } from "../app/user/thunks";


 const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

    const token = useAppSelector(state=>state.auth.token)

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUp({name, email, password}));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <h2>Sign Up</h2>
        <form onSubmit={submitForm}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
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
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
 };

 export default SignUp
