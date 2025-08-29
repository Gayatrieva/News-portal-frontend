import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function NewsCategory() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/top-category');
      if (response?.data?.code === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}

     
      <div  className='bg-color'style={{ overflowX: 'hidden',  }}>
        <div className="container py-2">
          <p className="text-center fs-3">
            News <b className="text-mycolor">Category</b>
          </p>

          <div className="row py-3 justify-content-center g-3">
            {data?.map((item) => (
              <div
                key={item._id}
                className="col-sm-2"
                onClick={() => {
                  localStorage.setItem("newsDetails", JSON.stringify(item));
                  navigate('/news-details');
                }}
              >
                <div className="card shadow-lg border-0">
                  <img
                    src={item?.url}
                    alt={item?.category || "Category"}
                    style={{
                      width: '100%',
                      height: '140px',
                      objectFit: 'cover'
                    }}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h6 className="card-title text-center m-0">
                      {item?.category}
                    </h6>
                  </div>
                </div>
              </div>
            ))}

            {data?.length === 0 && (
              <h3 className="text-center">No Record Found</h3>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsCategory;
