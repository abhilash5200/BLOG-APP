import React from "react";
import {
  NavLink,
  useNavigate,
  useLocation
} from "react-router-dom";

import { useAuth } from "../stores/authStore";



function Header() {

  const {
    currentUser,
    isAuthenticated,
    logout
  } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {

    const res = await logout();

    if (res?.success) {
      navigate("/login");
    }
  };

  // detect dashboard routes
  const isDashboardRoute =
    location.pathname.includes("user-profile") ||
    location.pathname.includes("author-profile") ||
    location.pathname.includes("admin-profile");

  return (

    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">

        {/* ================= LOGO ================= */}

<div
  className="flex items-center gap-3 cursor-pointer"
  onClick={() => navigate("/")}
>

  <div className="w-14 h-14 rounded-2xl bg-linear-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg">

    <span className="text-white text-2xl font-extrabold">
      B
    </span>

  </div>

  <div>

    <h1 className="text-2xl font-extrabold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">

      BlogSphere

    </h1>

    <p className="text-xs text-gray-500">

      Share ideas with the world ✨

    </p>

  </div>

</div>
        {/* ================= NAVBAR ================= */}

        {(!isAuthenticated || !isDashboardRoute) && (

          <nav>

            <ul className="flex items-center gap-3 md:gap-6 text-sm md:text-base font-medium">

              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `transition px-4 py-2 rounded-xl ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-50 text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `transition px-4 py-2 rounded-xl ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-50 text-gray-700"
                    }`
                  }
                >
                  Register
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `transition px-4 py-2 rounded-xl ${
                      isActive
                        ? "bg-blue-600 text-white shadow"
                        : "hover:bg-blue-50 text-gray-700"
                    }`
                  }
                >
                  Login
                </NavLink>
              </li>

            </ul>

          </nav>
        )}

        {/* ================= DASHBOARD USER ================= */}

        {isAuthenticated &&
          currentUser &&
          isDashboardRoute && (

          <div className="flex items-center gap-4">

            <div className="hidden sm:flex flex-col items-end">

              <span className="font-semibold text-gray-800">
                {currentUser.firstName}
              </span>

              <span className="text-xs text-gray-500">
                {currentUser.role}
              </span>

            </div>

            <img
              src={
                currentUser.profileImageUrl ||
                `https://ui-avatars.com/api/?name=${currentUser.firstName}`
              }
              alt="profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-blue-500 shadow-lg cursor-pointer hover:scale-105 transition"
              onClick={() => {

                if (currentUser.role === "USER") {
                  navigate("/user-profile");
                }

                if (currentUser.role === "AUTHOR") {
                  navigate("/author-profile");
                }

                if (currentUser.role === "ADMIN") {
                  navigate("/admin-profile");
                }
              }}
            />

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-md transition"
            >
              Logout
            </button>

          </div>
        )}

      </div>

    </header>
  );
}

export default Header;