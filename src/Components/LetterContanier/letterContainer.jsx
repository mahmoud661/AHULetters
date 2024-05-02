import "./letterContainer.css";
import { useState, useEffect } from "react";
import data from "../../data.js";
import ScrollAnimation from "../scrollanimate.jsx";

// Function to remove diacritics from Arabic text
const removeDiacritics = (text) => {
  if (!text) return "";
  // Check if text is not null or undefined before calling normalize
  return text.normalize
    ? text.normalize("NFD").replace(/[\u064B-\u065F]/g, "")
    : text;
};


export default function LetterContainer({ tags, sortTag , collageTag, DepartmentTag}) {
  const [letters, setLetters] = useState(data);
  const lettersPerPage = 27;
  const [currentSection, setCurrentSection] = useState(1);
  const sectionsPerPage = 5;

  // Function to filter letters based on tags
const filterLetters = () => {
  
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
          return normalizedValue.toLowerCase() === normalizedTag.toLowerCase(); // Changed here
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
        const normalizedValue = removeDiacritics(letter.dept);
        return normalizedValue.toLowerCase() === normalizedTag.toLowerCase(); // Changed here
      }
      // If collageTags and departmentTags are empty, return true for all letters
      return true;
    });
    
};



  // Function to sort letters based on sortTag
  const sortLetters = (lettersToSort) => {
    if (sortTag.includes("year")) {
      lettersToSort.sort((a, b) => a.year - b.year);
    } else if (sortTag.includes("alphabet")) {
      lettersToSort.sort((a, b) =>
        a["letter Topic"].localeCompare(b["letter Topic"])
      );
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
      <h1 style={{ color: "#e0af14" }}>Thesis</h1>
      <div className="letter_contanier">
        {sortedLetters
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
                <div className="letter" key={index}>
                  <div className="card">
                    <div className="header">
                      <div>
                        <a className="title" href="#d">
                          {letter["letter Topic"]}
                        </a>
                        <p className="name"> {letter.researcher}</p>
                      </div>
                    </div>
                    <div className="description">
                      <div>الكلية : {letter.collage}</div>
                      <div>التخصص : {letter.dept}</div>
                      <div> المشرف : {letter.super}</div>
                    </div>
                    <dl className="post-info">
                      <div className="cr">
                        <dd className="dd"> {letter.year}</dd>
                        <dt className="dt">Published</dt>
                      </div>
                      <div className="cr">
                        <dd className="dd"> {letter.type}</dd>
                        <dt className="dt">Type</dt>
                      </div>
                      <div className="cr">
                        <dd className="dd"> EN</dd>
                        <dt className="dt">language</dt>
                      </div>
                    </dl>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
      </div>
      {/* Render section numbers for navigation */}
      <div className="section_navigation">
        <div onClick={handlePrevSections} className="btn-conteiner">
          <c className="btn-content left-arrow">
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
                  stroke-width="1"
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
          </c>
        </div>
        {renderSectionButtons()}
        <div onClick={handleNextSections} className="btn-conteiner">
          <c className="btn-content">
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
                  stroke-width="1"
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
          </c>
        </div>
      </div>
    </div>
  );
}
