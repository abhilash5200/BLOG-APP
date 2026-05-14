import {
  useLocation,
  useNavigate
} from "react-router-dom";

import { useForm } from "react-hook-form";

import axios from "axios";

import { toast } from "react-hot-toast";

import { useAuth } from "../stores/authStore";

const API_URL = import.meta.env.VITE_API_URL;

function EditArticle() {

  const location = useLocation();

  const navigate = useNavigate();

  const currentUser =
    useAuth((state) => state.currentUser);

  const article = location.state;

  // ================= SAFETY CHECK =================

  if (!article) {

    navigate("/author-profile");

    return null;
  }

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({

    defaultValues: {
      title: article.title,
      category: article.category,
      content: article.content
    }
  });

  // ================= UPDATE ARTICLE =================

  const onSubmit = async (data) => {

    try {

      await axios.put(
        `${API_URL}/author-api/articles`,
        {
          articleId: article._id,
          title: data.title,
          category: data.category,
          content: data.content,
          author: currentUser._id
        },
        {
          withCredentials: true
        }
      );

      toast.success(
        "Article updated successfully ✨"
      );

      navigate("/author-profile");

    } catch (err) {

      console.log(err);

      toast.error("Update failed");
    }
  };

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-4xl mx-auto">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 border border-white/40"
        >

          {/* HEADER */}

          <div className="mb-10">

            <h1 className="text-5xl font-extrabold text-gray-900">

              Edit Article ✍️

            </h1>

            <p className="mt-4 text-gray-600 text-lg leading-8">

              Improve your article and make it even more engaging for readers.

            </p>

          </div>

          {/* TITLE */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">

              Article Title

            </label>

            <input
              type="text"
              placeholder="Enter article title"
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              {...register("title", {
                required: "Title is required"
              })}
            />

            {errors.title && (

              <p className="text-red-500 text-sm mt-2">

                {errors.title.message}

              </p>
            )}

          </div>

          {/* CATEGORY */}

          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-700 mb-2">

              Category

            </label>

            <input
              type="text"
              placeholder="Enter category"
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              {...register("category", {
                required: "Category is required"
              })}
            />

            {errors.category && (

              <p className="text-red-500 text-sm mt-2">

                {errors.category.message}

              </p>
            )}

          </div>

          {/* CONTENT */}

          <div className="mb-8">

            <label className="block text-sm font-semibold text-gray-700 mb-2">

              Content

            </label>

            <textarea
              rows="10"
              placeholder="Write your article..."
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              {...register("content", {
                required: "Content is required"
              })}
            />

            {errors.content && (

              <p className="text-red-500 text-sm mt-2">

                {errors.content.message}

              </p>
            )}

          </div>

          {/* BUTTONS */}

          <div className="flex flex-col sm:flex-row gap-4">

            <button
              type="submit"
              className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold"
            >
              Save Changes 🚀
            </button>

            <button
              type="button"
              onClick={() =>
                navigate("/author-profile")
              }
              className="bg-white border border-gray-200 text-gray-700 px-8 py-4 rounded-2xl hover:bg-gray-100 transition font-semibold"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditArticle;