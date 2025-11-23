const BASE_URL = "/api";

export default async function apiFetch(endpoint, options = {}) {
  try {
    const token = localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const config = { ...options, headers };
    const response = await fetch(`${BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = new Error(response.statusText);
      error.response = errorData;
      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error("API error:", error);
    throw error;
  }
}
