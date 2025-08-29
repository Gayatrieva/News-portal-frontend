import React from 'react';
import { AiFillEye } from 'react-icons/ai';
import { FaRegCalendarAlt } from 'react-icons/fa';
import "./Slider.css"
function Slider() {
  // const primary = '#00ABE4';
  // const secondary = '#8B0000';
  // const textColor = '#333';

  const newsItems = [
    { img: '/microsoft.jpeg', title: 'Microsoft launches new AI suite', date: 'Sep 9, 2022' },
    { img: '/PM.jpeg', title: 'PM meets world leaders', date: 'Sep 9, 2022' },
    { img: '/PM2.jpeg', title: 'PM visits tech summit', date: 'Sep 9, 2022' },
    { img: '/Nature Beauty.jpeg', title: 'Nature conservation push worldwide', date: 'Sep 9, 2022' },
    { img: '/mass.jpeg', title: 'Massive rally in support of net neutrality', date: 'Sep 9, 2022' },
    { img: '/Rich.jpeg', title: 'Wealth gap widens post-pandemic', date: 'Sep 9, 2022' },
    { img: '/images/headline1.jpg', title: 'Education reforms get cabinet nod', date: 'Sep 9, 2022' },
    { img: '/Nature Beauty.jpeg', title: 'Nature conservation push worldwide', date: 'Sep 9, 2022' },
    { img: '/mass.jpeg', title: 'Massive rally in support of net neutrality', date: 'Sep 9, 2022' },
    { img: '/Rich.jpeg', title: 'Wealth gap widens post-pandemic', date: 'Sep 9, 2022' },
    { img: '/images/headline1.jpg', title: 'Education reforms get cabinet nod', date: 'Sep 9, 2022' },
  ];

  return (
    <div className='container-fluid px-3 mt-4 bg-color' >
      <div className='row slider'>
        {/* === Left: Carousel === */}
        <div className='col-lg-7 p-0'>
          <div id='carouselExample' className='carousel slide' data-bs-ride='carousel'>
            <div className='carousel-inner rounded shadow'>
              <div className='carousel-item active'>
                <img src='/PM2.jpeg' className='d-block w-100 img-fluid sliderimg' alt='PM2' />
                <div className='carousel-caption bg-dark bg-opacity-50 p-2 rounded'>
                  <h5 className='text-white'>PM visits tech summit</h5>
                  <p className='text-white'>Highlights from the Prime Minister's address at the innovation event.</p>
                </div>
              </div>
              <div className='carousel-item'>
                <img src='/microsoft.jpeg' className='d-block w-100 img-fluid sliderimg' alt='Microsoft' />
                <div className='carousel-caption bg-dark bg-opacity-50 p-2 rounded'>
                  <h5 className='text-white'>Microsoft launches new AI suite</h5>
                  <p className='text-white'>AI revolution across industries begins here.</p>
                </div>
              </div>
              <div className='carousel-item'>
                <img src='/PM.jpeg' className='d-block w-100 img-fluid sliderimg' alt='PM' />
                <div className='carousel-caption bg-dark bg-opacity-50 p-2 rounded'>
                  <h5 className='text-white'>PM meets world leaders</h5>
                  <p className='text-white'>Global summit for economic cooperation underway.</p>
                </div>
              </div>
            </div>
            <button className='carousel-control-prev' type='button' data-bs-target='#carouselExample' data-bs-slide='prev'>
              <span className='carousel-control-prev-icon' aria-hidden='true' />
              <span className='visually-hidden'>Previous</span>
            </button>
            <button className='carousel-control-next' type='button' data-bs-target='#carouselExample' data-bs-slide='next'>
              <span className='carousel-control-next-icon' aria-hidden='true' />
              <span className='visually-hidden'>Next</span>
            </button>
          </div>
        </div>

        
        <div className='col-lg-5 headmarquee bg-color' >
          <h4 className='text-center bg-light fw-bold py-2 mb-2'>
            Top 10 News <span >Headline</span>
          </h4>
          <marquee direction='up' scrollamount='3' behavior='scroll' height='390px'>
            {newsItems.map((news, index) => (
              <div className='card mb-3 mx-auto shadow-sm border-0' key={index} style={{ maxWidth: '95%' }}>
                <div className='row g-0'>
                  <div className='col-4'>
                    <img src={news.img} className='img-fluid rounded-start headlineimg' alt='...' />
                  </div>
                  <div className='col-8'>
                    <div className='card-body p-2'>
                      <p className='card-text m-0'>
                        <strong>{news.title}</strong>
                      </p>
                      <p className='m-0'>
                        <a className='btn btn-sm text-light p-1' >
                          <AiFillEye /> View More
                        </a>
                      </p>
                      <p className='card-text small text-muted mb-0 d-flex align-items-center gap-1'>
                        <FaRegCalendarAlt /> {news.date}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </marquee>
        </div>
      </div>
    </div>
  );
}

export default Slider;
