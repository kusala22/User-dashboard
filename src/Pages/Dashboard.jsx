import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [sortKey, setSortKey] = useState("name");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered = useMemo(() => {
    let data = users.filter(
      (u) =>
        u.name.toLowerCase().includes(debounced.toLowerCase()) ||
        u.email.toLowerCase().includes(debounced.toLowerCase())
    );

    data.sort((a, b) => {
      const valA =
        sortKey === "company"
          ? a.company.name.toLowerCase()
          : a[sortKey].toLowerCase();

      const valB =
        sortKey === "company"
          ? b.company.name.toLowerCase()
          : b[sortKey].toLowerCase();

      return order === "asc"
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    });

    return data;
  }, [users, debounced, sortKey, order]);

  const highlight = (text) => {
    if (!debounced) return text;
    const parts = text.split(new RegExp(`(${debounced})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === debounced.toLowerCase() ? (
        <span key={i} className="bg-yellow-300 px-1 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const getInsights = (user) => {
    const domain = user.email.split("@")[1];
    if (domain.includes("biz")) return "💼 Business";
    if (domain.includes("org")) return "🏢 Org";
    if (domain.includes("net")) return "🌐 Tech";
    return "👤 Personal";
  };

  if (loading)
    return <div className="p-6 text-gray-600">Loading users...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-6">

      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          👥 User Directory
        </h1>
        <span className="text-gray-500">
          {filtered.length} users
        </span>
      </div>

      {/* Search */}
      <input
        placeholder="🔍 Search users..."
        className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-indigo-400"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔥 Search feedback */}
      {debounced && (
        <p className="text-sm text-gray-500 mb-4">
          Showing results for "{debounced}"
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        
        {/* Sort Name */}
        <button
          onClick={() => setSortKey("name")}
          className={`px-4 py-2 rounded-lg text-white ${
            sortKey === "name"
              ? "bg-blue-700"
              : "bg-blue-500"
          }`}
        >
          Sort Name
        </button>

        {/* Sort Company */}
        <button
          onClick={() => setSortKey("company")}
          className={`px-4 py-2 rounded-lg text-white ${
            sortKey === "company"
              ? "bg-green-700"
              : "bg-green-500"
          }`}
        >
          Sort Company
        </button>

        {/* Toggle Order */}
        <button
          onClick={() =>
            setOrder(order === "asc" ? "desc" : "asc")
          }
          className="px-4 py-2 bg-gray-700 text-white rounded-lg"
        >
          {order === "asc" ? "Asc ↑" : "Desc ↓"}
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 text-gray-600 text-left">
            <tr>
              <th className="p-4">User</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Company</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((user) => (
              <tr
                key={user.id}
                onClick={() =>
                  navigate(`/user/${user.id}`, { state: user })
                }
                className="border-t hover:bg-indigo-50 cursor-pointer transition"
              >
                <td className="p-4 flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/40?u=${user.id}`}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">
                      {highlight(user.name)}
                    </p>
                    <p className="text-xs text-gray-400">
                      {getInsights(user)}
                    </p>
                  </div>
                </td>

                <td className="p-4 text-gray-600">
                  {highlight(user.email)}
                </td>

                <td className="p-4">{user.phone}</td>

                <td className="p-4">
                  {user.company.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}