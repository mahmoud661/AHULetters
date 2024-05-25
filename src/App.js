import "./App.css";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Thesis from "./pages/ThesisPage";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import ThesisAdmin from "./pages/ThesisPageAdmin";
import AddThesisPage from "./pages/AddThesis";
import HomeAdmin from "./pages/HomeAdmin";
import ThesisEntry from "./pages/ThesisPageEntry";
import DashBoardPage from "./pages/DashBoardPage";
import { Navigate } from "react-router-dom";
import HomeEntry from "./pages/HomeEntry";
function App() {
  const [admin, setLoginAdmin] = useState(null);
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("AHUThesisAdmin13500"));
    if (storedUser && storedUser.date) {
      const lastUpdateDate = new Date(storedUser.date);
      const currentDate = new Date();
      const differenceInDays =
        (currentDate - lastUpdateDate) / (1000 * 60 * 60 * 24);

      if (differenceInDays >= 5) {
        setLoginAdmin(null);
        localStorage.setItem("AHUThesisAdmin13500", null);
      } else {
        setLoginAdmin(storedUser.Admin);
      }
    } else {
      setLoginAdmin(null);
    }
  }, []);

  const updateAdmin = (admin) => {
    if (admin) {
      localStorage.setItem(
        "AHUThesisAdmin13500",
        JSON.stringify({ Admin: admin, date: new Date() })
      );
    } else {
      localStorage.setItem("AHUThesisAdmin13500", null); // Remove the item when logging out
    }

    setLoginAdmin(admin);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          admin !== null ? (
            admin.role === "admin" ? (
              <HomeAdmin updateAdmin={updateAdmin} />
            ) : (
              <HomeEntry updateAdmin={updateAdmin} />
            )
          ) : (
            <Home updateAdmin={updateAdmin} />
          )
        }
      />
      <Route
        path="/thesis/:ThesisId"
        element={
          admin !== null ? (
            admin.role === "admin" ? (
              <ThesisAdmin updateAdmin={updateAdmin} />
            ) : (
              <ThesisEntry updateAdmin={updateAdmin} />
            )
          ) : (
            <Thesis updateAdmin={updateAdmin} />
          )
        }
      />
      <Route path="/About" element={<About updateAdmin={updateAdmin} />} />
      <Route path="/Login" element={<Login updateAdmin={updateAdmin} />} />
      <Route
        path="/AddThesis"
        element={
          admin !== null ? (
            <AddThesisPage updateAdmin={updateAdmin} />
          ) : (
            <Home updateAdmin={updateAdmin} />
          )
        }
      />
      <Route
        path="/DashBoard"
        element={
          admin !== null ? (
            admin.role === "admin" ? (
              <DashBoardPage updateAdmin={updateAdmin} />
            ) : (
              <Navigate to="/" />
            )
          ) : (
            <Home updateAdmin={updateAdmin} />
          )
        }
      />
    </Routes>
  );
}

export default App;
