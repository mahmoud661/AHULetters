import "../App.css";
import { useState } from "react";
import LetterContainer from "../Components/LetterContanier/letterContainer.jsx";
import Navbar from "../Components/NavBar/NavBar.jsx";
import SearchBar from "../Components/Search/SearchBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

function Home(props) {
  const [tags, setTags] = useState([]);
  const [sortTags, setSorttags] = useState([]);
  const [collageTags, setCollageTags] = useState("");
  const [DepartmentTags, setDepartmentTags] = useState("");
    const [yearRange, setYearRange] = useState({
      startYear: null,
      endYear: null,
    });

  const handleTagsChange = (tags) => {
    setTags(tags);
  };
  const handleSortTagsChange = (sortTags) => {
    setSorttags(sortTags);
  };
  const handelCollageTagChange = (collageTags) => {
    setCollageTags(collageTags);
  };
  const handleDepartmentTagChange = (DepartmentTags) => {
    setDepartmentTags(DepartmentTags);
  };
 const handleYearRangeChange = (yearRange) => {
   setYearRange(yearRange);
 };
  return (
    <div className="page">
      <Navbar updateAdmin={props.updateAdmin} />
      <SearchBar
        onTagsChange={handleTagsChange}
        onSortTagChange={handleSortTagsChange}
        onCollageTagChange={handelCollageTagChange}
        onDepartmentTagChange={handleDepartmentTagChange}
        onYearRangeChange={handleYearRangeChange}
      />

      <LetterContainer
        tags={tags}
        sortTag={sortTags}
        collageTag={collageTags}
        DepartmentTag={DepartmentTags}
        yearRange={yearRange}
      />
    
    </div>
  );
}

export default Home;
