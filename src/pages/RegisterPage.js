import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
    const { username, email, password, branch, role } = formData;

    if (!username || !email || !password || !branch || !role) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
        branch,
        role,
      });
      alert(response.data.message);
      setFormData({ username: "", email: "", password: "", branch: "", role: "" });
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Failed to register: " + (err.response?.data?.error || err.message));
    }
  };

  return React.createElement(
    "div",
    null,
    React.createElement(
      "style",
      null,
      `
        .register-container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          font-family: Arial, sans-serif;
          border: 1px solid #ddd;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .register-container h2 {
          text-align: center;
          color: #333;
        }
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .register-form input, .register-form select {
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        .register-form button {
          padding: 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .register-form button:hover {
          background-color: #0056b3;
        }
        .register-form a {
          text-align: center;
          color: #007bff;
          text-decoration: none;
        }
        .register-form a:hover {
          text-decoration: underline;
        }
      `
    ),
    React.createElement(
      "div",
      { className: "register-container" },
      React.createElement("h2", null, "Register"),
      React.createElement(
        "form",
        { className: "register-form", onSubmit: handleSubmit },
        React.createElement("input", {
          type: "text",
          name: "username",
          placeholder: "Username",
          value: formData.username,
          onChange: handleInputChange,
        }),
        React.createElement("input", {
          type: "email",
          name: "email",
          placeholder: "Email",
          value: formData.email,
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
        React.createElement("button", { type: "submit" }, "Register")
      ),
      React.createElement(
        "p",
        { style: { textAlign: "center", marginTop: "10px" } },
        "Already have an account? ",
        React.createElement("a", { href: "/login" }, "Login")
      )
    )
  );
};

export default RegisterPage;