import "../style/form.css";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/NavBar/NavBar";
import { useTranslation } from "react-i18next";
import { Alert ,CircularProgress } from "@mui/material";

export default function Login({ updateAdmin }) {
  const { t } = useTranslation();
  const [loginError, setLoginError] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false); // State variable to track loading state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    setLoading(true); // Set loading to true when login request starts

    e.preventDefault();
    try {
      const response = await fetch("http://localhost:13500/login", {
        method: "POST",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userName,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.user.active)
        {setResult({msg: "approve"});
        updateAdmin(data.user);// Assuming data.user contains user information 
      }
      else{
        setLoginError("User is not active. Please contact the admin.");

      }
        
      } else {
        setLoginError("Invalid email or password.");
        console.error("Login failed");
      }
    } catch (error) {
      setLoginError("An error occurred. Please try again later.");

      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after login request completes
    }
  };
  

  if (result.msg === "approve") {
    navigate("/");
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <Navbar updateAdmin={updateAdmin} />
      {loginError && (
        <Alert
          onClose={() => {
            setLoginError("");
          }}
          style={{ backgroundColor: "#10060D", color: "white" }}
          className="error"
          severity="error"
        >
          {loginError}
        </Alert>
      )}
      <div className="login_container">
        <div className="login_form">
          <p className="login_title">{t("Login")}</p>
          <input
            placeholder={t("Username")}
            className="login_username login_input"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e); // Pass the event object to handleSubmit
              }
            }}
          />
          <input
            placeholder={t("Password")}
            className="login_password login_input"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e); // Pass the event object to handleSubmit
              }
            }}
          />
          <button className="login_btn" type="submit" onClick={handleSubmit}>
            {loading ? <CircularProgress size={24} /> : t("Login")}
          </button>
        </div>
      </div>
    </div>
  );
}
