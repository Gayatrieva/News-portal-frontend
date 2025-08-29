import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPhotoVideo } from 'react-icons/fa';

const LatestVideos = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/top-video');
      if (response?.data?.code === 200) {
        setData(response?.data?.data);
      }
    } catch (err) {
      console.error("Error fetching videos", err);
    }
  };

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}

      <div className='bg-color'>
        <div className="container py-3 ">
        <h4 className="text-center mb-4 fw-bold">
          Video <span style={{ color: "#8B0000" }}>News</span> <FaPhotoVideo />
        </h4>

        <div className="d-flex flex-wrap justify-content-center gap-4">
          {data?.map((video, index) => (
            <div
              key={index}
              className="border rounded p-2 shadow-sm bg-white"
              style={{ width: "300px", cursor: "pointer" }}
              onClick={() => {
                localStorage.setItem("newsDetails", JSON.stringify(video));
                navigate('/news-details');
              }}
            >
              <iframe
                className="w-100"
                height="160"
                src={video?.url}
                title={`video-${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
              <div className="mt-2">
                <p className="text-secondary small mb-1">{video?.category || "General"}</p>
                <h6 className="fw-semibold mb-2">{video?.title?.slice(0, 60)}...</h6>
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <button className="btn btn-sm btn-danger">View More</button>
                  <div className="text-end small">
                    <p className="mb-0">📅 {video?.date || "Unknown"}</p>
                    <p className="mb-0">📍 {video?.city || "Unknown"}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && (
          <p className="text-center text-muted mt-4">No video records found</p>
        )}
      </div>
      </div>

    </>
  );
};

export default LatestVideos;



// import React, { useState, useEffect } from 'react';
// import Navbar from './Navbar';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaPhotoVideo } from 'react-icons/fa';

// const LatestVideos = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get('http://localhost:9000/api/top-video');
//       if (response?.data?.code === 200) {
//         setData(response?.data?.data);
//       }
//     } catch (err) {
//       console.error("Error fetching videos", err);
//     }
//   };

//   return (
//     <>
//       {location?.pathname !== "/" && <Navbar />}

//       <div className="video-container bg-color py-4 px-2">
//         <h3 className="video-heading text-center mb-4 fs-3">
//           Video <span className="text-mycolor">News</span> <FaPhotoVideo />
//         </h3>

//         <div className="horizontal-cards d-flex flex-column gap-4">
//           {data?.map((video, index) => (
//             <div
//               className="video-card d-flex flex-md-row flex-column shadow-lg p-3 rounded bg-white"
//               key={index}
//               onClick={() => {
//                 localStorage.setItem("newsDetails", JSON.stringify(video));
//                 navigate('/news-details');
//               }}
//               style={{ cursor: 'pointer' }}
//             >
//               <div className="video-left col-md-5 mb-3 mb-md-0">
//                 <iframe
//                   className="w-100"
//                   height="250"
//                   src={video?.url}
//                   title={`video-${index}`}
//                   frameBorder="0"
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                   allowFullScreen
//                   referrerPolicy="strict-origin-when-cross-origin"
//                 />
//               </div>
//               <div className="video-right col-md-7 px-3 d-flex flex-column justify-content-between">
//                 <div>
//                   <p className="text-uppercase text-secondary fw-bold mb-2">{video?.category || "General"}</p>
//                   <h5 className="mb-3">{video?.title}</h5>
//                 </div>
//                 <div className="d-flex justify-content-between align-items-center mt-3">
//                   <button className="btn btn-danger">View More</button>
//                   <div className="text-end">
//                     <p className="small mb-1">📅 {video?.date || "Unknown Date"}</p>
//                     <p className="small">📍 {video?.city || "Unknown City"}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {data?.length === 0 && (
//             <h4 className="text-center text-muted mt-5">No Video Records Found</h4>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LatestVideos;
