import { useState } from "react";
import moodEntries from "../data/moodEntries.js";
import moods from "../data/moods.js";
import "./addMood.css";
import  { getFormattedDate } from "../App.jsx";
import { useNavigate } from "react-router-dom";

export default function AddMood() {
    const navigate = useNavigate();
    const [moodId, setMoodId] = useState(null);
    const [clickedIntensity, setclickedIntensity ] = useState(null);
    const [userNote, setUserNote ] = useState("");


    function formatMoodDate(timestamp) {
        const date = new Date(timestamp);

        // 1. Format the date part (25 May 2026)
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const dateString = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);

        // 2. Format the time part (3:00 PM)
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(date);

        // 3. Combine them with your middle dot separator
        return `${dateString} · ${timeString}`;
    }

    function intensityClickedStyles(intensity) {
        const styles = {
            backgroundColor: "#7f22fe",
            borderColor: "#7f22fe",
            color: "#fff"
        };
        return clickedIntensity === intensity ? styles : undefined;
    }

    function saveData() {
        const moodType = moodEntries.find(function(mood) {
                            return mood.id === moodId && mood.emoji;
                        });
                    
        const savedEntry = {
            id: moodEntries.length + 1,
            emoji: moodType.emoji,
            label: moodType.label,
            intensity: clickedIntensity,
            date: formatMoodDate(Date.now()),
            note: userNote
        }
        console.log(savedEntry);
        moodEntries.push(savedEntry);
        navigate("/");
    }

    return ( <main className="add-mood-main">
        <h1 className="question">How are you feeling?</h1>
        <p className="supporting-text">Pick the mood that best matches right now</p>

        <div className="emoji-container">
            {
                moods.map(function(mood) {
                    return (
                        <button style={{borderWidth: moodId === mood.id ? "4px" : ""}}  
                        onClick={() => setMoodId(mood.id)} 
                        key={mood.id} 
                        className={`emoji ${mood.label.toLowerCase()}`}>
                            <p>{mood.emoji}</p>
                            <p>{mood.label}</p>
                        </button>
                    )
                })
            }
        </div>
        <section className="intensity-levels-container">
            <h2 className="section-header">INTENSITY</h2>
            <div>
                <button style={intensityClickedStyles("low")} onClick={() => setclickedIntensity("low")} className="intensity-low">Low</button>
                <button style={intensityClickedStyles("medium")} onClick={() => setclickedIntensity("medium")} className="intensity-medium">Medium</button>
                <button style={intensityClickedStyles("high")} onClick={() => setclickedIntensity("high")} className="intensity-high">High</button>
            </div>
        </section>
        <section className="note-container">
            <h2 className="section-header note-header">ADD A NOTE</h2>
            <span className="optional">(optional)</span>

            <textarea value={userNote} className="user-input" onChange={(e) => setUserNote(e.target.value)} />
        </section>

        <button className="save-entry" onClick={saveData}>Save Entry</button>
        <p className="date">{formatMoodDate(Date.now())}</p>
    </main>
    )
}