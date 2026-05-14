import UsersList from "./admin/UsersList";
import AuthorsList from "./admin/AuthorsList";

export default function AdminDashboard() {

  return (

    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-cyan-50 px-4 py-10">

      <div className="max-w-7xl mx-auto">

        <div className="mb-14">

          <h1 className="text-5xl font-extrabold text-gray-900">

            Admin Dashboard 🛡️

          </h1>

          <p className="mt-5 text-lg text-gray-600">

            Manage users and authors.

          </p>

        </div>

        <div className="space-y-12">

          <UsersList />

          <AuthorsList />

        </div>

      </div>

    </div>
  );
}