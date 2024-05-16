import React, { useState } from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./SearchBar.css";

export default function SearchBar(props) {
  const [yearSortDirection, setYearSortDirection] = useState("down");

  const [t, i18n] = useTranslation();
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("");
  const [departments, setDepartments] = useState([
    "Department A",
    "Department B",
    "Department C",
  ]);

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
      switch (selectType) {
        case "college":
          setCollegeTag(selectedOption);
          if (selectedOption === "empty") {
            setDepartments(["Department A", "Department B", "Department C"]);
          } else {
            switch (selectedOption) {
              case "العلوم":
                setDepartments(["الفيزياء", "الكيمياء", "البيولوجيا"]);
                break;
              case "العلوم التربوية":
                setDepartments(["التربية الأساسية", "التربية الخاصة"]);
                break;
              // Add cases for other colleges as needed
              default:
                break;
            }
          }
          break;
        case "department":
          setDepartmentTag(selectedOption);
          break;
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
    setDepartments(["Department A", "Department B", "Department C"]);
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
    if (selectedFilters === filterName) {
      if (filterName === "year") {
        setSelectedFilters("yearDesc");
      } else if (filterName === "yearDesc") {
        setSelectedFilters("year");
      } else if (filterName === "alphabet") {
        setSelectedFilters("alphabetDesc");
      } else if (filterName === "alphabetDesc") {
        setSelectedFilters("alphabet");
      } else {
        setSelectedFilters("");
      }
    } else {
      setSelectedFilters(filterName);
      if (filterName === "year") {
        setYearSortDirection("up");
      }
    }
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
          <div className="group">
            <input
              placeholder={t("Search")}
              className="input"
              value={input}
              onChange={handleInputChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />
            <svg
              className="iconn"
              aria-hidden="true"
              viewBox="0 0 24 24"
              onClick={handleSearch}
            >
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
              </g>
            </svg>
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
                {t("Clear All")}
              </button>
            )}
          </div>
        </div>
        <div className="Search_filter">
          <span>{t("Filter by")}:</span>

          <select
            id="departmentSelect"
            className={`filter_btn ${
              selectedFilters.includes("department") ? "selected" : ""
            }`}
            onChange={(e) => handleSelectChange(e, "department")}
          >
            <option value="empty">{t("Select department...")}</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
          <select
            id="collegeSelect"
            className={`filter_btn filter_select ${
              selectedFilters.includes("college") ? "selected" : ""
            }`}
            onChange={(e) => handleSelectChange(e, "college")}
          >
           
              <option value={"empty"}>{t("Select college...")}</option>
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
            <option value="empty">{t("Select supervisor...")}</option>
            <option value="Supervisor 1">Supervisor 1</option>
            <option value="Supervisor 2">Supervisor 2</option>
            {/* Add more options as needed */}
          </select>
          {(collegeTag || departmentTag) && (
            <button className="clear-all" onClick={handleClearfilter}>
              {t("Clear")}
            </button>
          )}
        </div>
        <div className="Search_filter">
          <span>{t("Sort by")}:</span>
          <button
            className={`filter_btn ${
              selectedFilters === "alphabet" ||
              selectedFilters === "alphabetDesc"
                ? "selected"
                : ""
            }`}
            onClick={() => handleFilterChange("alphabet")}
          >
            {selectedFilters === "alphabet" ? t("A-Z") : t("Z-A")}
          </button>
          <button
            className={`filter_btn ${
              selectedFilters === "year" ? "down" : "up"
            } ${selectedFilters.includes("year") ? "selected" : ""}`}
            onClick={() =>
              handleFilterChange(
                selectedFilters === "year" ? "year" : "yearDesc"
              )
            }
          >
            {t("Year")}
          </button>

          {selectedFilters && (
            <button className="clear-all" onClick={handleClearSort}>
              {t("Clear")}
            </button>
          )}
        </div>
      </div>

      <button className={"searchButton up"} onClick={toggleSearchVisibility}>
        {t("Search")}
      </button>
    </div>
  );
}
