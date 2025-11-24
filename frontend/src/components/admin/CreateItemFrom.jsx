import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters"),
  slug: yup
    .string()
    .required("Slug is required")
    .matches(/^[a-z0-9-]+$/, "Slug must be lowercase and use hyphens only"),
});

export default function CreateItemForm({ title, onSubmit, buttonText }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitHandler = async (data) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-2xl"
    >
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Name"
            {...register("name")}
            className="px-5 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Slug */}
        <div>
          <input
            type="text"
            placeholder="slug-example"
            {...register("slug")}
            className="px-5 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          {errors.slug && (
            <p className="text-red-600 text-sm mt-1">{errors.slug.message}</p>
          )}
        </div>
      </div>

      <button
        disabled={isSubmitting}
        className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-bold py-3 px-8 rounded-lg transition"
      >
        {isSubmitting ? "Saving..." : buttonText}
      </button>
    </form>
  );
}
