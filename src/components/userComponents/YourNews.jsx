import React, { useEffect, useState } from 'react';
import Navbar from '../langingPage/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2'

const YourNews = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const response = await axios.get(`https://news-portal-backend-2-d9eg.onrender.com/api/user-your-news?.userId=${userData?._id}`);
    if (response?.data?.code === 200) {
      setNewsList(response?.data?.data);
    }
  };

  const showDescription = (des) => {
    Swal.fire({
      text: des,
      icon: "info"
    })
  }
  return (
    <>
      <Navbar />
      <div className="container my-4">
        <div className="card shadow-lg">
          <div className="card-body">
            <h3 className="card-title mb-4 text-start">

              <span className="text-mycolor "> Your <b>Posted News</b></span>
            </h3>
            <div className="table-responsive overflow-auto">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Category</th>
                    <th scope="col">City</th>
                    <th scope="col">Media</th>

                    <th scope="col">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {newsList?.map((item, index) => (
                    <tr key={index}>
                      <td>{item?.title}</td>
                      <td>{item?.category}</td>
                      <td>{item?.city}</td>
                      <td>{
                        item?.type == "image" ? <img height='60' width='100' src={item?.url} /> :
                          <iframe
                            height='60' width='100'
                            src={item?.url}
                            title="YouTube video player"
                            frameBorder={0}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen=""
                          />
                      }</td>
                      <td onClick={() => showDescription(item?.desc)}>{item?.desc?.slice(0, 15)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {newsList?.length == 0 && <h3 className='text-center'>No Records Found</h3>}
              {newsList.length === 0 && (
                <p className="text-center mt-4 text-muted">No news posted yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default YourNews; 