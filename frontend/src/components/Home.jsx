import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaPenNib,
  FaUsers,
  FaRocket
} from "react-icons/fa";

function Home() {

  const navigate = useNavigate();

  return (

    <div className="overflow-hidden">

      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-white to-cyan-100 px-6">

        {/* Background Blur */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>

            <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6 shadow-sm">
              🚀 Modern Blogging Platform
            </span>

            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">

              Share Your
              <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                {" "}Ideas{" "}
              </span>

              With The World 🌍

            </h1>

            <p className="mt-8 text-lg text-gray-600 leading-9">

              Discover inspiring stories, publish powerful articles,
              and connect with a vibrant community of readers and writers.
              A beautiful platform built for creators, thinkers, and innovators.

            </p>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-5 mt-10">

              <button
                onClick={() => navigate("/register")}
                className="bg-linear-to-r from-blue-600 to-cyan-500 hover:scale-105 transition text-white px-8 py-4 rounded-2xl text-lg font-semibold shadow-xl"
              >
                Start Writing ✍️
              </button>

              <button
                onClick={() => navigate("/login")}
                className="bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 px-8 py-4 rounded-2xl text-lg font-semibold shadow-md transition"
              >
                Explore Platform
              </button>

            </div>

          </div>

          {/* RIGHT CARD */}
          <div className="relative">

            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200">

              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
                alt="blogging"
                className="rounded-2xl shadow-lg w-full h-87.5 object-cover"
              />

              <div className="mt-6">

                <h2 className="text-2xl font-bold text-gray-800">
                  Write. Publish. Inspire ✨
                </h2>

                <p className="mt-3 text-gray-600 leading-7">
                  Create engaging articles and share your thoughts
                  with thousands of readers around the globe.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FEATURES ================= */}

      <section className="py-24 bg-white px-6">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">

            Why Choose
            <span className="text-blue-600"> BlogSphere?</span>

          </h2>

          <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto leading-8">

            Everything you need to create, manage, and explore
            high-quality blog content in one beautiful platform.

          </p>

          {/* FEATURE CARDS */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">

            {/* CARD 1 */}
            <div className="bg-linear-to-br from-blue-50 to-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition border border-blue-100">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500 text-white flex items-center justify-center text-3xl shadow-lg">
                <FaPenNib />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Easy Publishing
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Publish articles effortlessly with a clean and modern writing experience.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="bg-linear-to-br from-cyan-50 to-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition border border-cyan-100">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500 text-white flex items-center justify-center text-3xl shadow-lg">
                <FaUsers />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Community Driven
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Connect with readers, writers, and creators from around the world.
              </p>

            </div>

            {/* CARD 3 */}
            <div className="bg-linear-to-br from-purple-50 to-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition border border-purple-100">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500 text-white flex items-center justify-center text-3xl shadow-lg">
                <FaRocket />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-800">
                Modern Experience
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                Enjoy fast performance, beautiful design, and responsive layouts.
              </p>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;