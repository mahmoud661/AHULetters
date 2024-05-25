import "./letterContainer.css";
import { useState, useEffect } from "react";
import ScrollAnimation from "../scrollanimate.jsx";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Cookies from "js-cookie";
import { Alert, Button, Pagination, Stack } from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
// Function to remove diacritics from Arabic text
const removeDiacritics = (text) => {
  if (!text) return "";
  // Check if text is not null or undefined before calling normalize
  return text.normalize
    ? text.normalize("NFD").replace(/[\u064B-\u065F]/g, "")
    : text;
};

export default function LetterContainerEntry({
  tags,
  sortTag,
  collageTag,
  DepartmentTag,
}) {
  const [letters, setLetters] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to handle errors

  const lettersPerPage = 27;
  const [currentPage, setCurrentPage] = useState(1);
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
    return letters.filter((letter) => {
      // Check if the letter matches any of the collage tags
      const collageMatches =
        collageTag.length > 0 && collageTag[0] !== "empty"
          ? collageTag.some(
              (tag) =>
                removeDiacritics(letter.collage).toLowerCase() ===
                removeDiacritics(tag).toLowerCase()
            )
          : true;

      // Check if the letter matches any of the department tags
      const departmentMatches =
        DepartmentTag.length > 0 && DepartmentTag[0] !== "empty"
          ? DepartmentTag.some(
              (tag) =>
                removeDiacritics(letter.department).toLowerCase() ===
                removeDiacritics(tag).toLowerCase()
            )
          : true;

      // Return true if either collage or department match
      return collageMatches && departmentMatches;
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

  // Function to handle page change
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Effect to reset current page when tags change
  useEffect(() => {
    // Reset the current page to 1 whenever any of the filtering or sorting props change
    setCurrentPage(1);
  }, [tags, sortTag, collageTag, DepartmentTag]);

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
      <Link to={"/AddThesis"}>
        <Button
          variant="contained"
          style={{ backgroundColor: "#e0af14", color: "#ffffff" }}
        >
          {t("Add")}
        </Button>
      </Link>
      <div className="letter_contanier">
        {loading ? ( // Conditionally render loading message
          <div className="loading-message empty-message">Loading...</div>
        ) : sortedLetters.length === 0 ? (
          <div className="empty-message">{t("No thesis found")}</div>
        ) : (
          sortedLetters
            .slice(
              (currentPage - 1) * lettersPerPage,
              currentPage * lettersPerPage
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
        <Stack spacing={2}>
          <Pagination
            size="large"
            count={totalSections}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                {...item}
                className={`section_btn `}
                slots={
                  lang === "ar"
                    ? { previous: ArrowForwardIcon, next: ArrowBackIcon }
                    : { previous: ArrowBackIcon, next: ArrowForwardIcon }
                }
              />
            )}
          />
        </Stack>
      </div>
    </div>
  );
}
