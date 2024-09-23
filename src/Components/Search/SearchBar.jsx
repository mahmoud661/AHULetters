import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./SearchBar.css";
import MultipleSelect from "../Select/MultySelect";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const themeNew = createTheme({
  palette: {
    primary: {
      light: "#000",
      main: "#3a73c2",
      dark: "#000",
      contrastText: "#fff",
    },
  },
});

export default function SearchBar(props) {
  const [yearSortDirection, setYearSortDirection] = useState("down");
  const [t, i18n] = useTranslation();
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState("");
  const [clearselect, setClearselect] = useState(false);
  const [collegeTag, setCollegeTag] = useState([]);
  const [departmentTag, setDepartmentTag] = useState([]);
  const [supervisorTag, setSupervisorTag] = useState([]);
  const [searchVisible, setSearchVisible] = useState(false);
  const [startYear, setStartYear] = useState("");
  const [endYear, setEndYear] = useState("");

  const supervisors = [
    "Supervisor A",
    "Supervisor B",
    "Supervisor C",
    "Supervisor D",
  ];

  const colleges = [
    "العلوم",
    "العلوم_التربوية",
    "تكنولوجيا_المعلومات",
    "الهندسة",
    "الأداب",
    "القانون",
    "البتراء_للسياحة_الاثار",
    "الاميرة_عائشة_لتمريض",
    "إدارة_الأعمال_والأقتصاد",
  ];

  const collegesWithDepartments = {
    العلوم: ["الفيزياء", "الكيمياء", "الرياضيات", "العلوم الحياتية"],
    العلوم_التربوية: [
      "المناهج والتدريس",
      "التربية الخاصة",
      "مواد متطلبات الجامعة",
    ],
    الأداب: [
      "اللغة العربية وآدابها",
      "الدراسات الإسلامية",
      "اللغة الإنجليزية",
      "العلاقات الدولية والدراسات الاستراتيجية",
      "التاريخ والجغرافيا",
      "علم المكتبات  و تكنولوجيا المعلومات",
    ],
    الهندسة: [
      "الهندسة المدنية",
      "الهندسة الكهربائية",
      "الهندسة الميكانيكية",
      "هندسة الحاسوب",
      "هندسة التعدين",
      "الهندسة الكيميائية",
      "هندسة الأتصالات",
      "هندسة بيئية",
    ],
    تكنولوجيا_المعلومات: [
      "هندسة البرمجيات",
      "نظم المعلومات الحاسوبية",
      "علم الحاسوب",
      "علم بيانات وذكاء اصطناعي",
    ],
    القانون: ["القانون الخاص", "القانون العام"],
    البتراء_للسياحة_الاثار: ["الاثار", "إدارة الفنادق"],
        إدارة_الأعمال_والأقتصاد: [
      "إدارة الأعمال",
      "نظم المعلومات الإدارية",
      "الإقتصاد",
      "المحاسبة والعلوم المالية والمصرفية",
    ],
    الاميرة_عائشة_لتمريض: ["التصوير الإشعاعي", "التحاليل الطبية", "التمريض"],
  };

  const [departments, setDepartments] = useState(() => {
    return Object.values(collegesWithDepartments).flat();
  });

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSearch = () => {
    if (input) {
      const newTags = [...tags, input];
      setTags(newTags);
      setInput("");
      props.onTagsChange(newTags);
    }
  };

  const handleDelete = (tagToDelete) => {
    const newTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(newTags);
    props.onTagsChange(newTags);
  };

  const handleClearAll = () => {
    setTags([]);
    props.onTagsChange([]);
  };

  const handleClearFilter = () => {
    setCollegeTag([]);
    setDepartmentTag([]);
    setSupervisorTag([]);
    setDepartments(Object.values(collegesWithDepartments).flat());
    setClearselect(true);
    setTimeout(() => setClearselect(false), 0);
  };

  const handleClearSort = () => setSelectedFilters("");

  const handleSelectChange = (value, selectType) => {
    switch (selectType) {
      case "collage":
        setCollegeTag(value);
        if (value.length === 0) {
          setDepartments(Object.values(collegesWithDepartments).flat());
        } else {
          const newDepartments = value.flatMap(
            (college) => collegesWithDepartments[college] || []
          );
          setDepartments(newDepartments);
        }
        break;
      case "department":
        setDepartmentTag(value);
        break;
      case "supervisor":
        setSupervisorTag(value);
        break;
      default:
        break;
    }
  };

  const handleFilterChange = (filterName) => {
    if (selectedFilters === filterName) {
      switch (filterName) {
        case "year":
          setSelectedFilters("yearDesc");
          break;
        case "yearDesc":
          setSelectedFilters("year");
          break;
        case "alphabet":
          setSelectedFilters("alphabetDesc");
          break;
        case "alphabetDesc":
          setSelectedFilters("alphabet");
          break;
        default:
          setSelectedFilters("");
          break;
      }
    } else {
      setSelectedFilters(filterName);
      if (filterName === "year") setYearSortDirection("up");
    }
  };

  const handleYearRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "startYear") {
      setStartYear(value);
    } else if (name === "endYear") {
      setEndYear(value);
    }
  };

  const handelclearYearRange = () => {
    setStartYear("");
    setEndYear("");
  };

  const toggleSearchVisibility = () => {
    setSearchVisible((prev) => !prev);
    const button = document.querySelector(".searchButton");
    button.classList.toggle("down", !searchVisible);
    button.classList.toggle("up", searchVisible);
  };

