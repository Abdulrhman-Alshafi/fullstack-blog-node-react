import { useState, useEffect } from "react";
import { getAllUsers, deleteUser, toggleUserAdmin } from "../../api/api";
import Loading from "../Loading";
import ErrorUI from "../ErrorUI";

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this user permanently?")) return;

    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
      alert("User deleted");
    } catch (err) {
      alert(err.response?.message || "Cannot delete user");
    }
  };

  const handleToggleAdmin = async (id) => {
    try {
      const updatedUser = await toggleUserAdmin(id);
      setUsers(users.map((u) => (u._id === id ? updatedUser : u)));
    } catch (err) {
      alert(err.response?.message || "Failed to update role");
    }
  };

  // Loading UI
  if (loading) return <Loading />;

  // Error UI
  if (error) return <ErrorUI error={error} onRetry={loadUsers} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Users</h1>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Role
              </th>
              <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      user.isAdmin
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-4">
                  <button
                    onClick={() => handleToggleAdmin(user._id)}
                    className={`font-semibold ${
                      user.isAdmin ? "text-orange-600" : "text-green-600"
                    } hover:underline`}
                  >
                    {user.isAdmin ? "Remove Admin" : "Make Admin"}
                  </button>

                  <button
                    onClick={() => handleDelete(user._id)}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
