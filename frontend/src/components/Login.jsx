import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../stores/authStore";

import {
  pageBackground,
  pageWrapper,
  formCard,
  formTitle,
  inputClass,
  formGroup,
  submitBtn,
  labelClass,
  linkClass
} from "../styles/common";

function Login() {

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const navigate = useNavigate();

  const {
    login,
    loading,
    error
  } = useAuth();

  const onSubmit = async (userCredWithRole) => {

    const result = await login(userCredWithRole);

    if (result.success) {

      if (userCredWithRole.role === "user") {
        navigate("/user-profile");
      }

      if (userCredWithRole.role === "author") {
        navigate("/author-profile");
      }

      if (userCredWithRole.role === "admin") {
        navigate("/admin-profile");
      }
    }
  };

  return (

    <div className={pageBackground}>

      {/* Background Blur */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

      <div className={`${pageWrapper} relative z-10`}>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${formCard} backdrop-blur-xl bg-white/90 border border-white/40 shadow-2xl rounded-3xl`}
        >

          {/* Heading */}
          <div className="text-center mb-8">

            <h1 className={`${formTitle} text-4xl`}>
              Welcome Back 👋
            </h1>

            <p className="text-gray-500 mt-3 leading-7">
              Login to continue exploring amazing blogs and articles ✨
            </p>

          </div>

          {/* ================= ROLE ================= */}

          <div className={formGroup}>

            <label className={`${labelClass} font-semibold`}>
              Select Role
            </label>

            <div className="grid grid-cols-3 gap-3 mt-4">

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

                <div className="border rounded-2xl p-4 text-center peer-checked:bg-blue-600 peer-checked:text-white peer-checked:border-blue-600 hover:shadow-lg transition">

                  <p className="text-2xl mb-2">👤</p>

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

                <div className="border rounded-2xl p-4 text-center peer-checked:bg-cyan-600 peer-checked:text-white peer-checked:border-cyan-600 hover:shadow-lg transition">

                  <p className="text-2xl mb-2">✍️</p>

                  <p className="font-semibold">
                    Author
                  </p>

                </div>

              </label>

              {/* ADMIN */}
              <label className="cursor-pointer">

                <input
                  type="radio"
                  value="admin"
                  className="hidden peer"
                  {...register("role", {
                    required: "Role is required"
                  })}
                />

                <div className="border rounded-2xl p-4 text-center peer-checked:bg-purple-600 peer-checked:text-white peer-checked:border-purple-600 hover:shadow-lg transition">

                  <p className="text-2xl mb-2">🛡️</p>

                  <p className="font-semibold">
                    Admin
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

          {/* ================= EMAIL ================= */}

          <div className={formGroup}>

            <label className={labelClass}>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className={`${inputClass} rounded-2xl`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format"
                }
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}

          </div>

          {/* ================= PASSWORD ================= */}

          <div className={formGroup}>

            <label className={labelClass}>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className={`${inputClass} rounded-2xl`}
              {...register("password", {
                required: "Password is required"
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}

          </div>

          {/* Backend Error */}
          {error && (

            <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">

              <p className="text-red-500 text-sm text-center">
                {error}
              </p>

            </div>
          )}

          {/* Forgot Password */}
          <div className="text-right mb-5">

            <span className={linkClass}>
              Forgot password?
            </span>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`${submitBtn} rounded-2xl shadow-xl hover:scale-[1.02] transition`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login 🚀"}
          </button>

          {/* Register Link */}
          <p className="text-center mt-6 text-sm text-gray-600">

            Don't have an account?{" "}

            <span
              className={`${linkClass} font-semibold`}
              onClick={() => navigate("/register")}
            >
              Create one
            </span>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;