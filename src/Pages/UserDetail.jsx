import { useLocation, useNavigate } from "react-router-dom";

export default function UserDetail() {
  const { state: user } = useLocation();
  const navigate = useNavigate();

  // Fallback (important)
  if (!user) {
    return (
      <div className="p-6">
        <p className="mb-4">No user data. Please go back.</p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        ← Back
      </button>

      {/* Main Card */}
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={`https://i.pravatar.cc/80?u=${user.id}`}
            className="rounded-full border"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500">
              {user.company.name}
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">

          {/* Email */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-blue-600 underline">
              <a href={`mailto:${user.email}`}>
                {user.email}
              </a>
            </p>
          </div>

          {/* Phone */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{user.phone}</p>
          </div>

          {/* Website */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Website</p>
            <p className="font-medium text-blue-600 underline">
              <a
                href={`https://${user.website}`}
                target="_blank"
                rel="noreferrer"
              >
                {user.website}
              </a>
            </p>
          </div>

          {/* Company */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Company</p>
            <p className="font-medium">
              {user.company.name}
            </p>
          </div>

          {/* Address */}
          <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">
              {user.address.street}, {user.address.city}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}