const {
  onSortTagChange,
  onYearRangeChange,
  onCollageTagChange,
  onDepartmentTagChange,
} = props;

useEffect(() => {
  onSortTagChange(selectedFilters);
  onYearRangeChange({ startYear, endYear });
  onCollageTagChange(collegeTag);
  onDepartmentTagChange(departmentTag);
}, [selectedFilters, collegeTag, departmentTag, startYear, endYear]);


  return (
    <ThemeProvider theme={themeNew}>
      <div className={"searchDiv " + (searchVisible ? "btnIn" : "btnOut")}>
        <div className={"Search_Bar " + (searchVisible ? "visible" : "hidden")}>
          <div className="Search_tag">
            <div className="group">
              <input
                placeholder={t("Search")}
                className="input"
                value={input}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
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
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-x"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
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
            <MultipleSelect
              selectChange={handleSelectChange}
              options={colleges}
              selectType="collage"
              clearSelect={clearselect}
            />
            <MultipleSelect
              selectChange={handleSelectChange}
              options={departments}
              selectType="department"
              clearSelect={clearselect}
            />
            <MultipleSelect
              selectChange={handleSelectChange}
              options={supervisors}
              selectType="supervisor"
              clearSelect={clearselect}
            />
            {(collegeTag.length > 0 || departmentTag.length > 0) && (
              <button className="clear-all" onClick={handleClearFilter}>
                {t("Clear")}
              </button>
            )}
          </div>
          <div className="Search_filter">
            <span>{t("Sort by")}:</span>
            <button
              className={`filter_btn ${selectedFilters === "alphabet" || selectedFilters === "alphabetDesc" ? "selected" : ""}`}
              onClick={() => handleFilterChange("alphabet")}
            >
              {selectedFilters === "alphabet" ? t("A-Z") : t("Z-A")}
            </button>
            <button
              className={`filter_btn ${selectedFilters === "year" ? "down" : "up"} ${selectedFilters.includes("year") ? "selected" : ""}`}
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
          <div className="Search_filter">
            <span>{t("Year Range")}:</span>

            <TextField
              onChange={handleYearRangeChange}
              id="standard-basic"
              type="number"
              name="startYear"
              label={t("From")}
              variant="standard"
              value={startYear}
              sx={{
                marginRight: 2,
                width: "100px",
                color: themeNew.palette.primary.main,
              }}
            />

            <TextField
              id="standard-basic"
              type="number"
              name="endYear"
              value={endYear}
              onChange={handleYearRangeChange}
              label={t("To")}
              variant="standard"
              sx={{
                marginLeft: 2,
                width: "100px",
                color: themeNew.palette.primary.main,
              }}
            />
            {(endYear || startYear) && (
              <button className="clear-all" onClick={handelclearYearRange}>
                {t("Clear")}
              </button>
            )}
          </div>
        </div>
        <button className={"searchButton up"} onClick={toggleSearchVisibility}>
          {t("Search")}
        </button>
      </div>
    </ThemeProvider>
  );
}
