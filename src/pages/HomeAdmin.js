import "../App.css";
import { useState } from "react";
import LetterContainerAdmin from "../Components/LetterContanier/letterContainerAdmin.jsx";
import Navbar from "../Components/NavBar/NavBar.jsx";
import SearchBar from "../Components/Search/SearchBar.jsx";
import Footer from "../Components/Footer/Footer.jsx";

function HomeAdmin(props) {
  const [tags, setTags] = useState([]);
  const [sortTags, setSorttags] = useState([]);
  const [collageTags, setCollageTags] = useState("");
  const [DepartmentTags, setDepartmentTags] = useState("");
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

  return (
    <div className="page">
      <Navbar updateAdmin={props.updateAdmin}/>
      <SearchBar
        onTagsChange={handleTagsChange}
        onSortTagChange={handleSortTagsChange}
        onCollageTagChange={handelCollageTagChange}
        onDepartmentTagChange={handleDepartmentTagChange}
      />

      <LetterContainerAdmin
        tags={tags}
        sortTag={sortTags}
        collageTag={collageTags}
        DepartmentTag={DepartmentTags}
      />
      <Footer />
    </div>
  );
}

export default HomeAdmin;
