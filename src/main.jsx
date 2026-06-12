import { createRoot } from "react-dom/client";
import { StrictMode, useState } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import moodEntriesData from "./data/moodEntries.js";
import App from "./App.jsx";
import AddMood from "./pages/AddMood.jsx";
import MoodEntry from "./pages/MoodEntry.jsx";
import Layout from "./layout/Layout.jsx";

function Root() {
  const [moods, setMoods] = useState(moodEntriesData);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<App moods={moods} />} />
        <Route element={<Layout />} >
          <Route path="addMood" element={<AddMood moods={moods} setMoods={setMoods} />} />
          <Route path="moodEntry/:moodId" element={<MoodEntry moods={moods} setMoods={setMoods} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>
);