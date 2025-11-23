import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerUser } from "../api/api";

export default function Register() {
  const navigate = useNavigate();

  // Yup Schema
  const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // React Hook Form Setup
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Submit Handler
  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data);
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
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>

        {/* NAME */}
        <input
          type="text"
          placeholder="Name"
          {...register("name")}
          className={`w-full p-3 border rounded mb-1 ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-600 text-sm mb-4">{errors.name.message}</p>
        )}

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={`w-full p-3 border rounded mb-1 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-600 text-sm mb-4">{errors.email.message}</p>
        )}

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          className={`w-full p-3 border rounded mb-1 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-600 text-sm mb-4">{errors.password.message}</p>
        )}

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}
