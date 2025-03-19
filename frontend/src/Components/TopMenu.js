import React from "react";
import AdminBlog from "../AdminBlog";

const TopMenu = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "navy" }}>
        <div className="container-fluid">
          <a className="navbar-brand text-white fw-bold">
            REAL ESTATE PLATFORM
          </a>


          {/* Navigation Links Aligned to the Right */}
          <ul className="nav ms-auto">
            <li className="nav-item">
              <a href="/" className="nav-link text-white">Main Dashboard</a>
            </li>
            <li className="nav-item">
              <a href="/Blog" className="nav-link text-white">Blogs</a>
            </li>
            <li className="nav-item">
              <a href="/Login" className="nav-link text-white">Login</a>
            </li>
          </ul>
        </div>
      </nav>

    </div>
  )
}

export default TopMenu;