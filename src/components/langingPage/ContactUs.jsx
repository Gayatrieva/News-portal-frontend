


import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaComment, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from './Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
// Form validation schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(2),
  email: yup.string().required('Email is required').email(),
  phone: yup.string().required('Phone is required').matches(/^\d{10}$/, 'Enter 10 digit phone number'),
  message: yup.string().required('Message is required').min(5),
});

const ContactUs = () => {
  const location = useLocation();
  const data = [
    {
      heading: 'Office Address',
      content: 'plot no-44, Behind HP Petrol Pump, tedi pulia ring rd, sector-5, vikas nagar, lucknow, uttar pradesh'
    },
    {
      heading: 'Call Us',
      content: '+91 7855679865'
    },
    {
      heading: 'Mail Us',
      content: 'acms@gmail.com'
    }
  ];
  const { register, handleSubmit, formState: { errors },  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleContact =async (data) => {
   const response=await axios.post('http://localhost:9000/api/add-contact-us',data);
   if(response?.data?.code==200){
     Swal.fire({
      title:"Contact US",
      text:response?.data?.message,
      icon:"success"
     })
   }else{
    Swal.fire({
      title:"Contact US",
      text:response?.data?.message,
      icon:"error"
     })
   }

  }
  return (
    <>
      {location?.pathname !== "/" && <Navbar />}

      <div className="container-fluid py-5 bg-color">
        <div className="row p-5 bg-white mx-auto shadow" style={{ maxWidth: "1100px" }}>
          <div className="col-md-6">
            <form onSubmit={handleSubmit((d) => handleContact(d))}>
              <div className="mb-3">
                <label className="form-label"><FaUser className="me-2" />Name</label>
                <input type="text" className='form-control'   {...register('name')} placeholder="Enter Your Name" />
                {errors.name && <p className="text-danger">{errors.name.message}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label"><FaEnvelope className="me-2" />Email</label>
                <input type="email" className='form-control'  {...register('email')} placeholder="Enter Your Email" />
                {errors.email && <p className="text-danger">{errors.email.message}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label"><FaPhone className="me-2" />Phone</label>
                <input type="text" className='form-control' {...register('phone')} placeholder="Enter Your Mobile Number" />
                {errors.phone && <p className="text-danger">{errors.phone.message}</p>}
              </div>

              <div className="mb-3">
                <label className="form-label"><FaComment className="me-2" />Message</label>
                <textarea className='form-control'   {...register('message')} rows={4} placeholder="Enter Your Message"></textarea>
                {errors.message && <p className="text-danger">{errors.message.message}</p>}
              </div>

              <button type="submit" className="btn btn-dark w-100">Submit</button>
            </form>
          </div>

          <div className="col-md-6">
            <h5 className="text-decoration-underline mb-4">Contact Info</h5>

            <p className="fw-bold text-danger"><FaMapMarkerAlt className="me-2" />{data[0].heading}</p>
            <p className="text-muted">{data[0].content}</p>

            <p className="fw-bold text-danger"><FaPhone className="me-2" style={{ transform: 'rotate(90deg)' }} />{data[1].heading}</p>
            <p><a className="text-dark text-decoration-none">{data[1].content}</a></p>

            <p className="fw-bold text-danger"><FaEnvelope className="me-2" />{data[2].heading}</p>
            <p><a className="text-dark text-decoration-none">{data[2].content}</a></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;