import "./App.css";
import { useState ,useEffect} from "react";
import Home from "./pages/Home";
import Thesis from "./pages/ThesisPage";
import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import Login from "./pages/Login";
import ThesisAdmin from "./pages/ThesisPageAdmin";


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
       setLoginAdmin(storedUser.user);
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
    localStorage.setItem("AHUThesisAdmin13500",null); // Remove the item when logging out
  }

  setLoginAdmin(admin);
};

  return (
    <Routes>
      <Route path="/" element={<Home updateAdmin={updateAdmin} />} />
      <Route
        path="/thesis/:ThesisId"
        element={
          admin !== null ? (
            <ThesisAdmin updateAdmin={updateAdmin} />
          ) : (
            <Thesis updateAdmin={updateAdmin} />
          )
        }
      />
      <Route path="/About" element={<About updateAdmin={updateAdmin} />} />
      <Route path="/Login" element={<Login updateAdmin={updateAdmin} />} />
    </Routes>
  );
}

export default App;
