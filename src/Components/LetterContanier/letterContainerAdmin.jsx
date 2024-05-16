import "./letterContainer.css";
import { useState, useEffect } from "react";
import ScrollAnimation from "../scrollanimate.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";
import {Button} from "@mui/material";

// Function to remove diacritics from Arabic text
const removeDiacritics = (text) => {
  if (!text) return "";
  // Check if text is not null or undefined before calling normalize
  return text.normalize
    ? text.normalize("NFD").replace(/[\u064B-\u065F]/g, "")
    : text;
};

export default function LetterContainerAdmin({
  tags,
  sortTag,
  collageTag,
  DepartmentTag,
}) {
  const [letters, setLetters] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  const lettersPerPage = 27;
  const [currentSection, setCurrentSection] = useState(1);
  const sectionsPerPage = 5;

  async function getThesis() {
    try {
      const response = await fetch("http://localhost:13500/thesis");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setError(null);
      return await response.json();
      
    } catch (error) {
      setError(t("error1"));
    }
  }
  useEffect(() => {
    async function fetchData() {
      const thesisData = await getThesis();
      if (!error) {
        setLetters(thesisData);
        setLoading(false); // Set loading to false when data is fetched
      }
    }
    fetchData();
  }, [error]);
  const [t] = useTranslation();

  const lang = Cookies.get("i18next");
  // Function to filter letters based on tags
  const filterLetters = () => {
    if (!letters) {
      return [];
    }
    return letters
      .filter((letter) => {
        // If tags array is empty, return true for all letters
        if (tags.length === 0) {
          return true;
        }

        // Check if all tags are included in the letter properties
        return tags.every((tag) =>
          Object.values(letter).some((value) => {
            // Convert numbers to strings for comparison
            const stringValue = String(value);
            // Remove diacritics from both tag and value before comparison
            const normalizedTag = removeDiacritics(tag);
            const normalizedValue = removeDiacritics(stringValue);

            return normalizedValue
              .toLowerCase()
              .includes(normalizedTag.toLowerCase()); // Changed here
          })
        );
      })
      .filter((letter) => {
        // Filter based on collage if collageTags is not empty
        if (
          (collageTag.length > 0 || collageTag !== "") &&
          collageTag !== "empty"
        ) {
          const normalizedTag = removeDiacritics(collageTag);
          const normalizedValue = removeDiacritics(letter.collage);
          return normalizedValue.toLowerCase() === normalizedTag.toLowerCase(); // Changed here
        }
        return true;
      })
      .filter((letter) => {
        // Filter based on department if departmentTags is not empty
        if (
          (DepartmentTag.length > 0 || DepartmentTag !== "") &&
          DepartmentTag !== "empty"
        ) {
          const normalizedTag = removeDiacritics(DepartmentTag);
          const normalizedValue = removeDiacritics(letter.department);
          return normalizedValue.toLowerCase() === normalizedTag.toLowerCase(); // Changed here
        }
        // If collageTags and departmentTags are empty, return true for all letters
        return true;
      });
  };

  // Function to sort letters based on sortTag
  const sortLetters = (lettersToSort) => {
    if (sortTag.includes("year")) {
      lettersToSort.sort((a, b) =>
        sortTag === "year" ? a.year - b.year : b.year - a.year
      );
    } else if (sortTag.includes("alphabet")) {
      if (lang === "ar") {
        const collator = new Intl.Collator("ar", { sensitivity: "base" });
        lettersToSort.sort((a, b) =>
          sortTag === "alphabet"
            ? collator.compare(a.title, b.title)
            : collator.compare(b.title, a.title)
        );
      } else {
        lettersToSort.sort((a, b) =>
          sortTag === "alphabet"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title)
        );
      }
    }
    return lettersToSort;
  };

  const filteredLetters = filterLetters();
  const sortedLetters = sortLetters(filteredLetters);
  const totalSections = Math.ceil(sortedLetters.length / lettersPerPage);

  // Function to handle navigation to a specific section
  const handleSectionClick = (section) => {
    setCurrentSection(section);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to handle navigation to the previous sections group
  const handlePrevSections = () => {
    if (currentSection !== 1) {
      setCurrentSection(currentSection - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Function to handle navigation to the next sections group
  const handleNextSections = () => {
    if (currentSection !== totalSections) {
      setCurrentSection(currentSection + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Effect to reset current section when tags change
  useEffect(() => {
    // Reset the current section to 1 whenever any of the filtering or sorting props change
    setCurrentSection(1);
  }, [tags, sortTag, collageTag, DepartmentTag]);

  // Function to generate section buttons for the current group of sections
  const renderSectionButtons = () => {
    const sectionButtons = [];
    const startSection =
      Math.floor((currentSection - 1) / sectionsPerPage) * sectionsPerPage + 1;
    const endSection = Math.min(
      startSection + sectionsPerPage - 1,
      totalSections
    );
    for (let i = startSection; i <= endSection; i++) {
      sectionButtons.push(
        <button
          key={i}
          className={`section_btn ${
            i === currentSection ? "section_active" : ""
          }`}
          onClick={() => handleSectionClick(i)}
        >
          {i}
        </button>
      );
    }
    return sectionButtons;
  };

  return (
    <div className="main_contanier">
      {error ? (
        <div className="error">
          <Alert
            severity="error"
            onClose={() => {
              setError(null);
            }}
            style={{ backgroundColor: "#10060D", color: "white" }}
          >
            {error}
          </Alert>
        </div>
      ) : null}
      <h1 style={{ color: "#e0af14" }}>{t("thesis")}</h1>
      <Link to={"/AddThesis"}><Button
        variant="contained"
        style={{ backgroundColor: "#e0af14", color: "#ffffff" }}
      >
        {t("Add")}
      </Button></Link>
      <div className="letter_contanier">
        {loading ? ( // Conditionally render loading message
          <div className="loading-message empty-message">Loading...</div>
        ) : sortedLetters.length === 0 ? (
          <div className="empty-message">{t("No thesis found")}</div>
        ) : (
          sortedLetters
            .slice(
              (currentSection - 1) * lettersPerPage,
              currentSection * lettersPerPage
            )
            .map((letter, index) => {
              return (
                <ScrollAnimation
                  key={index}
                  direction={index % 2 === 0 ? "_right" : null}
                >
                  <Link
                    to={`/thesis/${letter._id}`}
                    className="letter"
                    key={index}
                  >
                    <div
                      className={`card ${
                        lang === "ar"
                          ? "card_image_back_left"
                          : "card_image_back_right"
                      }`}
                    >
                      <div className="header">
                        <div>
                          <div className="title">{letter.title}</div>
                          <p className="name">{letter.researcher}</p>
                        </div>
                      </div>
                      <div className="description">
                        <div>
                          {t("Collage")} {letter.collage}
                        </div>
                        <div>
                          {t("Department")} {letter.department}
                        </div>
                        <div>
                          {t("Supervisor")} {letter.supervisor}
                        </div>
                      </div>
                      <dl className="post-info">
                        <div className="cr">
                          <dd className="dd">{letter.year}</dd>
                          <dt className="dt">{t("Published")}</dt>
                        </div>
                        <div className="cr">
                          <dd className="dd">{letter.type}</dd>
                          <dt className="dt">{t("Type")}</dt>
                        </div>
                        <div className="cr">
                          <dd className="dd">{letter.language}</dd>
                          <dt className="dt">{t("Language")}</dt>
                        </div>
                      </dl>
                    </div>
                  </Link>
                </ScrollAnimation>
              );
            })
        )}
      </div>
      {/* Render section numbers for navigation */}
      <div className="section_navigation">
        <div onClick={handlePrevSections} className="btn-conteiner">
          <div className={`btn-content ${lang === "en" ? "left-arrow" : ""}`}>
            <span className="icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 66 43"
                height="30px"
                width="30px"
              >
                <g
                  fill-rule="evenodd"
                  fill="none"
                  strokeWidth="1"
                  stroke="none"
                  id="arrow"
                >
                  <path
                    fill="#e0af14"
                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                    id="arrow-icon-three"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
        {renderSectionButtons()}
        <div onClick={handleNextSections} className="btn-conteiner">
          <div className={`btn-content ${lang === "ar" ? "left-arrow" : ""}`}>
            <span className="icon-arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 66 43"
                height="30px"
                width="30px"
              >
                <g
                  fill-rule="evenodd"
                  fill="none"
                  strokeWidth="1"
                  stroke="none"
                  id="arrow"
                >
                  <path
                    fill="#e0af14"
                    d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                    id="arrow-icon-three"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
