import { useEffect, useState } from "react";

import axios from "axios";

import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function UsersList() {

  const [users, setUsers] = useState([]);

  // ================= FETCH USERS =================

  const getUsers = async () => {

    try {

      const res = await axios.get(
        `${API_URL}/admin-api/users`,
        {
          withCredentials: true
        }
      );

      const filteredUsers =
        res.data.payload.filter(
          (u) => u.role === "USER"
        );

      setUsers(filteredUsers);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to load users"
      );
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // ================= BLOCK =================

  const blockUser = async (userId) => {

    try {

      await axios.put(
        `${API_URL}/admin-api/block`,
        { userId },
        {
          withCredentials: true
        }
      );

      toast.success("User blocked");

      getUsers();

    } catch (err) {

      console.log(err);

      toast.error("Block failed");
    }
  };

  // ================= UNBLOCK =================

  const unblockUser = async (userId) => {

    try {

      await axios.put(
        `${API_URL}/admin-api/unblock`,
        { userId },
        {
          withCredentials: true
        }
      );

      toast.success("User unblocked");

      getUsers();

    } catch (err) {

      console.log(err);

      toast.error("Unblock failed");
    }
  };

  return (

    <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8">

      <h2 className="text-4xl font-extrabold text-gray-900 mb-8">

        Users List 👥

      </h2>

      {users.length === 0 ? (

        <p className="text-gray-500">
          No users found
        </p>

      ) : (

        <div className="space-y-5">

          {users.map((user) => (

            <div
              key={user._id}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-gray-50 rounded-2xl p-5 border border-gray-100"
            >

              <div className="flex items-center gap-4">

                <img
                  src={
                    user.profileImageUrl ||
                    `https://ui-avatars.com/api/?name=${user.firstName}`
                  }
                  alt="user"
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>

                  <h3 className="text-xl font-bold text-gray-900">

                    {user.firstName}{" "}
                    {user.lastName}

                  </h3>

                  <p className="text-gray-500">

                    {user.email}

                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <span
                  className={`font-semibold ${
                    user.isActive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {user.isActive
                    ? "Active"
                    : "Blocked"}
                </span>

                {user.isActive ? (

                  <button
                    onClick={() =>
                      blockUser(user._id)
                    }
                    className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
                  >
                    Block
                  </button>

                ) : (

                  <button
                    onClick={() =>
                      unblockUser(user._id)
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

export default UsersList;