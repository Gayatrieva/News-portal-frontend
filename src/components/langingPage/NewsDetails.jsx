import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';

function NewsDetails() {
  const location = useLocation();
  const [data, setData] = useState(null);

  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem('newsDetails')); 
    if (raw) setData(raw);
  }, []);

  if (!data) {
    return (
      <>
        {location?.pathname !== "/" && <Navbar />}
        <div className="container py-5 text-center">
          <h5>No news data found.</h5>
        </div>
      </>
    );
  }

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}

      <div style={{ backgroundColor: '#fcfcfc' }}>
        <div className="container py-4">
          <h3 className="text-center mb-4">
            News <b className="text-mycolor" style={{ color: '#7f0000' }}>Details</b>
          </h3>

          <div className="card border-0 shadow-lg p-3 mb-0">
            <div className="row g-0">
              <div className="col-md-4">
                {data?.type === "image" ? (
                  <img src={data?.url} alt="News" className="img-thumbnail w-100" />
                ) : (
                  <iframe
                    className="w-100 rounded"
                    height="250"
                    src={data?.url}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )}

                <div className="ps-1 mt-2 small text-muted">
                  <p className="mb-1">🕒 Last Updated: {new Date(data?.createdAt)?.toDateString()}</p>
                  <p className="mb-0">📍 {data?.city || 'Unknown City'}</p>
                </div>
              </div>

              <div className="col-md-8 px-3">
                <h5 className="text-center fw-semibold mb-3">
                  <span className="text-mycolor">Title:</span> {data?.title}
                </h5>
                <p className="des-dtails text-justify p-2">{data?.desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewsDetails;
