import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    branch: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password, branch, role } = formData;

    if (!username || !password || !branch || !role) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
        branch,
        role,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      localStorage.setItem("userRole", role);
      localStorage.setItem("branch", branch);
      alert("Login successful!");
      setFormData({ username: "", password: "", branch: "", role: "" });
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert("Failed to login: " + (err.response?.data?.error || err.message));
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "style",
      null,
      `
        .login-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .login-container h2 {
          text-align: center;
          color: #333;
        }
        .login-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .login-form input, .login-form select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .login-form button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .login-form button:hover {
          background-color: #0056b3;
        }
        .login-form a {
          text-align: center;
          color: #007bff;
          text-decoration: none;
        }
        .login-form a:hover {
          text-decoration: underline;
        }
      `
    ),
    React.createElement(
      "div",
      { className: "login-container" },
      React.createElement("h2", null, "Login"),
      React.createElement(
        "form",
        { className: "login-form", onSubmit: handleSubmit },
        React.createElement("input", {
          type: "text",
          name: "username",
          placeholder: "Username",
          value: formData.username,
          onChange: handleInputChange,
        }),
        React.createElement("input", {
          type: "password",
          name: "password",
          placeholder: "Password",
          value: formData.password,
          onChange: handleInputChange,
        }),
        React.createElement(
          "select",
          {
            name: "branch",
            value: formData.branch,
            onChange: handleInputChange,
          },
          React.createElement("option", { value: "" }, "Select Branch"),
          React.createElement("option", { value: "Main Branch" }, "Main Branch"),
          React.createElement("option", { value: "City Branch" }, "City Branch"),
          React.createElement("option", { value: "Downtown Branch" }, "Downtown Branch")
        ),
        React.createElement(
          "select",
          {
            name: "role",
            value: formData.role,
            onChange: handleInputChange,
          },
          React.createElement("option", { value: "" }, "Select Role"),
          React.createElement("option", { value: "Admin" }, "Admin"),
          React.createElement("option", { value: "User" }, "User")
        ),
        React.createElement("button", { type: "submit" }, "Login")
      ),
      React.createElement(
        "p",
        { style: { textAlign: "center", marginTop: "10px" } },
        "Don't have an account? ",
        React.createElement("a", { href: "/register" }, "Register")
      )
    )
  );
};

export default LoginPage;