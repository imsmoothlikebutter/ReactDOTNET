import React from "react";
import NavBar from "./components/NavBar";
import {Route,Routes} from "react-router-dom";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <div>
      <NavBar/>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
    </div>
  );
}