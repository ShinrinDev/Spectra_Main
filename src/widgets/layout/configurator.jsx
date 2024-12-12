import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);
  const abbrev = ["K", "M", "B", "T"];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    const size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number === 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];
      break;
    }
  }

  return number;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;
  const [stars, setStars] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const sidenavColors = {
    white: "from-gray-100 to-gray-100 border-gray-200",
    dark: "from-black to-black border-gray-200",
  };

  useEffect(() => {
    fetch("https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react")
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white dark:bg-gray-900 text-black dark:text-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5"  className={`${
    darkMode ? "text-[#fad949]" : "text-black"
  }`}>
            Customize Dashboard
          </Typography>
          <Typography  className={`font-normal ${
    darkMode ? "text-[#fad949]" : "text-blue-gray-600"
  }`}>
            Choose your dashboard preference.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6"  className={`${darkMode ? "text-white" : "text-blue-gray"}`}>
            Sidebar Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" className={`${darkMode ? "text-white" : "text-blue-gray"}`}>
            Sidebar Background
          </Typography>
          <Typography variant="small" className={`${darkMode ? "text-[#fad949]" : "text-gray"}`} >
            Choose between 3 different sidebar backgrounds.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark")}
              className={`${
    darkMode ? "bg-[#fad949] text-white" : "bg-white text-black"
  } hover:shadow-lg`}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent")}
              className={`${
    darkMode ? "bg-[#fad949] text-white" : "bg-white text-black"
  } hover:shadow-lg`}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
              className={`${
    darkMode ? "bg-[#fad949] text-white" : "bg-white text-black"
  } hover:shadow-lg`}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" className={`${darkMode ? "text-white" : "text-blue-gray"}`}>
              Fixed Navbar
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" className={`${darkMode ? "text-white" : "text-blue-gray"}`}>
              Dark Mode
            </Typography>
            <Switch
              id="dark-mode-toggle"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </div>
  

          <hr />
          <div className="my-8 flex flex-col gap-4">
            <a
              href="https://www.material-tailwind.com/docs/react/installation?rel=mtdr"
              target="_black"
            >
              <Button variant="outlined" className={`${darkMode ? "bg-blue-gray text-[#fad949]" : ""}`}  fullWidth>
                View Documentation
              </Button>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
