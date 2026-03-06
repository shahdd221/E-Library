
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";




function Navbar() {
  const [isOpen, setIsopen] = useState(false);
  const role = localStorage.getItem("role");

  return (
    <nav className="navbar navbar-expand-md bg-brown fixed left-0 top-0 z-50 fixed-top p-2">
      <div className="container d-md-flex align-items-md-center justify-content-md-around">
        <div className="navbar-brand d-flex align-items-center">
          <i className='fa-solid fa-graduation-cap text-white me-2'></i>
          <span className="text-white fw-bolder">University Library</span>
        </div>

        <button
          onClick={() => setIsopen(!isOpen)}
          className={`navbar-toggler shadow-none ${isOpen ? "" : "collapsed"}`}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse ${isOpen ? "show" : ""} d-md-flex justify-content-center`}
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav p-3 mt-3 m-md-0 p-md-1">
            <NavLink
              className="nav-link m-1 text-white hover rounded-5 px-4"
              to="/home"
              onClick={() => setIsopen(false)}
            >
              Home
            </NavLink>

            <NavLink
              className="nav-link m-1 text-white hover rounded-5 px-4"
              to="/books"
              onClick={() => setIsopen(false)}
            >
              Books
            </NavLink>

            <NavLink
              className="nav-link m-1 text-white hover rounded-5 px-4"
              to="/about"
              onClick={() => setIsopen(false)}
            >
              About
            </NavLink>

          
              <NavLink
                className="nav-link m-1 text-white hover rounded-5 px-4"
                to="/DashBoard"
                onClick={() => setIsopen(false)}
              >
                Dashboard
              </NavLink>
            

            <Link className='px-4 my-2 d-md-none' to="/user">
              <span className='rounded-circle border p-1 hover-bg'>
                <i className='fa-solid fa-user text-white'></i>
              </span>
            </Link>
          </div>
        </div>

        <div className="text-white icon-search d-md-flex justify-content-center align-items-center m-2 d-none">
          <i className="fa-solid fa-search"></i>
        </div>

        <Link className='px-4 my-2 d-none d-md-block' to="/user">
          <span className='rounded-circle border p-1 hover-bg'>
            <i className='fa-solid fa-user text-white'></i>
          </span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

