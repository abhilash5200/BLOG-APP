import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../stores/authStore";

import { useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function AuthorDashboard() {

  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const [showForm, setShowForm] = useState(false);

  const [newArticle, setNewArticle] = useState({
    title: "",
    category: "",
    content: ""
  });

  const [loading, setLoading] = useState(true);

  const currentUser =
    useAuth((state) => state.currentUser);

  const navigate = useNavigate();

  // ================= FETCH ARTICLES =================

  const getAuthorArticles = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${API_URL}/author-api/articles/${currentUser._id}`,
        {
          withCredentials: true
        }
      );

      setArticles(res.data.payload || []);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load articles");

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    if (currentUser?._id) {
      getAuthorArticles();
    }

  }, [currentUser]);

  // ================= CREATE ARTICLE =================

  const handleChange = (e) => {

    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateArticle = async (e) => {

    e.preventDefault();

    try {

      const articleData = {
        ...newArticle,
        author: currentUser._id
      };

      await axios.post(
        `${API_URL}/author-api/articles`,
        articleData,
        {
          withCredentials: true
        }
      );

      toast.success("Article published 🚀");

      setShowForm(false);

      setNewArticle({
        title: "",
        category: "",
        content: ""
      });

      getAuthorArticles();

    } catch (err) {

      console.log(err);

      toast.error("Failed to create article");
    }
  };

  // ================= DELETE =================

  const deleteArticle = async (id) => {

    try {

      await axios.patch(
        `${API_URL}/author-api/articles/${id}/status`,
        {
          isArticleActive: false
        },
        {
          withCredentials: true
        }
      );

      toast.success("Article deleted");

      setArticles((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                isArticleActive: false
              }
            : a
        )
      );

    } catch {

      toast.error("Delete failed");
    }
  };

  // ================= RESTORE =================

  const restoreArticle = async (id) => {

    try {

      await axios.patch(
        `${API_URL}/author-api/articles/${id}/status`,
        {
          isArticleActive: true
        },
        {
          withCredentials: true
        }
      );

      toast.success("Article restored");

      setArticles((prev) =>
        prev.map((a) =>
          a._id === id
            ? {
                ...a,
                isArticleActive: true
              }
            : a
        )
      );

    } catch {

      toast.error("Restore failed");
    }
  };

  // ================= EDIT =================

  const editArticle = (article) => {

    navigate(
      `/edit-article/${article._id}`,
      {
        state: article
      }
    );
  };

  // ================= LOADING =================

  if (!currentUser || loading) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-5 text-gray-500">
          Loading dashboard...
        </p>

      </div>
    );
  }

  return (

    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

        <div>

          <h1 className="text-5xl font-extrabold text-gray-900">

            Author Dashboard ✍️

          </h1>

          <p className="mt-4 text-gray-600 text-lg leading-8">

            Manage your articles, publish content,
            and engage with readers.

          </p>

        </div>

        <button
          onClick={() =>
            setShowForm(!showForm)
          }
          className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-7 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold"
        >
          ➕ Add Article
        </button>

      </div>

      {/* ================= ADD FORM ================= */}

      {showForm && (

        <form
          onSubmit={handleCreateArticle}
          className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 mb-10"
        >

          <h2 className="text-3xl font-bold text-gray-900 mb-8">

            Publish New Article 🚀

          </h2>

          <div className="space-y-5">

            <input
              type="text"
              name="title"
              placeholder="Article title"
              value={newArticle.title}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              required
            />

            <input
              type="text"
              name="category"
              placeholder="Category"
              value={newArticle.category}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              required
            />

            <textarea
              name="content"
              placeholder="Write your article..."
              value={newArticle.content}
              onChange={handleChange}
              rows="8"
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              required
            />

            <button
              type="submit"
              className="bg-linear-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition"
            >
              Publish Article ✨
            </button>

          </div>

        </form>
      )}

      {/* ================= EMPTY ================= */}

      {articles.length === 0 && (

        <div className="bg-white rounded-3xl shadow-lg p-12 text-center border border-gray-100">

          <h2 className="text-3xl font-bold text-gray-800">
            No Articles Yet 😔
          </h2>

          <p className="mt-4 text-gray-500">
            Start publishing your first article today.
          </p>

        </div>
      )}

      {/* ================= ARTICLES ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {articles.map((article) => (

          <div
            key={article._id}
            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
          >

            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="article"
              className="w-full h-56 object-cover"
            />

            <div className="p-6">

              <div className="flex items-center justify-between">

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">

                  {article.category}

                </span>

                <span
                  className={`text-sm font-semibold ${
                    article.isArticleActive
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {
                    article.isArticleActive
                      ? "Active"
                      : "Deleted"
                  }
                </span>

              </div>

              <h2 className="text-2xl font-bold text-gray-900 mt-5 leading-snug">

                {article.title}

              </h2>

              <p className="mt-4 text-gray-600 leading-7">

                {article.content.slice(0, 120)}...

              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
                  onClick={() =>
                    setSelectedArticle(article)
                  }
                >
                  Read
                </button>

                <button
                  className="bg-yellow-500 text-white px-4 py-2 rounded-xl hover:bg-yellow-600 transition"
                  onClick={() =>
                    editArticle(article)
                  }
                >
                  Edit
                </button>

                {article.isArticleActive ? (

                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                    onClick={() =>
                      deleteArticle(article._id)
                    }
                  >
                    Delete
                  </button>

                ) : (

                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition"
                    onClick={() =>
                      restoreArticle(article._id)
                    }
                  >
                    Restore
                  </button>

                )}

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* ================= MODAL ================= */}

      {selectedArticle && (

        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto p-4">

          <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden">

            <img
              src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
              alt="article"
              className="w-full h-87.5 object-cover"
            />

            <div className="p-8">

              <h2 className="text-4xl font-extrabold text-gray-900">

                {selectedArticle.title}

              </h2>

              <p className="mt-8 text-gray-700 leading-9 text-lg">

                {selectedArticle.content}

              </p>

              {/* COMMENTS */}

              <div className="mt-12">

                <h3 className="text-3xl font-bold mb-6">

                  Comments 💬

                </h3>

                {selectedArticle.comments?.length === 0 && (

                  <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">

                    No comments yet

                  </div>
                )}

                <div className="space-y-5">

                  {selectedArticle.comments?.map(
                    (c, index) => (

                      <div
                        key={index}
                        className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
                      >

                        <p className="font-semibold text-gray-800">

                          {c.user?.firstName}{" "}
                          {c.user?.lastName}

                        </p>

                        <p className="mt-2 text-gray-600 leading-7">

                          {c.comment}

                        </p>

                      </div>
                    )
                  )}

                </div>

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

export default AuthorDashboard;