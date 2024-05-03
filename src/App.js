import "./App.css";
import Home from "./pages/Home";
import Thesis from "./pages/ThesisPage";
import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
function App() {


  return (
    <div >
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/thesis/:ThesisId" element={<Thesis/>} />
    <Route path="/About"  element={<About/>} />
     </Routes>
    </div>
  );
}

export default App;
