import React from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaImage,
} from "react-icons/fa";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";

const UserSchema = yup.object().shape({
  name: yup.string().required().min(2),
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(20),
  contact: yup.string().required().min(10),
  address: yup.string().required().min(2),
  profile: yup.mixed().required(),
});

const UserRegister = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  const handleUserRegister = async (data) => {
    const formData = new FormData();
    formData.append("name", data?.name);
    formData.append("email", data?.email);
    formData.append("password", data?.password);
    formData.append("contact", data?.contact);
    formData.append("address", data?.address);
    formData.append("profile", data?.profile[0]);

    if (data?.profile?.length === 0) {
      Swal.fire({
        title: "User Registration",
        text: "Please Upload File",
        icon: "error",
      });
      return;
    }

    const response = await axios.post(
      "http://localhost:9000/api/user-register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response?.data?.code === 200) {
      Swal.fire({
        title: "User Registration",
        text: response?.data?.message,
        icon: "success",
      });
      navigate("/login");
    } else {
      Swal.fire({
        title: "User Registration",
        text: response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      {location.pathname !== "/" && <Navbar />}

      <div className="container-fluid min-vh-50 d-flex flex-column">
        <div className="container flex-grow-1 d-flex justify-content-center align-items-center mt-2 mb-3">
          <div className="bg-white p-4 rounded shadow" style={{ width: "900px" }}>
            <h2 className="text-center text-danger mb-4">Register Here</h2>

            <form onSubmit={handleSubmit(handleUserRegister)}>
              <div className="row g-3">
                {/* Name */}
                <FormGroup
                  label="Your Name"
                  icon={<FaUser />}
                  name="name"
                  register={register}
                  errors={errors}
                  placeholder="Enter your name"
                />

                {/* Email */}
                <FormGroup
                  label="Your Email"
                  icon={<FaEnvelope />}
                  name="email"
                  type="email"
                  register={register}
                  errors={errors}
                  placeholder="Enter your email"
                />

                {/* Phone */}
                <FormGroup
                  label="Phone Number"
                  icon={<FaPhone />}
                  name="contact"
                  register={register}
                  errors={errors}
                  placeholder="Enter phone number"
                />

                {/* Password */}
                <FormGroup
                  label="Password"
                  icon={<FaLock />}
                  name="password"
                  type="password"
                  register={register}
                  errors={errors}
                  placeholder="Enter password"
                />

                {/* Address */}
                <div className="col-md-6">
                  <label className="form-label">Address</label>
                  <input
                    type="text"
                    {...register("address")}
                    className="form-control"
                    placeholder="Address"
                  />
                  {errors?.address && (
                    <p className="pt-1 text-danger">
                      {errors?.address?.message}
                    </p>
                  )}
                </div>

                {/* Profile Picture */}
                <div className="col-md-6">
                  <label className="form-label">Profile Picture</label>
                  <div className="input-group">
                    <input
                      type="file"
                      {...register("profile")}
                      className="form-control"
                    />
                  </div>
                  {errors?.profile && (
                    <p className="pt-1 text-danger">
                      {errors?.profile?.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="text-center mt-3 mb-4 col-12">
                  <input
                    type="submit"
                    value="Register"
                    className="btn btn-outline-danger px-4 w-50"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Optional Footer Placeholder */}
        {/* <Footer /> */}
      </div>
    </>
  );
};

// Reusable Form Group
const FormGroup = ({
  label,
  icon,
  name,
  type = "text",
  register,
  errors,
  placeholder,
}) => (
  <div className="col-md-6">
    <label className="form-label">{label}</label>
    <div className="input-group">
      <span className="input-group-text">{icon}</span>
      <input
        type={type}
        {...register(name)}
        className="form-control"
        placeholder={placeholder}
      />
    </div>
    {errors?.[name] && (
      <p className="pt-1 text-danger">{errors?.[name]?.message}</p>
    )}
  </div>
);

export default UserRegister;
