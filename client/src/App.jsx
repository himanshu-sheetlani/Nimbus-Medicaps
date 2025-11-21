import React from "react";
import { Route, Routes } from "react-router-dom";
import Land from "./pages/land/page";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Land />} />
    </Routes>
  );
};
export default App;
