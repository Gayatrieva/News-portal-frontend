import React,{useEffect,useState} from 'react';
import './LatestNews.css';
import { FaSearch } from 'react-icons/fa';
import { useLocation,useNavigate } from "react-router-dom";
import Navbar from './Navbar';
import axios from 'axios';

function LatestNews() {
   const location = useLocation();
    const [categoryList, setCatrgoryList] = useState([])
  const [newsList, setNewsList] = useState([])
  const [cityList, setCityList] = useState([])
    useEffect(() => {
    fetchCategory()
    fetchTopNews()
    fetchCity()
  }, [])
  const navigate=useNavigate()
  const fetchCategory = async () => {
    const response = await axios.get('http://localhost:9000/api/top-category');
    if (response?.data?.code == 200) {
      setCatrgoryList(response?.data?.data?.slice(0, 4));
    }
  }
  const fetchTopNews = async () => {
    const response = await axios.get('http://localhost:9000/api/top-ten-news');
    if (response?.data?.code == 200) {
      setNewsList(response?.data?.data?.slice(0, 3));
    }
  }
  const fetchCity = async () => {
    const response = await axios.get('http://localhost:9000/api/top-city');
    if (response?.data?.code == 200) {
      setCityList(response?.data?.data?.slice(0, 4));
    }
  }

  return (
    <>
    {location?.pathname!== "/" && <Navbar />}
    
    <div className='bg-color pt-20' >
      <div className="container py-4">
        <p className="fs-3 text-center">
          Latest <b className="text-mycolor">News</b>
        </p>

       
        <div className="row mb-3">
          <div className="col-md-6 mx-auto">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search..." />
              <span className="input-group-text bg-mycolor text-light">
                <FaSearch />
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Left: Categories */}
          <div className="col-lg-3">
            <div className="card shadow-lg">
              <div className="card-header text-center text-mycolor ">
                <h5>News Category</h5>
              </div>
               <ul className="list-group list-group-flush">

                  {categoryList?.map((item) => {
                    return (<>
                      <li onClick={()=>{localStorage.setItem("newsDetails",JSON.stringify(item));navigate('/news-details')}}  className="list-group-item">
                        <div className='card m-1'>
                          <div className='row g-0'>
                            <div className='col-4'>
                              <img style={{width:'100'}} src={item?.url} className='img-fluid rounded-start ' />
                            </div>
                            <div className='col-8'>
                              <p className='text-center pt-1'><b>{item?.category}</b></p>
                            </div>
                          </div>
                        </div>
                      </li>

                    </>)
                  })}
                  {categoryList?.length == 0 && <h3 className='text-center'>No Record Found</h3>}
                </ul>
            </div>
          </div>

         
          <div className="col-lg-6">
            
              { newsList?.map((item)=>{
                return(
                  <>
                   <div onClick={()=>{localStorage.setItem("newsDetails",JSON.stringify(item));navigate('/news-details')}} className="card mb-3 mx-auto shadow-lg border border-0">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img width={180}  src={item?.url} className="img-thumbnail rounded-start latestimg" alt="..." />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body p-1">
                            <h6 className="card-title m-0">{item?.title}</h6>
                            <p className="card-text m-0">
                              {item?.desc?.slice(0, 130)}...
                            </p>
                            <p className='m-0'>
                              <button className='btn btn-danger p-1 '>View More</button>
                              <span className='mx-4 fw-bold'> {item?.category} </span>
                              <span className='fw-bold'> {item?.city}</span>
                            </p>
                            <p className="card-text m-0">
                              <small className="text-body-secondary">Last updated {new Date(item?.createdAt).toDateString()}</small>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })
              
              }
              {newsList?.length == 0 && <h3 className='text-center'>No Record Found</h3>}
           
          </div>

         
          <div className="col-lg-3">
            <div className="card shadow-lg">
              <div className="card-header text-center text-mycolor ">
                <h5>City</h5>
              </div>
              <ul className="list-group list-group-flush">
                  {
                    cityList?.map((item) => {
                      return (<>
                        <li  onClick={()=>{localStorage.setItem("newsDetails",JSON.stringify(item));navigate('/news-details')}} className="list-group-item">
                          <div className='card m-1'>
                            <div className='row g-0'>
                              <div className='col-4'>
                                <img width={100} src={item?.url} className='img-fluid rounded-start categoryimg' />
                              </div>
                              <div className='col-8'>
                                <p className='text-center pt-1'><b>{item?.city}</b></p>
                              </div>
                            </div>
                          </div>
                        </li>
                      </>)
                    })
                  }
                  {cityList?.length == 0 && <h3 className='text-center'>No Record Found</h3>}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default LatestNews;
