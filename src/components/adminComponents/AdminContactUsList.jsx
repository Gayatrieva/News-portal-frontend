import React, { useEffect, useState } from 'react';
import Navbar from '../langingPage/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminContactUsList = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/get-contact-us');
      if (response?.data?.code === 200) {
        setData(response?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching contact data:", error);
    }
  };

  const show = (message) => {
    Swal.fire({
      title: "Message",
      text: message,
      icon: 'info'
    });
  };

  // Pagination logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="table-responsive">
          <table className='table'>
            <thead className='table-dark'>
              <tr>
                <th>Sr.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {currentData?.map((item, index) => (
                <tr key={index}>
                  <td>{startIndex + index + 1}</td>
                  <td>{item?.name}</td>
                  <td>{item?.email}</td>
                  <td>{item?.phone}</td>
                  <td
                    onClick={() => show(item?.message)}
                    style={{ cursor: "pointer", color: "#007bff" }}
                  >
                    {item?.message?.slice(0, 30)}...
                  </td>
                </tr>
              ))}
              {currentData.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="d-flex justify-content-center">
          <ul className="pagination">
            {[...Array(totalPages)].map((_, i) => (
              <li
                key={i}
                className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default AdminContactUsList;
