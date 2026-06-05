import moodEntries from "./data/moodEntries.js";
import Footer from "./components/Footer.jsx";
import "@fortawesome/fontawesome-free/css/all.css";
import { Link, useNavigate } from "react-router-dom";
import "./app.css";
import "./components/footer.css";

  export function getFormattedDate() {
    
    const date = new Date();
    const today = new Date();

      const options = { 
        weekday: 'long',  // "Tuesday"
        month: 'long',    // "May"
        day: 'numeric',   // "26"
        year: 'numeric'   // "2026"
      };

    const formattedDate = today.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  

export default function App() {
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
          <Link to="/addMood">
            + Log Your Mood
          </Link>
        </section>

        <section className="stats-container">
          <article className="stats-card">
            <i className="fa-regular fa-face-smile"></i>
            <p>{moodEntries.length}</p>
            <p className="stats-text">Total Entries</p>
          </article>
          <article className="stats-card">
            <i className="fa-regular fa-calendar-days"></i>
            <p>7</p>
            <p className="stats-text">Mood Types</p>
          </article>
          <article className="stats-card">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p>{moodEntries[moodEntries.length - 1].emoji}</p>
            <p className="stats-text">Last Entry</p>
          </article>
        </section>

        <section className="mood-entries-container">
          <p className="mood-recent-entries">RECENT ENTRIES</p>
          {
            moodEntries.toReversed().map((mood) => {
              return (
                <button key={mood.id} className="mood-item-card" onClick={() => navigate("/moodEntry")}>
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