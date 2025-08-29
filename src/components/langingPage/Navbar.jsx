import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBlog } from "react-icons/fa";
import { FcAbout, FcFeedback } from "react-icons/fc";
import { IoNewspaper, IoLogInSharp } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { IoIosContacts } from "react-icons/io";
import { MdOutlineAppRegistration } from "react-icons/md";
import { MdInfoOutline } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    setUserInfo(userData);
  }, []);

  const logOut = () => {
    localStorage.removeItem('userInfo');
    navigate('/login');
  };

  // -- USER NAV ----
  if (userInfo?.userType === 'user') {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
         
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavUser"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavUser">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item"><Link className="nav-link" to="/user-alllist">All News</Link></li>
              <li className="nav-item"><Link className="nav-link"
               to="/user-profile">Profile</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/user-addnews">Post</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/user-list">Your News</Link></li>
              
              <li className="nav-item"><span className="nav-link" onClick={logOut} style={{ cursor: 'pointer' }}>Logout</span></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

  // ---------- ADMIN NAV ----------
  if (userInfo?.userType === 'admin') {
    return (
      <nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
        <div className="container-fluid">
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAdmin"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAdmin">
            <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center">
              <li className="nav-item"><Link className="nav-link" to="/admin-newslist">News</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin-profile">Profile</Link></li>
              
              <li className="nav-item"><Link className="nav-link" to="/admin-ContactUS">Contact Us</Link></li>
              <li className="nav-item"><span className="nav-link" onClick={logOut} style={{ cursor: 'pointer' }}>Logout</span></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }

 
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary sticky-top">
  <div className="container-fluid">
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNavGuest"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarNavGuest">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0 text-center fw-bold">
        <li className="nav-item"><Link className="nav-link" to="/"><FaHome /> Home</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/about"><MdInfoOutline/> About</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/news"><IoNewspaper /> News</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/gallery"><GrGallery /> Gallery</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/contact"><IoIosContacts /> Contact</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/userRegister"><MdOutlineAppRegistration /> UserRegister</Link></li>
        <li className="nav-item"><Link className="nav-link" to="/login"><IoLogInSharp /> Login</Link></li>
      </ul>
    </div>
  </div>
</nav>

  );
}

export default Navbar;

