import {
  useEffect,
  useState
} from "react";

import {
  useLocation,
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

function ArticleByID() {

  const { id } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const [article, setArticle] = useState(
    location.state || null
  );

  const [loading, setLoading] = useState(false);

  // ================= FORMAT DATE =================

  const formatDate = (dateString) => {

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short"
    });
  };

  // ================= GET ARTICLE =================

  const getArticleById = async () => {

    try {

      setLoading(true);

      const res = await axios.get(
        `${API_URL}/user-api/articles/${id}`,
        {
          withCredentials: true
        }
      );

      setArticle(res.data.payload);

    } catch (err) {

      console.log(err);

      toast.error(
        "Failed to load article"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    if (!article) {
      getArticleById();
    }

  }, []);

  // ================= LOADING =================

  if (loading || !article) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-5 text-gray-500 text-lg">
          Loading article...
        </p>

      </div>
    );
  }

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">

      {/* Background Blur */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl opacity-20"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-300 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* HERO IMAGE */}

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-10">

          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1200&auto=format&fit=crop"
            alt="article"
            className="w-full h-100 object-cover"
          />

        </div>

        {/* CONTENT CARD */}

        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-8 md:p-12">

          {/* CATEGORY */}

          <span className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">

            {article.category}

          </span>

          {/* TITLE */}

          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">

            {article.title}

          </h1>

          {/* AUTHOR */}

          <div className="flex items-center gap-4 mt-8">

            <img
              src={
                article.author?.profileImageUrl ||
                `https://ui-avatars.com/api/?name=${article.author?.firstName}`
              }
              alt="author"
              className="w-14 h-14 rounded-full object-cover border"
            />

            <div>

              <p className="font-semibold text-gray-900 text-lg">

                {article.author?.firstName}{" "}
                {article.author?.lastName}

              </p>

              <p className="text-gray-400 text-sm">

                Published on{" "}
                {formatDate(article.createdAt)}

              </p>

            </div>

          </div>

          {/* ARTICLE BODY */}

          <div className="mt-12">

            <p className="text-gray-700 leading-10 text-lg whitespace-pre-line">

              {article.content}

            </p>

          </div>

          {/* COMMENTS */}

          <div className="mt-16">

            <h2 className="text-3xl font-bold text-gray-900 mb-8">

              Comments 💬

            </h2>

            {article.comments?.length === 0 && (

              <div className="bg-gray-50 rounded-2xl p-6 text-center text-gray-500">

                No comments yet ✨

              </div>
            )}

            <div className="space-y-5">

              {article.comments?.map(
                (comment, index) => (

                  <div
                    key={index}
                    className="bg-gray-50 rounded-2xl p-5 border border-gray-100"
                  >

                    <div className="flex items-center gap-3 mb-3">

                      <img
                        src={
                          comment.user?.profileImageUrl ||
                          `https://ui-avatars.com/api/?name=${comment.user?.firstName}`
                        }
                        alt="user"
                        className="w-11 h-11 rounded-full object-cover border"
                      />

                      <div>

                        <p className="font-semibold text-gray-900">

                          {comment.user?.firstName}{" "}
                          {comment.user?.lastName}

                        </p>

                      </div>

                    </div>

                    <p className="text-gray-600 leading-7">

                      {comment.comment}

                    </p>

                  </div>
                )
              )}

            </div>

          </div>

          {/* BACK BUTTON */}

          <button
            onClick={() => navigate(-1)}
            className="mt-12 bg-linear-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl shadow-xl hover:scale-105 transition font-semibold"
          >
            ← Back
          </button>

        </div>

      </div>

    </div>
  );
}

export default ArticleByID;