import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./moodEntry.css";

export default function MoodEntry({ moods, setMoods }) {
    const { moodId } = useParams();
    const navigate = useNavigate();
    
    const currentMood = moods.find(entry => entry.id === Number(moodId));
    
    const [textInput, setTextInput] = useState(currentMood?.note || "");
    const [emojiLabel, setEmojiLabel] = useState(currentMood?.label || "");
    const [intensity, setIntensity] = useState(currentMood?.intensity || "Medium");
    const [isEdit, setIsEdit] = useState(false);

    if (!currentMood) {
        return <main><p>Entry not found.</p></main>;
    }

    function editEntry() {
        setIsEdit(!isEdit);
    }

    function saveEntry() {
        setMoods(prevMoods => 
            prevMoods.map(entry => 
                entry.id === currentMood.id 
                    ? { ...entry, label: emojiLabel, intensity: intensity, note: textInput }
                    : entry
            )
        );
        setIsEdit(false);
    }

    function deleteEntry() {
        setMoods(prevMoods => prevMoods.filter(entry => entry.id !== currentMood.id));
        navigate("/");
    }

    return (
        <main>
            <article className="currentMood-container" aria-label={`Mood Entry: ${currentMood.label} created at ${currentMood.date}`}>
                <div className="currentMood-emoji-wrapper">
                    <p className="currentMood-emoji">{currentMood.emoji}</p>
                    {isEdit ? (
                        <input 
                            type="text" 
                            className="currentMood-label-input"
                            value={emojiLabel} 
                            onChange={(e) => setEmojiLabel(e.target.value)} 
                        />
                    ) : (
                        <p className="currentMood-label">{emojiLabel}</p>
                    )}
                    {isEdit ? (
                        <div className="currentMood-intensity-edit-box">
                            <select 
                                className="currentMood-intensity-select"
                                value={intensity} 
                                onChange={(e) => setIntensity(e.target.value)}
                            >
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                            <span>intensity</span>
                        </div>
                    ) : (
                        <span className="currentMood-intensity">{intensity} intensity</span>
                    )}
                </div>

                <section className="currentMood-date-wrapper">
                    <i className="fa-solid fa-book-medical"></i>
                    <div>
                        <h2 className="currentMood-logged">LOGGED</h2>
                        <p className="currentMood-date">{currentMood.date}</p>
                    </div>
                </section>

                <section className="currentMood-note-wrapper">
                    <h2>YOUR NOTE</h2>
                    <textarea value={textInput} onChange={(e) => setTextInput(e.target.value)} disabled={!isEdit}/> 
                </section>
            </article>

            <button className="edit-btn" onClick={isEdit ? saveEntry : editEntry}>
                {isEdit ? "SAVE ENTRY" : "EDIT ENTRY"}
            </button>
            
            <button className="delete-btn" onClick={deleteEntry}>
                <i className="fa-regular fa-trash-can"></i>
                DELETE ENTRY
            </button>
        </main>
    )
}