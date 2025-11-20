import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      localStorage.setItem("userInfo", JSON.stringify(res));
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full p-3 border rounded mb-6"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
}
