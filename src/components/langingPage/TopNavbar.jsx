import React from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6'; // Twitter X icon

const TopNavbar = () => {
  return (
    <div
      className="py-2"
      style={{ backgroundColor: '#7f0000', color: '#FFFFFF' }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side (Email) */}
          <div className="col-md-6 text-start">
            <span className="fw-semibold">📧 kashyapgayatri151@gmail.com</span>
          </div>

          {/* Right Side (Social Icons) */}
          <div className="col-md-6 text-end">
            <div className="d-inline-flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaXTwitter />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaYoutube />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white fs-5"
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
