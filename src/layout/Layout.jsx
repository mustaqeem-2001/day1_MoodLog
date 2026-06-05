import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "./layout.css";
import { Outlet } from "react-router-dom";

export default function Layout({children}) {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}