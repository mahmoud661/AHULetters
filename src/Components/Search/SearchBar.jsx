import React, { useState } from "react";
import { useEffect } from "react";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("");

  const [collegeTag, setCollegeTag] = useState("");
  const [departmentTag, setDepartmentTag] = useState("");
  // Add more state variables for other filter options as needed

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  const [searchVisible, setSearchVisible] = useState(false);

  const handleSelectChange = (e, selectType) => {
    const selectedOption = e.target.value;
    if (selectedOption !== "") {
      // Add the selected option to the corresponding filter tags
      switch (selectType) {
        case "college":
          setCollegeTag(selectedOption);
          break;
        case "department":
          setDepartmentTag(selectedOption);
          break;
        // Add more cases for other filter options as needed
        default:
          break;
      }
    }
  };

  const toggleSearchVisibility = () => {
    setSearchVisible(!searchVisible);
    const button = document.querySelector(".searchButton");
    button.classList.toggle("down", !searchVisible);
    button.classList.toggle("up", searchVisible);
  };
  const handleSearch = () => {
    if (input !== "") {
      setTags([...tags, input]);
      setInput("");

      props.onTagsChange([...tags, input]);
    }
  };

  const handleDelete = (tagToDelete) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
    props.onTagsChange(tags.filter((tag) => tag !== tagToDelete));
  };

  const handleClearAll = () => {
    setTags([]);
    props.onTagsChange([]);
  };
  const handleClearfilter = () => {
   
    setCollegeTag("");
    setDepartmentTag("");
    // You can also reset the select elements to their first options
    const departmentSelect = document.getElementById("departmentSelect");
    if (departmentSelect) {
      departmentSelect.value = "empty";
    }
    const collegeSelect = document.getElementById("collegeSelect");
    if (collegeSelect) {
      collegeSelect.value = "empty";
    }
  };
  const handleClearSort = () => {
    setSelectedFilters("");
   
  };

  const handleFilterChange = (filterName) => {
    // Toggle the filter on/off
    setSelectedFilters(filterName);
  };

  useEffect(() => {
    props.onSortTagChange(selectedFilters);
    props.onCollageTagChange(collegeTag);
    props.onDepartmentTagChange(departmentTag);
  });

  return (
    <div className={"searchDiv " + (searchVisible ? "btnIn" : "btnOut")}>
      <div className={"Search_Bar " + (searchVisible ? "visible" : "hidden")}>
        <div className="Search_tag">
          <div className="input-wrapper">
            <button className="icon" onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
            <input
              type="text"
              name="text"
              className="input_search"
              placeholder="search.."
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <div className="tags">
            {tags.map((tag, index) => (
              <div key={index} className="tag">
                {tag}
                <button
                  className="delete-icon"
                  onClick={() => handleDelete(tag)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    fill="currentColor"
                    className="bi bi-x-lg"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                  </svg>
                </button>
              </div>
            ))}
            {tags.length > 0 && (
              <button className="clear-all" onClick={handleClearAll}>
                Clear All
              </button>
            )}
          </div>
        </div>
        <div className="Search_filter">
          <span>Filter by:</span>

          <select
            id="departmentSelect"
            className={`filter_btn ${
              selectedFilters.includes("department") ? "selected" : ""
            }`}
            onChange={(e) => handleSelectChange(e, "department")}
          >
            <option value="empty">Select department...</option>
            <option value="Department A">Department A</option>
            <option value="الرياضيات">الرياضيات</option>
            {/* Add more options as needed */}
          </select>
          <select
            id="collegeSelect"
            className={`filter_btn ${
              selectedFilters.includes("college") ? "selected" : ""
            }`}
            onChange={(e) => handleSelectChange(e, "college")}
          >
            <option value={"empty"}>Select college...</option>
            <option value="العلوم">العلوم</option>
            <option value="العلوم التربوية">العلوم التربوية</option>
            <option value="تكنولوجيا المعلومات">تكنولوجيا المعلومات</option>
            <option value="الهندسة">الهندسة</option>
            <option value="الاداب">الاداب</option>
            <option value="القانون">القانون</option>
            <option value="البتراء للسياحة الاثار">
              البتراء للسياحة الاثار
            </option>
            <option value="الاميرة عائشة لتمريض">الاميرة عائشة لتمريض</option>

            {/* Add more options as needed */}
          </select>
          <select
            className={`filter_btn ${
              selectedFilters.includes("supervisor") ? "selected" : ""
            }`}
            onChange={handleSelectChange}
          >
            <option value="empty">Select supervisor...</option>
            <option value="Supervisor 1">Supervisor 1</option>
            <option value="Supervisor 2">Supervisor 2</option>
            {/* Add more options as needed */}
          </select>
          {(collegeTag || departmentTag) && (
            <button className="clear-all" onClick={handleClearfilter}>
              Clear
            </button>
          )}
        </div>
        <div className="Search_filter">
          <span>Sort by:</span>
          <button
            className={`filter_btn ${
              selectedFilters.includes("alphabet") ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("alphabet")}
          >
            A-Z
          </button>
          <button
            className={`filter_btn ${
              selectedFilters.includes("year") ? "selected" : ""
            }`}
            onClick={() => handleFilterChange("year")}
          >
            Year
          </button>

          {selectedFilters && (
            <button className="clear-all" onClick={handleClearSort}>
              Clear
            </button>
          )}
        </div>
      </div>

      <button className={"searchButton up"} onClick={toggleSearchVisibility}>
        Search
      </button>
    </div>
  );
}
