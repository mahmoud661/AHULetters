import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("AHUThesisAdmin13500"));
    if (storedUser && storedUser.date) {
      const lastUpdateDate = new Date(storedUser.date);
      const currentDate = new Date();
      const differenceInDays =
        (currentDate - lastUpdateDate) / (1000 * 60 * 60 * 24);

      if (differenceInDays >= 5) {
        setAdmin(null);
        localStorage.removeItem("AHUThesisAdmin13500");
      } else {
        setAdmin(storedUser.Admin);
      }
    }
  }, []);

  const updateAdmin = (admin) => {
    if (admin) {
      localStorage.setItem(
        "AHUThesisAdmin13500",
        JSON.stringify({ Admin: admin, date: new Date() })
      );
    } else {
      localStorage.removeItem("AHUThesisAdmin13500");
    }

    setAdmin(admin);
  };

  return (
    <AuthContext.Provider value={{ admin, updateAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
