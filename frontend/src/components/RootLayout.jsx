import React, { useEffect } from "react";
import { Outlet } from "react-router";

import Header from "./Header";
import Footer from "./Footer";

import { useAuth } from "../stores/authStore";

function RootLayout() {

  const checkAuth = useAuth((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, []);

  return (

    <div className="flex flex-col min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 text-gray-800">

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="grow px-3 sm:px-5 md:px-8 py-4">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default RootLayout;