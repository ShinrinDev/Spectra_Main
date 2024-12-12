import { Routes, Route } from "react-router-dom";
import {
    Sidenav,
    DashboardNavbar,
    Configurator,
  } from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import React from 'react';

export function Admin() {
    const [controller, dispatch] = useMaterialTailwindController();
    const { sidenavType } = controller;
    return (
        <div className="min-h-screen bg-blue-gray-50/50 dark:bg-gray-900" >
        <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
       <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "admin" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
        <div className="text-blue-gray-600">
          
        </div>
      </div>
        </div>
    );
}

Admin.displayName = "/src/layout/admin.jsx";

export default Admin;

