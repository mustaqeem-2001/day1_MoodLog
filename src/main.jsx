import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { StrictMode } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddMood from "./pages/AddMood.jsx";
import MoodEntry from "./pages/MoodEntry.jsx";
import Layout from "./layout/Layout.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<App />} />
        <Route element={<Layout />} >
          <Route path="addMood" element={<AddMood />} />
          <Route path="moodEntry/:moodId" element={<MoodEntry />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
  
)