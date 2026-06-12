import { useState } from "react";
import Footer from "./components/Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, useNavigate } from "react-router-dom";
import "./app.css";
import "./components/footer.css";

export function getFormattedDate() {
  const today = new Date();
  const options = { 
    weekday: 'long', 
    month: 'long',    
    day: 'numeric',   
    year: 'numeric'   
  };
  return today.toLocaleDateString('en-US', options);
}

export default function App({ moods }) {
  const navigate = useNavigate();
  
  return (
    <>
      <header className="home-header">
        <div>
          <i className="fa-solid fa-book-medical"></i>
          <h1>MoodLog</h1>
        </div>
        <p>{getFormattedDate()}</p>
      </header>
      <main>
        <section className="add-mood-container">
          <p className="today">TODAY</p>
          <h2 className="mood-question">How are you feeling?</h2>
          <Link to="/addMood">+ Log Your Mood</Link>
        </section>

        <section className="stats-container">
          <article className="stats-card">
            <i className="fa-regular fa-face-smile"></i>
            <p>{moods.length}</p>
            <p className="stats-text">Total Entries</p>
          </article>
          <article className="stats-card">
            <i className="fa-regular fa-calendar-days"></i>
            <p>7</p>
            <p className="stats-text">Mood Types</p>
          </article>
          <article className="stats-card">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p>{moods.length > 0 ? moods[moods.length - 1].emoji : "—"}</p>
            <p className="stats-text">Last Entry</p>
          </article>
        </section>

        <section className="mood-entries-container">
          <p className="mood-recent-entries">RECENT ENTRIES</p>
          {
            moods.toReversed().map((mood) => {
              return (
                <button key={mood.id} className="mood-item-card" onClick={() => navigate(`/moodEntry/${mood.id}`)}>
                  <span>{mood.emoji}</span>
                  <div className="mood-item">
                    <div>
                      <p>{mood.label}</p>
                      <time>{mood.date}</time>
                    </div>
                    <p>{mood.note}</p>
                  </div>
                </button>
              )
            })
          }
        </section>
      </main>
      <Footer />
    </>
  )
}