
import './App.css';
import Footer from './Components/Footer.js';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from "./Dashboard.js"
import AdminDashboard from "./AdminDashboard.js"
import Login from "./Login.js"
import Register from "./Register.js"
import AdminBlog from "./AdminBlog.js"
import Blog from "./Blog.js"




function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Dashboard/>} />
        <Route path="AdminDashboard" element={<AdminDashboard/>} />
        <Route path="Register" element={<Register/>} />
        <Route path="AdminBlog" element={<AdminBlog/>} />
        <Route path="Blog" element={<Blog/>} />
        <Route path="Login" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;
