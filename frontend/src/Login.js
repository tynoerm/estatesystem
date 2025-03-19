import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { RiLoginBoxFill } from "react-icons/ri";
import TopMenu from "./Components/TopMenu";
import Footer from "./Components/Footer";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://estatesystem.onrender.com/api/login", { email, password });
      setMessage(response.data.message);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/AdminDashboard");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <TopMenu />

      <div className="container mt-5 flex-grow-1">
        <div className="col-md-5 mx-auto shadow-lg p-4 rounded">
          <h5 className="text-center mb-3">
            <RiLoginBoxFill /> ADMIN LOGIN
          </h5>
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input 
                type="email" 
                className="form-control" 
                placeholder="Enter email"
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className="form-group mb-3">
              <label>Password:</label>
              <input 
                type="password" 
                className="form-control" 
                placeholder="Enter password"
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
            {message && <p className="mt-3 text-danger text-center">{message}</p>}
            <div className="text-center mt-3">
              <a href="/Register" className="nav-link text-blue">
                <b>Do not have an account? Register</b>
              </a>
            </div>
          </form>
        </div>
      </div>

      <Footer className="mt-auto"/> {/* Pushes Footer to the bottom */}
    </div>
  );
};

export default Login;
