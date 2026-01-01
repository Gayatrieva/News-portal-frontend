
import React, { useEffect, useState } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Slider.css';
import Swal from 'sweetalert2';

function Slide() {
  const [data, setData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://news-portal-backend-2-d9eg.onrender.com/api/top-ten-news');
      if (response?.data?.code === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };
  const showDescription = (des) => {
    Swal.fire({
      text: des,
      icon: "info"
    })
  }
  console.log(data, "4567890");

  return (
    <>
      <div className="container-fluid px-3 mt-4" style={{ backgroundColor: '#E9F1FA' }}>
        <div className="row g-3">
          <div className="col-lg-8">
            <div
              id="carouselExample"
              className="carousel slide shadow rounded sliderimg"
              data-bs-ride="carousel"

            >
              <div className="carousel-inner h-100">
                {['/slider1.png ', '/slider2.png', '/slider3.png'].map((img, index) => (
                  <div
                    key={index}
                    className={`carousel-item ${index === 0 ? 'active' : ''}`}
                    style={{ height: '100%' }}
                  >
                    <img
                      src={img}
                      className="d-block w-100 img-fluid sliderimg"
                      style={{ objectFit: 'cover', height: '100%' }}
                      alt={`Slide ${index + 1}`}
                    />
                    <div className="carousel-caption bg-dark bg-opacity-50 p-2 rounded">
                      <h5>Top News Image {index + 1}</h5>
                      <p>Highlights from the current stories.</p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" />
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>


          <div className="col-lg-4">
            <div className="bg-light shadow rounded p-3 h-100 d-flex flex-column">
              <h5 className="text-center fw-bold mb-3 border-bottom pb-2">Top 10 News <span className='text-mycolor'>Headlines</span></h5>

              <marquee direction="up" scrollamount="2" className="flex-grow-1" style={{ height: '450px' }}>
                {data.map((item,) => {
                  return (
                    <>
                      <div onClick={() => { localStorage.setItem("newsDetails", JSON.stringify(item)); navigate('/news-details') }} className="card mb-3 border-0 shadow-sm" >
                        <div className="row g-0">
                          <div className="col-4">
                            {item.type === 'image' ?
                              <img
                                src={item.url}
                                className="img-fluid rounded-start headlineimg"
                                alt={item.title}
                                style={{ height: '100px', objectFit: 'cover' }}
                              />
                              :
                              <iframe
                                width="100%"
                                height="100"
                                src={item.url}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            }
                          </div>
                          <div className="col-8">
                            <div className="card-body p-2">
                              <p className="card-text m-0 fw-semibold">{item.title}</p>
                              <p className="card-text m-0">{item.desc?.slice(0, 10)}...</p>
                              <button onClick={() => showDescription(item?.desc)} className="btn btn-sm btn-danger mt-1">
                                <AiFillEye /> View More
                              </button>
                              <p className="card-text small text-muted d-flex align-items-center gap-1 mb-0 mt-1">
                                <FaRegCalendarAlt /> {new Date(item.createdAt)?.toDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
              </marquee>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slide;

