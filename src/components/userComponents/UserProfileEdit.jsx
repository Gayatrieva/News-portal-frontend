import React, { useEffect } from 'react';
import Navbar from '../langingPage/Navbar';
import { FaUser, FaEnvelope, FaPhone, FaLock } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';

const USerSchema = yup.object().shape({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(20),
  contact: yup.string().required().min(10),
  address: yup.string().required().min(2),
  profile: yup.mixed().required(),
});

const UserProfileEdit = () => {
  const location = useLocation()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    resolver: yupResolver(USerSchema),
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    setValue('name', userData?.name);
    setValue('email', userData?.email);
    setValue('contact', userData?.contact);
    setValue('address', userData?.address);
    setValue('password', userData?.password);
  }, [setValue]);

  const handleUserRegister = async (data) => {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const formData = new FormData();
    formData.append('name', data?.name);
    formData.append('email', data?.email);
    formData.append('password', data?.password);
    formData.append('contact', data?.contact);
    formData.append('address', data?.address);
    formData.append('profile', data?.profile[0]);
    formData.append('_id', userData?._id);

    if (data?.profile?.length === 0) {
      Swal.fire({
        title: "Profile Update",
        text: "Please upload a profile image.",
        icon: "error",
      });
      return;
    }

    const response = await axios.put('https://news-portal-backend-2-d9eg.onrender.com/api/user-update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    if (response?.data?.code === 200) {
      Swal.fire({
        title: "Success",
        text: response?.data?.message,
        icon: "success",
      });
      localStorage.setItem('userInfo', JSON.stringify(response?.data?.data));
    } else {
      Swal.fire({
        title: "Error",
        text: response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      {location?.pathname !== "/" && <Navbar />}
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-11">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-center text-danger mb-4">User Profile</h2>
              <form onSubmit={handleSubmit(handleUserRegister)}>
                <div className="row g-3">
                  {/* Name */}
                  <div className="col-md-6">
                    <label className="form-label">Your Name</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaUser /></span>
                      <input type="text" {...register('name')} className="form-control" placeholder="Enter your name" />
                    </div>
                    {errors?.name && <p className="pt-1 text-danger">{errors?.name?.message}</p>}
                  </div>


                  <div className="col-md-6">
                    <label className="form-label">Your Email</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaEnvelope /></span>
                      <input type="email" disabled {...register('email')} className="form-control" placeholder="Enter your email" />
                    </div>
                    {errors?.email && <p className="pt-1 text-danger">{errors?.email?.message}</p>}
                  </div>

                  {/* Phone */}
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaPhone /></span>
                      <input type="text" {...register('contact')} className="form-control" placeholder="Enter phone number" />
                    </div>
                    {errors?.contact && <p className="pt-1 text-danger">{errors?.contact?.message}</p>}
                  </div>

                  {/* Password */}
                  <div className="col-md-6">
                    <label className="form-label">Password</label>
                    <div className="input-group">
                      <span className="input-group-text"><FaLock /></span>
                      <input type="text" {...register('password')} className="form-control" placeholder="Password" />
                    </div>
                    {errors?.password && <p className="pt-1 text-danger">{errors?.password?.message}</p>}
                  </div>

                  {/* Address */}
                  <div className="col-md-6">
                    <label className="form-label">Address</label>
                    <input type="text" {...register('address')} className="form-control" placeholder="Address" />
                    {errors?.address && <p className="pt-1 text-danger">{errors?.address?.message}</p>}
                  </div>

                  {/* Profile */}
                  <div className="col-md-6">
                    <label className="form-label">Profile Picture</label>
                    <input type="file" {...register('profile')} className="form-control" />
                    {errors?.profile && <p className="pt-1 text-danger">{errors?.profile?.message}</p>}
                  </div>

                  {/* Submit Button */}
                  <div className="col-12 text-center mt-3">
                    <input type="submit" value="Update" className="btn btn-outline-danger px-4 w-50" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfileEdit;
