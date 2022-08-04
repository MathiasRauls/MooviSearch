import { getMouseEventOptions } from "@testing-library/user-event/dist/utils";
import React from "react";
import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import './App.css'
import logo from './moovi.png'
import SearchIcon from './search.svg'

// API Key
//  ecc9ce68
const API_URL = 'https://www.omdbapi.com?apikey=ecc9ce68';

const movie = {
    "Title": "The Amazing Spiderman T4 Premiere Special",
    "Year": "2012",
    "imdbID": "tt2233044",
    "Type": "movie",
    "Poster": "N/A"
}

const App = () => {
    const [movies, setMovies] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies(searchTerm);
    }, []);

    return (
        <div className="app">
            <img src={logo} alt="Moovi Logo" className="logo"></img>
            <h1>Moovi</h1>

            <div className="search">
                <input
                    placeholder="Search for movies.."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt="Search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div classNmae="empty">
                        <h2>No Movies Found</h2>
                    </div>
                )
            }


        </div>
    );
}

export default App;