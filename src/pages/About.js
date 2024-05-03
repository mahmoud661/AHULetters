//note that the thesis id should be id but for now will be the name of the researcher
import React from "react";
import "../App.css";
import Navbar from "../Components/NavBar/NavBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import AboutCo from "../Components/About/About_Co.jsx";

function About() {


  return (
    <div>
      <Navbar />
      <AboutCo/>
      <Footer />
    </div>
  );
}

export default About;
