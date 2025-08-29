import React from "react";
import { FaClock, FaInfoCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar"

const About = () => {
  const location = useLocation();

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}
      <div style={{ backgroundColor: "#E9F1FA", padding: "1rem 0 2rem 0" }}>

        <div className="text-center pt-3 pb-2">
          <h1 style={{ fontFamily: "Old English Text MT", fontSize: "2.5rem" }}>
            Blink <span style={{ color: "darkred" }}>Times</span>{" "}
            <FaClock style={{ color: "darkred" }} />
          </h1>
        </div>


        <div className="text-center mb-3">
          <h4>
            About <span style={{ color: "darkred" }}>Us</span>{" "}
            <FaInfoCircle color="darkred" />
          </h4>
          <p className="text-muted">
            There are multiple reasons to choose us for various purposes related
            to news. Believe me, you will find us the most suitable.
          </p>
        </div>


        <div className="container d-flex justify-content-center">
          <div className="card shadow p-4 w-100" style={{ maxWidth: "960px" }}>
            <div className="row">

              <div className="col-md-4 mb-3">
                <h2
                  className="text-md-start text-center"
                  style={{ fontFamily: "Old English Text MT", fontSize: "2rem" }}
                >
                  Blink <span style={{ color: "darkred" }}>Times</span>{" "}
                  <FaClock style={{ color: "darkred" }} />
                </h2>
              </div>


              <div className="col-md-8">
                <p style={{ textAlign: "justify" }}>
                  Blink Times is the digital wing of Blink Prakashan Limited,
                  India's leading media and communications group with interests in
                  Print, OOH, Activations, Radio, and Digital. The group publishes
                  the world’s largest read daily, Dainik Jagran, along with India’s
                  largest radio network – Radio City.
                </p>
              </div>

              <div className="col-12 mt-3">
                <p style={{ textAlign: "justify" }}>
                  The company’s portfolio includes 9 digital platforms providing
                  content across genres like news, education, lifestyle,
                  entertainment, health, and youth. Blink Times currently reaches
                  over 45 million users (comScore MMX Multi-Platform; March 2019)
                  and garners 30 million video views (YouTube), leading the Hindi
                  news, education, health, and women’s segments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
