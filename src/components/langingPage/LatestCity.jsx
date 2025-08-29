import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LatestCity() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:9000/api/top-city');
    if (response?.data?.code === 200) {
      setData(response?.data?.data);
    }
  };

  return (
    <>
      {location?.pathname !== '/' && <Navbar />}

      {/* Prevent horizontal scroll using inline style */}
      <div  className='bg-color' style={{ overflowX: 'hidden' }}>
        <div className="container py-2">
          <p className="text-center fs-3">
            Top <b className="text-mycolor">City</b>
          </p>

          {/* Wrap in row and use Bootstrap gutter spacing */}
          <div className="row justify-content-center g-3">
            {data?.map((item, index) => (
              <div
                key={index}
                className="col-sm-2 mb-3"
                onClick={() => {
                  localStorage.setItem('newsDetails', JSON.stringify(item));
                  navigate('/news-details');
                }}
              >
                <div className="card shadow-lg catcard border-0">
                  {/* Responsive image, no overflow */}
                  <img
                    src={item?.url}
                    alt="city"
                    style={{ height: '140px', width: '100%', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    <h6 className="card-title text-center m-0">{item?.city}</h6>
                  </div>
                </div>
              </div>
            ))}

            {data?.length === 0 && <h3 className="text-center">No Record Found</h3>}
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestCity;
