import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

import UserDashboard from "./components/UserDashboard";
import AuthorDashboard from "./components/AuthorDashboard";
import AdminDashboard from "./components/AdminDashboard";
import EditArticle from "./components/EditArticle";

import ProtectedRoute from "./components/ProtectedRoute";
import Errorboundary from "./components/ErrorBoundary";

import { Toaster } from "react-hot-toast";

function App() {

  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <Errorboundary />,

      children: [

        // ================= HOME =================

        {
          path: "",
          element: <Home />
        },

        // ================= AUTH =================

        {
          path: "register",
          element: <Register />
        },

        {
          path: "login",
          element: <Login />
        },

        // ================= USER =================

        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserDashboard />
            </ProtectedRoute>
          )
        },

        // ================= AUTHOR =================

        {
          path: "author-profile",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <AuthorDashboard />
            </ProtectedRoute>
          )
        },

        // ================= ADMIN =================

        {
          path: "admin-profile",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          )
        },

        // ================= EDIT ARTICLE =================

        {
          path: "edit-article/:id",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          )
        }

      ]
    }
  ]);

  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: "#111827",
            color: "#fff",
            borderRadius: "12px",
            padding: "14px"
          }
        }}
      />

      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;