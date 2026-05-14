import { useAuth } from "../stores/authStore";
import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles
}) {

  const {
    loading,
    currentUser,
    isAuthenticated
  } = useAuth();

  // ================= LOADING =================

  if (loading) {

    return (

      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-blue-50 via-white to-cyan-50">

        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        <h2 className="mt-6 text-2xl font-bold text-gray-700">
          Authenticating...
        </h2>

        <p className="mt-2 text-gray-500">
          Please wait a moment ✨
        </p>

      </div>
    );
  }

  // ================= NOT LOGGED IN =================

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" replace />;
  }

  // ================= ROLE CHECK =================

  if (
    allowedRoles &&
    !allowedRoles.includes(currentUser.role)
  ) {

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;