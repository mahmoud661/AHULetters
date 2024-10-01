import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import i18n from "./i18n";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import { AuthProvider } from "./context/AuthContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
  <AuthProvider>
    <div className="flex flex-col justify-between min-h-screen ">
      <main >
        <App />
      </main>
      <Footer />
    </div>
    </AuthProvider>
  </BrowserRouter>
);


reportWebVitals();
