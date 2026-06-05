import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();
    function goBack() {
        navigate(-1);
    }

    return <header>
        <i className="fa-solid fa-arrow-left" onClick={goBack}></i>
        <i className="fa-solid fa-book-medical"></i>
        <h1>MoodLog</h1>
    </header>
}