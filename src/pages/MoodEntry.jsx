import { useState } from "react";
import moodEntries from "../data/moodEntries"
import { useParams } from "react-router-dom";
import "./moodEntry.css";

export default function MoodEntry() {
    const { moodId } = useParams();
    const currentMood = moodEntries[moodId - 1];
    const [ input, setInput] = useState(currentMood.note);
    const [ isEdit, setIsEdit ] = useState(false);

    function editEntry() {
        setIsEdit(!isEdit);
        console.log("edited");
    }

    function deleteEntry() {
        console.log("deleted");
    }

    return (
        <main>
            <article className="currentMood-container" aria-label={`Moood Entry: ${currentMood.label} created at ${currentMood.date}`}>
                <div className="currentMood-emoji-wrapper">
                    <p className="currentMood-emoji">{currentMood.emoji}</p>
                    <p className="currentMood-label" disabled={!isEdit}>{currentMood.label}</p>
                    <span className="currentMood-intensity" disabled={!isEdit}>{currentMood.intensity} intensity</span>
                </div>
                <section className="currentMood-date-wrapper">
                    <i className="fa-solid fa-book-medical"></i>
                    <div>
                        <h2>LOGGED</h2>
                        <p>{currentMood.date}</p>
                    </div>
                </section>
                <section className="currentMood-note-wrapper">
                    <h2>YOUR NOTE</h2>
                    <textarea value={input} onChange={(e) => setInput(e.target.value)} disabled={!isEdit}/> 
                </section>
            </article>
            <button className="edit-btn" onClick={editEntry}>{isEdit ? "SAVE ENTRY" : "EDIT ENTRY"}</button>
            <button className="delete-btn" onClick={deleteEntry}>
                <i className="fa-regular fa-trash-can"></i>
                DELETE ENTRY
            </button>
        </main>
    )
}