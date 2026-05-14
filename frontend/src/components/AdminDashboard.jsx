import React from "react";

function AdminDashboard() {

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* ================= HEADER ================= */}

        <div className="mb-12">

          <h1 className="text-5xl font-extrabold text-gray-900">

            Admin Dashboard 🛡️

          </h1>

          <p className="mt-4 text-lg text-gray-600 leading-8">

            Manage users, monitor platform activity,
            and maintain the BlogSphere community.

          </p>

        </div>

        {/* ================= STATS ================= */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

          {/* USERS */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 font-medium">
                  Total Users
                </p>

                <h2 className="text-5xl font-extrabold text-gray-900 mt-4">
                  0
                </h2>

              </div>

              <div className="w-20 h-20 rounded-3xl bg-blue-100 flex items-center justify-center text-4xl">

                👥

              </div>

            </div>

          </div>

          {/* AUTHORS */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 font-medium">
                  Total Authors
                </p>

                <h2 className="text-5xl font-extrabold text-gray-900 mt-4">
                  0
                </h2>

              </div>

              <div className="w-20 h-20 rounded-3xl bg-cyan-100 flex items-center justify-center text-4xl">

                ✍️

              </div>

            </div>

          </div>

          {/* ARTICLES */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-gray-500 font-medium">
                  Articles Published
                </p>

                <h2 className="text-5xl font-extrabold text-gray-900 mt-4">
                  0
                </h2>

              </div>

              <div className="w-20 h-20 rounded-3xl bg-purple-100 flex items-center justify-center text-4xl">

                📚

              </div>

            </div>

          </div>

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* USER MANAGEMENT */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40">

            <h2 className="text-3xl font-bold text-gray-900 mb-6">

              User Management 👥

            </h2>

            <p className="text-gray-600 leading-8 mb-8">

              Block or unblock users and manage platform access permissions.

            </p>

            <button className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold">

              Manage Users

            </button>

          </div>

          {/* PLATFORM MONITOR */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-8 border border-white/40">

            <h2 className="text-3xl font-bold text-gray-900 mb-6">

              Platform Activity 📊

            </h2>

            <p className="text-gray-600 leading-8 mb-8">

              Monitor articles, comments, and user engagement across the platform.

            </p>

            <button className="bg-linear-to-r from-purple-600 to-pink-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold">

              View Analytics

            </button>

          </div>

        </div>

        {/* ================= COMING SOON ================= */}

        <div className="mt-12 bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl p-10 border border-white/40 text-center">

          <h2 className="text-4xl font-extrabold text-gray-900">

            More Features Coming Soon 🚀

          </h2>

          <p className="mt-5 text-lg text-gray-600 leading-8 max-w-3xl mx-auto">

            Advanced analytics, article moderation,
            real-time platform monitoring, and AI-powered insights
            will be added in future updates.

          </p>

        </div>

      </div>

    </div>
  );
}

export default AdminDashboard;