import React from 'react';
import {
  FaFacebookF,
  FaTwitter,
  FaGooglePlusG,
  FaPinterestP,
  FaInstagram,
  FaGooglePlay,
  FaApple,
  FaClock,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      {/* Main Footer */}
      <div className="container-fluid bg-dark text-white py-5 overflow-hidden">
        <div className="container">
          <div className="row align-items-center">

            {/* Left Column: Branding */}
            <div className="col-md-4 text-center text-md-start mb-4 mb-md-0">
              <h2 style={{ fontFamily: 'Old English Text MT', fontWeight: 'bold' }}>
                Blink <span className='text-mycolor'>Times</span> <FaClock className="text-danger fs-4" />
              </h2>
              <div className="my-3">
                <p className="mb-1"><FaGooglePlay className="me-2" /> GOOGLE PLAY</p>
                <p><FaApple className="me-2" /> APP STORE</p>
              </div>
            </div>

            {/* Middle Column: About + Icons */}
            <div className="col-md-5 text-center text-md-start mb-4 mb-md-0">
              <p>
                Blink Times creates and publishes online news and information content – which informs, educates and helps the users to take better life decisions.
              </p>
              <p>
                Our content focuses on creating and sharing helpful, relevant and factual stories that inspire and inform.
              </p>
              <div className="d-flex gap-3 justify-content-center justify-content-md-start fs-5">
                <a href="#" className="text-white"><FaFacebookF /></a>
                <a href="#" className="text-white"><FaTwitter /></a>
                <a href="#" className="text-white"><FaGooglePlusG /></a>
                <a href="#" className="text-white"><FaPinterestP /></a>
                <a href="#" className="text-white"><FaInstagram /></a>
              </div>
            </div>

            {/* Right Column: Google Map */}
            <div className="col-md-3">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.7241748008124!2d80.98093927510193!3d26.848860362802366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2c2c32ee159%3A0xb33f33470f5e62b3!2sVijay%20Paradise!5e0!3m2!1sen!2sin!4v1621350444645!5m2!1sen!2sin"
                className="w-100"
                height="200"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Footer Bar */}
      <div className="bg-secondary text-light text-center py-2">
        <span>
          Designed & Developed by ABC XYZ © <a href="https://www.techpile.in" className="text-white text-decoration-underline">Techpile Technology</a>
        </span>
      </div>
    </>
  );
};

export default Footer;
