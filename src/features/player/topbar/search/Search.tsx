import { KeyboardEvent, useState } from "react";

import styles from "./Search.module.css";

import search from "assets/busqueda.png";
import { useNavigate } from "react-router-dom";

export const Search = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')

    const handleSearch = (e: KeyboardEvent) => {
        if (e.key === 'Enter') navigate("/player/query?q=" + searchTerm)
    }

    return <div className={styles.search__container}>
        <img src={search} width={20} height={20} alt="Search" />
        <input placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)} onKeyDown={handleSearch}/>
    </div>
}