/**
=========================================================
* Material Tailwind Dashboard React - v2.1.0
=========================================================
* Product Page: https://www.creative-tim.com/product/material-tailwind-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-tailwind-dashboard-react/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import "../public/css/tailwind.css";

// Dark Mode Context
const DarkModeContext = React.createContext();

const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = React.useState(
    localStorage.getItem("darkMode") === "true" // Persist dark mode state
  );

  // Update the `html` class whenever dark mode changes
  React.useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode); // Save preference
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <DarkModeProvider>
            <App />
          </DarkModeProvider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </AuthProvider>
    
  </React.StrictMode>
);
