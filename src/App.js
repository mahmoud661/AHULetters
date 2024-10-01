// App.js
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Thesis from "./pages/ThesisPage";
import About from "./pages/About";
import Login from "./pages/Login";
import ThesisAdmin from "./pages/ThesisPageAdmin";
import AddThesisPage from "./pages/AddThesis";
import HomeAdmin from "./pages/HomeAdmin";
import ThesisEntry from "./pages/ThesisPageEntry";
import DashBoardPage from "./pages/DashBoardPage";
import HomeEntry from "./pages/HomeEntry";
import ProtectedRoute from  "./guards/ProtectedRoute";
import NotFound from "./pages/NotFound";
import { useContext } from "react";
import { AuthContext } from  "./context/AuthContext";


function App() {
  const { admin, updateAdmin } = useContext(AuthContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          admin ? (
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
          admin ? (
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
          <ProtectedRoute>
            <AddThesisPage updateAdmin={updateAdmin} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DashBoard"
        element={
          <ProtectedRoute adminOnly={true}>
            <DashBoardPage updateAdmin={updateAdmin} />
          </ProtectedRoute>
        }
      />
      {/* Add a catch-all route for 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
