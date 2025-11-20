import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiFetch from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      localStorage.setItem("userInfo", JSON.stringify(res));
      localStorage.setItem("token", res.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20">
      <form
        onSubmit={submitHandler}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded mb-6"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}
