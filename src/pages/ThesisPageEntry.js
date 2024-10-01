//note that the thesis id should be id but for now will be the name of the researcher
import React from "react";
import "../App.css";
import Navbar from "../Components/NavBar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import SelectedThesisEntry from "../Components/Thesis/SelectedThesisEntry.jsx";
import { useParams } from "react-router-dom";

function ThesisEntry(props) {
  const { ThesisId } = useParams();

  return (
    <div>
      <Navbar updateAdmin={props.updateAdmin} />
      <SelectedThesisEntry ThesisId={ThesisId} />
    </div>
  );
}

export default ThesisEntry;
