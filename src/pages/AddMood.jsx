import { useState } from "react";
import availableMoodTypes from "../data/moods.js"; // This loads options structure
import "./addMood.css";
import { useNavigate } from "react-router-dom";

export default function AddMood({ moods, setMoods }) {
    const navigate = useNavigate();
    const [moodId, setMoodId] = useState(null);
    const [clickedIntensity, setclickedIntensity] = useState("Medium");
    const [userNote, setUserNote] = useState("");

    function formatMoodDate(timestamp) {
        const date = new Date(timestamp);
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' };
        const dateString = new Intl.DateTimeFormat('en-GB', dateOptions).format(date);
        const timeOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const timeString = new Intl.DateTimeFormat('en-US', timeOptions).format(date);
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
        if (!moodId) return alert("Please select a mood option first!");

        const selectedMoodType = availableMoodTypes.find(mood => mood.id === moodId);
                    
        const savedEntry = {
            id: moods.length > 0 ? Math.max(...moods.map(m => m.id)) + 1 : 1,
            emoji: selectedMoodType.emoji,
            label: selectedMoodType.label,
            intensity: clickedIntensity,
            date: formatMoodDate(Date.now()),
            note: userNote
        };

        // Update the top parent layout state safely with spreading
        setMoods(prevMoods => [...prevMoods, savedEntry]);
        navigate("/");
    }

    return (
        <main className="add-mood-main">
            <h1 className="question">How are you feeling?</h1>
            <p className="supporting-text">Pick the mood that best matches right now</p>

            <div className="emoji-container">
                {
                    availableMoodTypes.map(function(mood) {
                        return (
                            <button 
                                style={{borderWidth: moodId === mood.id ? "4px" : ""}}  
                                onClick={() => setMoodId(mood.id)} 
                                key={mood.id} 
                                className={`emoji ${mood.label.toLowerCase()}`}
                            >
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
                    <button style={intensityClickedStyles("Low")} onClick={() => setclickedIntensity("Low")} className="intensity-low">Low</button>
                    <button style={intensityClickedStyles("Medium")} onClick={() => setclickedIntensity("Medium")} className="intensity-medium">Medium</button>
                    <button style={intensityClickedStyles("High")} onClick={() => setclickedIntensity("High")} className="intensity-high">High</button>
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