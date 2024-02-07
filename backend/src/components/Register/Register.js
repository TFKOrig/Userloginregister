import React, { useState } from "react";
import "./Register.css";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  // To change values according to the state
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  //To get values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const history = useHistory();

  const register = () => {
    const { name, email, password, confirmpassword } = user;
    if (name && email && password === confirmpassword) {
      axios.post("http://localhost:5000/Register", user).then((res) => {
        alert(res.data.message);
        history.push("/Login");
      });
    } else {
      alert("Invalid input");
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Name"
        onChange={handleChange}
      ></input>
      <input
        type="email"
        name="email"
        value={user.email}
        placeholder="Email"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="password"
        value={user.password}
        placeholder="Enter Password"
        onChange={handleChange}
      ></input>
      <input
        type="password"
        name="confirmpassword"
        value={user.confirmpassword}
        placeholder="Confirm Password"
        onChange={handleChange}
      ></input>
      <div className="button" onClick={register}>
        Register
      </div>
      <div>or</div>
      <div className="button" onClick={() => history.push("/Login")}>
        Login
      </div>
    </div>
  );
};

export default Register;
