import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  pageBackground,
  pageWrapper,
  formCard,
  formTitle,
  inputClass,
  formGroup,
  submitBtn,
  labelClass
} from "../styles/common";

const API_URL = import.meta.env.VITE_API_URL;

function Register() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  // cleanup preview
  useEffect(() => {

    return () => {

      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };

  }, [preview]);

  // ================= REGISTER =================

  const onUserRegister = async (newUser) => {

    try {

      setLoading(true);
      setErrorMsg(null);

      const formData = new FormData();

      let {
        role,
        profile,
        ...userObj
      } = newUser;

      // append text fields
      Object.keys(userObj).forEach((key) => {
        formData.append(key, userObj[key]);
      });

      // append image
      formData.append("profilePic", profile[0]);

      let url = "";

      if (role === "user") {
        url = `${API_URL}/user-api/users`;
      }

      if (role === "author") {
        url = `${API_URL}/author-api/users`;
      }

      const resObj = await axios.post(
        url,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (
        resObj.status === 200 ||
        resObj.status === 201
      ) {
        navigate("/login");
      }

    } catch (err) {

      console.log("Registration error:", err);

      setErrorMsg(
        err.response?.data?.message ||
        "Registration failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (

    <div className={pageBackground}>

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

      <div className={`${pageWrapper} relative z-10`}>

        <form
          onSubmit={handleSubmit(onUserRegister)}
          className={`${formCard} bg-white/90 backdrop-blur-xl rounded-3xl border border-white/40 shadow-2xl`}
        >

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className={`${formTitle} text-4xl`}>
              Join BlogSphere 🚀
            </h1>

            <p className="mt-3 text-gray-500 leading-7">
              Create your account and start your blogging journey today ✨
            </p>

          </div>

          {/* ================= ROLE ================= */}

          <div className={formGroup}>

            <label className={`${labelClass} font-semibold`}>
              Select Role
            </label>

            <div className="grid grid-cols-2 gap-4 mt-4">

              {/* USER */}
              <label className="cursor-pointer">

                <input
                  type="radio"
                  value="user"
                  className="hidden peer"
                  {...register("role", {
                    required: "Role is required"
                  })}
                />

                <div className="border rounded-2xl p-5 text-center peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:shadow-lg transition">

                  <p className="text-3xl mb-2">
                    👤
                  </p>

                  <p className="font-semibold">
                    User
                  </p>

                </div>

              </label>

              {/* AUTHOR */}
              <label className="cursor-pointer">

                <input
                  type="radio"
                  value="author"
                  className="hidden peer"
                  {...register("role", {
                    required: "Role is required"
                  })}
                />

                <div className="border rounded-2xl p-5 text-center peer-checked:bg-cyan-600 peer-checked:text-white peer-checked:border-cyan-600 hover:shadow-lg transition">

                  <p className="text-3xl mb-2">
                    ✍️
                  </p>

                  <p className="font-semibold">
                    Author
                  </p>

                </div>

              </label>

            </div>

            {errors.role && (
              <p className="text-red-500 text-sm mt-2">
                {errors.role.message}
              </p>
            )}

          </div>

          {/* FIRST NAME */}
          <div className={formGroup}>

            <label className={labelClass}>
              First Name
            </label>

            <input
              type="text"
              placeholder="Enter first name"
              className={`${inputClass} rounded-2xl`}
              {...register("firstName", {
                required: "First name required"
              })}
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName.message}
              </p>
            )}

          </div>

          {/* LAST NAME */}
          <div className={formGroup}>

            <label className={labelClass}>
              Last Name
            </label>

            <input
              type="text"
              placeholder="Enter last name"
              className={`${inputClass} rounded-2xl`}
              {...register("lastName", {
                required: "Last name required"
              })}
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName.message}
              </p>
            )}

          </div>

          {/* EMAIL */}
          <div className={formGroup}>

            <label className={labelClass}>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter email"
              className={`${inputClass} rounded-2xl`}
              {...register("email", {
                required: "Email required"
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* PASSWORD */}
          <div className={formGroup}>

            <label className={labelClass}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              className={`${inputClass} rounded-2xl`}
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters"
                }
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* PROFILE IMAGE */}
          <div className={formGroup}>

            <label className={labelClass}>
              Profile Image
            </label>

            <div className="border-2 border-dashed border-blue-200 rounded-2xl p-6 text-center bg-blue-50/50">

              <input
                type="file"
                accept="image/png,image/jpeg"
                className="w-full"
                {...register("profile", {
                  required: "Profile image required"
                })}
                onChange={(e) => {

                  const file = e.target.files[0];

                  if (!file) return;

                  if (
                    ![
                      "image/jpeg",
                      "image/png"
                    ].includes(file.type)
                  ) {
                    setErrorMsg(
                      "Only JPG or PNG allowed"
                    );
                    return;
                  }

                  if (
                    file.size > 2 * 1024 * 1024
                  ) {
                    setErrorMsg(
                      "File must be less than 2MB"
                    );
                    return;
                  }

                  const previewUrl =
                    URL.createObjectURL(file);

                  setPreview(previewUrl);
                  setErrorMsg(null);
                }}
              />

              <p className="mt-3 text-sm text-gray-500">
                Upload a beautiful profile image ✨
              </p>

            </div>

            {errors.profile && (
              <p className="text-red-500 text-sm mt-2">
                {errors.profile.message}
              </p>
            )}

            {errorMsg && (
              <p className="text-red-500 text-sm mt-2">
                {errorMsg}
              </p>
            )}

            {preview && (

              <div className="flex justify-center mt-5">

                <img
                  src={preview}
                  alt="preview"
                  className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
                />

              </div>
            )}

          </div>

          {/* Submit */}
          <button
            className={`${submitBtn} rounded-2xl shadow-xl hover:scale-[1.02] transition`}
            disabled={loading}
          >
            {
              loading
                ? "Creating Account..."
                : "Register 🚀"
            }
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-600">

            Already have an account?{" "}

            <span
              className="text-blue-600 font-semibold cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Register;