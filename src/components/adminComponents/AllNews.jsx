
import React, { useEffect, useState } from 'react'
import Navbar from '../langingPage/Navbar'
import axios from 'axios'
import Swal from 'sweetalert2'

const AllNews = () => {
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:9000/api/admin-all-list`)
      if (response?.data?.code === 200) {
        setNewsList(response?.data?.data)
      }
    } catch (error) {
      console.error("Fetch Error:", error)
    }
  }

  const handleApproval = async (id, status) => {
    try {
      const response = await axios.put('http://localhost:9000/api/admin-news-approved', {
        _id: id,
        isApproved: !status,
      })
      if (response?.data?.code === 200) {
        Swal.fire({
          title: "Success",
          text: response?.data?.message,
          icon: "success",
        })
        fetchData()
      } else {
        Swal.fire({
          title: "Error",
          text: response?.data?.message,
          icon: "error",
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong.",
        icon: "error",
      })
    }
  }
  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post('https://news-portal-backend-2-d9eg.onrender.com/api/delete-news', { _id });
        if (response?.data?.code == 200) {
          Swal.fire({
            title: "News Delete",
            text: response?.data?.message,
            icon: "success"
          })
          fetchData()
        } else {
          Swal.fire({
            title: "News Delete",
            text: response?.data?.message,
            icon: "error"
          })
        }
      }
    });
  }

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">
          Your <span className="text-mycolor">News</span>
        </h2>

        <div className="table-responsive">
          <table className="table table-bordered table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>City</th>
                <th>Media</th>
                <th>Description</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {newsList?.map((item,) => (
                <tr key={item?._id}>
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
                  <td>{item?.desc?.slice(0, 40)}...</td>
                  <td>
                    <span
                      className={`badge ${item?.isApproved ? 'bg-success' : 'bg-danger'}`}
                    >
                      {item?.isApproved ? "Approved" : "Not Approved"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleApproval(item?._id, item?.isApproved)}
                      className={`btn btn-sm ${item?.isApproved ? 'btn-outline-danger' : 'btn-outline-success'
                        }`}
                    >
                      {item?.isApproved ? "Disapprove" : "Approve"}
                    </button>
                    <button onClick={() => handleDelete(item?._id)} className='ms-1 btn btn-danger'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {newsList?.length === 0 && (
          <div className="text-center mt-4">
            <h5 className="text-muted">No Records Found</h5>
          </div>
        )}
      </div>
    </>
  )
}

export default AllNews
