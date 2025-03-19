import React, { useState } from "react";
import axios from "axios";
import { RiLoginBoxFill } from "react-icons/ri";
import TopMenu from "./Components/TopMenu.js";
import Footer from "./Components/Footer.js"; // ✅ Import Footer

const Register = () => {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://estatesystem.onrender.com/api/register", {
        fullname,
        email,
        password,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Registration failed");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopMenu />

      <div className="d-flex justify-content-center align-items-center flex-grow-1 bg-light">
        <div className="col-md-5 shadow-lg p-4 rounded bg-white" style={{ maxWidth: "400px" }}>
          <h5 className="shadow-sm p-3 mb-4 bg-body rounded text-center">
            <RiLoginBoxFill /> &nbsp; USER REGISTRATION
          </h5>

          <form onSubmit={handleRegister}>
            <div className="form-group mb-3">
              <label>Full Name: </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={fullname}
                onChange={(event) => setFullname(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Email: </label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>

            <div className="form-group mb-3">
              <label>Password: </label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
            <div className="text-center mt-3">
              <a href="/Login" className="nav-link text-blue"><b>Already have an account? Login</b></a>
            </div>
          </form>

          {message && <p className="mt-3 text-danger text-center">{message}</p>}
        </div>
      </div>

      <Footer className="mt-auto" /> {/* ✅ Footer stays at the bottom */}
    </div>
  );
};

export default Register;
