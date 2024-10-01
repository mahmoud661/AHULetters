//note that the thesis id should be id but for now will be the name of the researcher
import React from "react";
import "../App.css"
import Navbar from "../Components/NavBar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import SelectedThesisAdmin from "../Components/Thesis/SelectedThesisadmin.jsx";
import { useParams } from "react-router-dom";

function ThesisAdmin(props) {
    const { ThesisId } = useParams();  

  return (
    <div>
      <Navbar updateAdmin={props.updateAdmin} />
      <SelectedThesisAdmin ThesisId={ThesisId} />
    
    </div>
  );
}

export default ThesisAdmin;
