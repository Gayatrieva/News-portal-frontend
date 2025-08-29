import React, { useState, useEffect } from "react";
import { FaSearch, FaImage } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const ImageGallery = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // added
  const [filteredData, setFilteredData] = useState([]); // added

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Filter logic based on search term
    const result = data.filter((item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(result);
  }, [searchTerm, data]);

  const fetchData = async () => {
    const response = await axios.get("http://localhost:9000/api/top-city");
    if (response?.data?.code === 200) {
      setData(response?.data?.data);
      setFilteredData(response?.data?.data); // initialize filteredData
    }
  };

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}

      <div className="bg-color w-100%">
        <div className="container py-5">
          <h2 className="text-center mb-4">
            Image <span className="text-mycolor">Gallery</span>{" "}
            <FaImage className="text-danger" />
          </h2>

          <div className="d-flex justify-content-center mb-4">
            <input
              type="text"
              className="form-control w-50 me-2"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn btn-danger">
              <FaSearch />
            </button>
          </div>

          <div className="row justify-content-center">
            {filteredData.map((item, index) => (
              <div
                key={index}
                className="col-lg-4 col-md-5 col-sm-6 mb-4"
                onClick={() => {
                  localStorage.setItem("newsDetails", JSON.stringify(item));
                  navigate("/news-details");
                }}
              >
                <div className="card shadow-sm h-100">
                  <img
                    src={item.url}
                    className="card-img-top"
                    alt={item.title}
                    style={{ height: "220px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <h6 className="card-title">{item.title}</h6>
                  </div>
                </div>
              </div>
            ))}
            {filteredData.length === 0 && (
              <p className="text-center text-muted">No results found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageGallery;
