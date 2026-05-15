import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../stores/authStore";

import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function UserDashboard() {

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const currentUser = useAuth((state) => state.currentUser);

  // ================= FETCH ARTICLES =================

  const getArticles = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${API_URL}/user-api/articles`,
        {
          withCredentials: true
        }
      );

      setArticles(res.data.payload);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load articles");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    getArticles();
  }, []);

  // ================= ADD COMMENT =================

  const addComment = async () => {

    if (!commentText.trim()) {

      toast.error("Comment cannot be empty");

      return;
    }

    try {

      const res = await axios.put(
        `${API_URL}/user-api/comment/${selectedArticle._id}`,
        {
          comment: commentText
        },
        {
          withCredentials: true
        }
      );

      toast.success("Comment added ✨");

      setSelectedArticle(res.data.payload);

      setCommentText("");

    } catch (err) {

      console.log(err);

      toast.error("Failed to add comment");
    }
  };

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-5 text-gray-500 text-lg">
          Loading articles...
        </p>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

      {/* ================= HEADER ================= */}

      <div className="mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div>

          <h1 className="text-5xl font-extrabold text-gray-900">

            Welcome back,
            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {" "}
              {currentUser?.firstName}
            </span>
            👋

          </h1>

          <p className="mt-4 text-gray-600 text-lg leading-8">

            Explore trending articles, discover ideas,
            and engage with the community ✨

          </p>

        </div>

      </div>

      {/* ================= EMPTY STATE ================= */}

      {articles.length === 0 && (

        <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">

          <h2 className="text-3xl font-bold text-gray-800">
            No Articles Found 😔
          </h2>

          <p className="mt-4 text-gray-500">
            Authors haven’t published any articles yet.
          </p>

        </div>
      )}

      {/* ================= ARTICLES GRID ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {articles.map((article) => (

          <div
            key={article._id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
          >

            {/* IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="article"
              className="w-full h-56 object-cover"
            />

            {/* CONTENT */}

            <div className="p-6">

              <div className="flex items-center gap-3 mb-4">

                <img
                  src={
                    article.author?.profileImageUrl ||
                    `https://ui-avatars.com/api/?name=${article.author?.firstName}`
                  }
                  alt="author"
                  className="w-11 h-11 rounded-full object-cover border"
                />

                <div>

                  <p className="font-semibold text-gray-800">
                    {article.author?.firstName}
                  </p>

                  <p className="text-sm text-gray-400">
                    {article.category}
                  </p>

                </div>

              </div>

              <h2 className="text-2xl font-bold text-gray-900 leading-snug">

                {article.title}

              </h2>

              <p className="mt-4 text-gray-600 leading-7">

                {article.content.slice(0, 120)}...

              </p>

              <button
                className="mt-6 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-5 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
                onClick={() => setSelectedArticle(article)}
              >
                Read Full Article →
              </button>

            </div>

          </div>
        ))}

      </div>

      {/* ================= ARTICLE MODAL ================= */}

      {selectedArticle && (

        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4">

          <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* HERO IMAGE */}

            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
              alt="article"
              className="w-full h-87.5 object-cover"
            />

            <div className="p-8">

              {/* TITLE */}

              <h2 className="text-4xl font-extrabold text-gray-900 leading-tight">

                {selectedArticle.title}

              </h2>

              {/* AUTHOR */}

              <div className="flex items-center gap-4 mt-6">

                <img
                  src={
                    selectedArticle.author?.profileImageUrl ||
                    `https://ui-avatars.com/api/?name=${selectedArticle.author?.firstName}`
                  }
                  alt="author"
                  className="w-14 h-14 rounded-full object-cover border"
                />

                <div>

                  <p className="font-semibold text-gray-800 text-lg">

                    {selectedArticle.author?.firstName}

                  </p>

                  <p className="text-gray-400">

                    {selectedArticle.category}

                  </p>

                </div>

              </div>

              {/* CONTENT */}

              <p className="mt-8 text-gray-700 leading-9 text-lg">

                {selectedArticle.content}

              </p>

              {/* COMMENTS */}

              <div className="mt-12">

                <h3 className="text-3xl font-bold text-gray-900 mb-6">

                  Comments 💬

                </h3>

                {selectedArticle.comments?.length === 0 && (

                  <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">

                    No comments yet ✨

                  </div>
                )}

                <div className="space-y-5">

                  {selectedArticle.comments?.map((c, index) => (

                    <div
                      key={index}
                      className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition"
                    >

                      {/* USER INFO */}

                      <div className="flex items-center gap-4 mb-4">

                        <img
                          src={
                            c.user?.profileImageUrl ||
                            `https://ui-avatars.com/api/?name=${c.user?.firstName}`
                          }
                          alt="user"
                          className="w-12 h-12 rounded-full object-cover border"
                        />

                        <div>

                          <p className="font-bold text-gray-900 text-lg">

                            {c.user?.firstName}{" "}
                            {c.user?.lastName}

                          </p>

                          <p className="text-xs text-gray-400">

                            Community Member ✨

                          </p>

                        </div>

                      </div>

                      {/* COMMENT */}

                      <p className="text-gray-700 leading-8 text-[15px]">

                        {c.comment}

                      </p>

                    </div>
                  ))}

                </div>

                {/* COMMENT BOX */}

                <div className="mt-8">

                  <textarea
                    rows="4"
                    placeholder="Write your thoughts..."
                    className="w-full border border-gray-200 rounded-2xl p-5 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
                    value={commentText}
                    onChange={(e) =>
                      setCommentText(e.target.value)
                    }
                  />

                  <button
                    className="mt-5 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-7 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
                    onClick={addComment}
                  >
                    Add Comment ✨
                  </button>

                </div>

                {/* CLOSE */}

                <button
                  className="mt-8 text-red-500 hover:text-red-600 font-semibold"
                  onClick={() =>
                    setSelectedArticle(null)
                  }
                >
                  Close Article
                </button>

              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default UserDashboard;