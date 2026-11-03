
import React, { useState } from "react";
import "./Register.css";
import Header from "../Header/Header";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const gohome = () => {
    window.location.href = window.location.origin;
  };

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email,
      }),
    });

    const json = await res.json();
    if (json.status != null && json.status === "Authenticated") {
      sessionStorage.setItem("username", json.userName);
      sessionStorage.setItem("firstname", firstName);
      sessionStorage.setItem("lastname", lastName);
      window.location.href = window.location.origin;
    } else if (json.error === "Already Registered") {
      alert("The user with this username is already registered.");
    } else {
      alert("Registration failed. Please verify your details.");
    }
  };

  return (
    <div>
      <Header />
      <div className="register_container">
        <div className="header">
          <span className="text" style={{ fontSize: "2rem", fontWeight: "bold" }}>Sign Up</span>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="/" onClick={() => gohome()} style={{ textDecoration: "none", color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>
              X
            </a>
          </div>
        </div>
        <form onSubmit={register}>
          <div className="inputs">
            <div className="input">
              <span className="input_field" style={{ width: "120px", fontWeight: "600" }}>Username</span>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="input_field"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <span className="input_field" style={{ width: "120px", fontWeight: "600" }}>First Name</span>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                className="input_field"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <span className="input_field" style={{ width: "120px", fontWeight: "600" }}>Last Name</span>
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                className="input_field"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <span className="input_field" style={{ width: "120px", fontWeight: "600" }}>Email</span>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input_field"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input">
              <span className="input_field" style={{ width: "120px", fontWeight: "600" }}>Password</span>
              <input
                type="password"
                name="psw"
                placeholder="Password"
                className="input_field"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="submit_panel">
            <input className="submit" type="submit" value="Register" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
