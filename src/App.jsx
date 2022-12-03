import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Table from "./components/table/index";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
