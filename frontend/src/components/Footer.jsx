import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaHeart,
} from "react-icons/fa";

function Footer() {
  return (

    <footer className="bg-gray-950 text-gray-300 mt-10 border-t border-gray-800">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* BRAND */}
        <div>

          <h1 className="text-3xl font-extrabold bg-linear-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            BlogSphere ✨
          </h1>

          <p className="mt-4 text-gray-400 leading-7">
            A modern blogging platform where creators share ideas,
            knowledge, experiences, and stories with the world.
          </p>

          <p className="mt-4 text-sm text-gray-500">
            Build. Write. Inspire 🚀
          </p>

        </div>

        {/* QUICK LINKS */}
        <div>

          <h2 className="text-xl font-semibold text-white mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3">

            <li>
              <a
                href="/"
                className="hover:text-cyan-400 transition"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="/register"
                className="hover:text-cyan-400 transition"
              >
                Register
              </a>
            </li>

            <li>
              <a
                href="/login"
                className="hover:text-cyan-400 transition"
              >
                Login
              </a>
            </li>

          </ul>

        </div>

        {/* SOCIALS */}
        <div>

          <h2 className="text-xl font-semibold text-white mb-5">
            Connect With Us
          </h2>

          <div className="flex gap-5 text-2xl">

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white hover:scale-110 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-400 hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-pink-400 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>

          </div>

          <p className="mt-6 text-gray-500 text-sm leading-6">
            Stay connected and keep exploring amazing content from
            creators around the globe 🌍
          </p>

        </div>

      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-800 py-5">

        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} BlogSphere. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            Made with
            <FaHeart className="text-red-500 animate-pulse" />
            by Abhilash
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;