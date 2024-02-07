import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = ({ setLoginUser }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const history = useHistory();

  const login = () => {
    axios.post("http://localhost:5000/Login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      history.push("/");
    });
  };

  return (
    <div className="login">
      {console.log(user)}
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Enter Your Email"
        name="email"
        value={user.email}
        onChange={handleChange}
      ></input>
      <input
        type="password"
        placeholder="Enter Your Password"
        name="password"
        value={user.password}
        onChange={handleChange}
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/Register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
