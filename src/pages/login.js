import { useState } from "react";
import "../styles/index.css";
import backgroundImg from "../../public/backgroundImg.jpg";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    // Validate email
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:");
      setFormData({ email: "", password: "" }); 
    }
    login(formData);
  };

  const login = async (value) => {
    try {
      const response = await fetch("../api/login", {
        method: "POST",
        body: JSON.stringify(value),
      });
      const data = await response.json();
      console.log("data from backend",data);
    } catch (err) {
      console.log("error", err);
    }
    setFormData({
      email: "",
      password: "",
    })
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg.src})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-sm p-6 bg-opacity-80 bg-gray-800 border border-gray-700 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-300"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-400">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-300">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Create a new account
          </a>
        </p>
      </form>
    </div>
  );
}
