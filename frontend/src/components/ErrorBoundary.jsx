import {
  useRouteError,
  useNavigate
} from "react-router-dom";

function Errorboundary() {

  const error = useRouteError();

  const navigate = useNavigate();

  const data =
    error?.data ||
    "Something went wrong";

  const status =
    error?.status ||
    "Error";

  const statusText =
    error?.statusText ||
    "Unexpected Error";

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 overflow-hidden relative">

      {/* Background Blur Effects */}

      <div className="absolute top-10 left-10 w-72 h-72 bg-red-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      {/* Main Card */}

      <div className="relative z-10 bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-10 md:p-14 text-center max-w-2xl w-full border border-white/40">

        {/* Error Emoji */}

        <div className="text-8xl mb-6">
          😵
        </div>

        {/* Status */}

        <h1 className="text-7xl font-extrabold text-red-500">

          {status}

        </h1>

        {/* Status Text */}

        <p className="text-3xl font-bold text-gray-900 mt-6">

          {statusText}

        </p>

        {/* Description */}

        <p className="text-gray-600 text-lg leading-8 mt-6">

          {typeof data === "string"
            ? data
            : "An unexpected error occurred while loading this page."}

        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">

          <button
            onClick={() => navigate("/")}
            className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold"
          >
            🏠 Go Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-100 transition font-semibold"
          >
            ← Go Back
          </button>

        </div>

        {/* Extra Text */}

        <p className="text-sm text-gray-400 mt-10">

          BlogSphere • Professional Blogging Platform

        </p>

      </div>

    </div>
  );
}

export default Errorboundary;