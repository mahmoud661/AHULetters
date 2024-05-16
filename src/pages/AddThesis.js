//note that the thesis id should be id but for now will be the name of the researcher
import React from "react";
import "../App.css";
import Navbar from "../Components/NavBar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import AddThesis from "../Components/Thesis/AddThesis.jsx";

function AddThesisPage(props) {
  return (
    <div>
      <Navbar updateAdmin={props.updateAdmin} />
      <AddThesis />
      <Footer />
    </div>
  );
}

export default AddThesisPage;
