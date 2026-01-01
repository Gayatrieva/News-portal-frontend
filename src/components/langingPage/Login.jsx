import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Invalid email'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Min 8 characters')
    .max(16, 'Max 16 characters'),
});

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = async (data) => {
    try {
      const response = await axios.post('https://news-portal-backend-2-d9eg.onrender.com/api/login', data);

      if (response?.data?.code === 200) {
        Swal.fire({
          title: 'Login Successful',
          text: response?.data?.message,
          icon: 'success',
        });

        localStorage.setItem('userInfo', JSON.stringify(response?.data?.data));

        if (response?.data?.data?.userType === 'user') {
          navigate('/user-alllist');
        } else if (response?.data?.data?.userType === 'admin') {
          navigate('/admin-newslist');
        }
      } else {
        Swal.fire({
          title: 'Login Failed',
          text: response?.data?.message || 'Invalid credentials',
          icon: 'error',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.message || 'Something went wrong',
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="container-fluid d-flex align-items-center justify-content-center"
        style={{ minHeight: '59vh', backgroundColor: '#f1f5f9' }}
      >
        <div className="card shadow-lg p-5" style={{ width: '100%', maxWidth: '500px' }}>
          <h3 className="text-center mb-4">
            <span style={{ color: '#983624ff' }}>Admin</span> Login
          </h3>

          <form onSubmit={handleSubmit(handleLogin)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                {...register('email')}
              />
              {errors.email && <p className="text-danger mt-1">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                {...register('password')}
              />
              {errors.password && <p className="text-danger mt-1">{errors.password.message}</p>}
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn"
                style={{
                  backgroundColor: '#983624ff',
                  color: 'white',
                  padding: '12px 0',
                  fontSize: '18px',
                  fontWeight: '600',
                  borderRadius: '8px',
                }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
