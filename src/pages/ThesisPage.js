//note that the thesis id should be id but for now will be the name of the researcher
import React from "react";
import "../App.css"
import Navbar from "../Components/NavBar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import SelectedThesis from "../Components/Thesis/SelectedThesis.jsx";
import { useParams } from "react-router-dom";

function Thesis() {
    const { ThesisId } = useParams();  

  return (
    <div>
      <Navbar />
      <SelectedThesis ThesisId={ThesisId}/>
      <Footer/>
    </div>
  );
}

export default Thesis;
