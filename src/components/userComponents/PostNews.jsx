import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Navbar from '../langingPage/Navbar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Newsschema = yup.object().shape({
  title: yup.string().required('Title is required').min(2).max(30),
  category: yup.string().required('City is required'),
  city: yup.string().required('Category is required'),
  type: yup.string().required('Media type is required'),
  url: yup.string().required('Media URL is required'),
  desc: yup.string().required('Description is required').min(2).max(1000),
});

const PostNews = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(Newsschema),
  });

  const navigate = useNavigate();

  const handleAddNews = async (data) => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const finalObj = { ...data, userId: user?._id };

    try {
      const response = await axios.post('http://localhost:9000/api/add-news', finalObj);

      if (response?.data?.code === 200) {
        Swal.fire({
          title: 'News Added',
          text: response.data.message,
          icon: 'success',
        });
        reset();
        navigate('/user-list');
      } else {
        Swal.fire({
          title: 'Error',
          text: response.data.message,
          icon: 'error',
        });
      }
    } catch (err) {
      Swal.fire({
        title: 'Server Error',
        text: err.message,
        icon: 'error',
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="container-fluid p-5 bg-color" >
        <div className="row">
          <div className="col-md-7 col-sm-10 mx-auto">
            <div className="col-md-8 col-sm-10 mx-auto border rounded-1 py-3 px-4 shadow-lg">
              <div className='fs-3'>Post <b className='mycolor'>News</b></div>
              <form onSubmit={handleSubmit(handleAddNews)}>
                <div className="row my-3">
                  <div className="col-3 pt-2">Title</div>
                  <div className="col-9">
                    <input {...register('title')} type="text" placeholder="Enter news title" className='form-control' />
                    {errors.title && <p className='text-danger'>{errors.title.message}</p>}
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-3 pt-2">Category</div>
                  <div className="col-9">
                    <select {...register('category')} className='form-control form-dropdown'>
                      <option value="">-- Select Category --</option>
                      <option value="politics">Politics</option>
                      <option value="education">Education</option>
                      <option value="sports">Sports</option>
                      <option value="technology">Technology</option>
                      <option value="economic">Economic</option>
                      <option value="entertaiment">Entertainment</option>
                    </select>
                    {errors.category && <p className='text-danger'>{errors.category.message}</p>}
                  </div>
                </div>
                <div className="row my-3">
                    <div className="col-3 pt-2">City</div>
                    <div className="col-9">
                      <input type='text' {...register('city')} placeholder='Enter the City Name' className='form-control'/>  
                      {errors?.city && <p className='text-danger'>{errors?.city?.message}</p>}
                    </div>
                  </div>

                <div className="row my-3">
                  <div className="col-3 pt-2">Media Type</div>
                  <div className="col-9">
                    <select {...register('type')} className='form-control form-dropdown'>
                      <option value="">-- Select Media Type --</option>
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                    {errors.type && <p className='text-danger'>{errors.type.message}</p>}
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-3 pt-2">Media URL</div>
                  <div className="col-9">
                    <input {...register('url')} type="text" className='form-control' placeholder='Enter media URL' />
                    {errors.url && <p className='text-danger'>{errors.url.message}</p>}
                  </div>
                </div>

                <div className="row my-3">
                  <div className="col-3 pt-2">Description</div>
                  <div className="col-9">
                    <textarea {...register('desc')} className='form-control' placeholder="Enter description"></textarea>
                    {errors.desc && <p className='text-danger'>{errors.desc.message}</p>}
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-3 p-0"></div>
                  <div className="col-md-8 p-0">
                    <input
                      className='w-100 ms-3 rounded-3 btn btn-info'
                      style={{ background: '#7f0000' }}
                      type="submit"
                      value="Post News"
                    />
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

export default PostNews;
