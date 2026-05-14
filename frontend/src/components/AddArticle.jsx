import { useForm } from "react-hook-form";

import axios from "axios";

import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function AddArticle() {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm();

  // ================= SUBMIT =================

  const onSubmit = async (formObj) => {

    try {

      const res = await axios.post(
        `${API_URL}/author-api/articles`,
        formObj,
        {
          withCredentials: true
        }
      );

      console.log(res.data);

      toast.success(
        "Article created successfully 🚀"
      );

      reset();

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to create article"
      );
    }
  };

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 flex justify-center items-center">

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-8 md:p-10 border border-white/40"
        >

          {/* HEADER */}

          <div className="mb-10 text-center">

            <h1 className="text-5xl font-extrabold text-gray-900">

              Create Article ✍️

            </h1>

            <p className="mt-4 text-gray-600 text-lg leading-8">

              Share your ideas and inspire readers around the world 🌍

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
                required:
                  "Title of an article is required!"
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

              Select Category

            </label>

            <select
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              {...register("category", {
                required:
                  "Category of an article is required!"
              })}
            >

              <option value="">
                Select Category
              </option>

              <option value="Technology">
                Technology
              </option>

              <option value="Education">
                Education
              </option>

              <option value="AI">
                AI
              </option>

              <option value="Programming">
                Programming
              </option>

            </select>

            {errors.category && (

              <p className="text-red-500 text-sm mt-2">

                {errors.category.message}

              </p>
            )}

          </div>

          {/* CONTENT */}

          <div className="mb-8">

            <label className="block text-sm font-semibold text-gray-700 mb-2">

              Article Content

            </label>

            <textarea
              placeholder="Write your article here..."
              rows="10"
              className="w-full border border-gray-200 rounded-2xl p-4 focus:outline-none focus:ring-4 focus:ring-blue-500/10"
              {...register("content", {
                required:
                  "Content is required!"
              })}
            />

            {errors.content && (

              <p className="text-red-500 text-sm mt-2">

                {errors.content.message}

              </p>
            )}

          </div>

          {/* SUBMIT */}

          <div className="flex justify-center">

            <button
              className="bg-linear-to-r from-blue-600 to-cyan-500 text-white px-10 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold"
            >
              Publish Article 🚀
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddArticle;