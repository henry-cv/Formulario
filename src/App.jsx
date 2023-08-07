import React from "react";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import HolidayDetail from "./components/HolidayDetail";
import HolidayList from "./components/HolidayList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <Router>
      <div className="App">
        <CssBaseline />
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<HolidayList />} />
          <Route path="/holiday/create" element={<HolidayDetail />} />
          <Route path="/:action/:id" element={<HolidayDetail />} />
          <Route path="/:action" element={<HolidayDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
