import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function AuthorsList() {

  const [authors, setAuthors] = useState([]);

  // ================= FETCH AUTHORS =================

  const getAuthors = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/admin-api/users`,
        {
          withCredentials: true
        }
      );

      const filteredAuthors =
        res.data.payload.filter(
          (u) => u.role === "AUTHOR"
        );

      setAuthors(filteredAuthors);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to load authors"
      );
    }
  };

  useEffect(() => {
    getAuthors();
  }, []);

  // ================= BLOCK =================

  const blockAuthor = async (userId) => {

    try {

      await axios.put(
        `${API_URL}/admin-api/block`,
        { userId },
        {
          withCredentials: true
        }
      );

      toast.success("Author blocked");

      getAuthors();

    } catch (err) {

      console.log(err);

      toast.error("Block failed");
    }
  };

  // ================= UNBLOCK =================

  const unblockAuthor = async (userId) => {

    try {

      await axios.put(
        `${API_URL}/admin-api/unblock`,
        { userId },
        {
          withCredentials: true
        }
      );

      toast.success("Author unblocked");

      getAuthors();

    } catch (err) {

      console.log(err);

      toast.error("Unblock failed");
    }
  };

  return (

    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">

      <h2 className="text-4xl font-extrabold text-gray-900 mb-8">

        Authors List ✍️

      </h2>

      {authors.length === 0 ? (

        <p className="text-gray-500">
          No authors found
        </p>

      ) : (

        <div className="space-y-5">

          {authors.map((author) => (

            <div
              key={author._id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-gray-50 rounded-2xl p-5 border border-gray-100"
            >

              <div className="flex items-center gap-4">

                <img
                  src={
                    author.profileImageUrl ||
                    `https://ui-avatars.com/api/?name=${author.firstName}`
                  }
                  alt="author"
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>

                  <h3 className="text-xl font-bold text-gray-900">

                    {author.firstName}{" "}
                    {author.lastName}

                  </h3>

                  <p className="text-gray-500">

                    {author.email}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`font-semibold ${
                    author.isActive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {author.isActive
                    ? "Active"
                    : "Blocked"}
                </span>

                {author.isActive ? (

                  <button
                    onClick={() =>
                      blockAuthor(author._id)
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Block
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      unblockAuthor(author._id)
                    }
                    className="bg-green-500 text-white px-5 py-2 rounded-xl hover:bg-green-600 transition"
                  >
                    Unblock
                  </button>

                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default AuthorsList;