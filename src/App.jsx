import './App.css'
import React, {useEffect, useState} from "react";
import axios from 'axios';
import PokemonCard from "./components/PokemonCard.jsx";
import PokemonLogo from './assets/International_Pokémon_logo.webp';


function App() {

    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalPokemonListLength, setTotalPokemonListLength] = useState(0)


    useEffect(() => {
        fetchTotalListLength();
        // setTotalPokemonListLength= await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000').length;
    }, []);

    useEffect(() => {
        fetchPokemonList();
    }, [offset]);

    const fetchTotalListLength = async () => {
        try {
            const totalList = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10000');
            setTotalPokemonListLength(totalList.data.count)
            console.log(totalList.data.count);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    }

    const fetchPokemonList = async () => {
        try {
            const listResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`);

            const detailedPromises = listResponse.data.results.map(pokemon =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            );

            const detailedResponses = await Promise.all(detailedPromises);
            const pokemonData = detailedResponses.map(response => response.data);
            setPokemonList(pokemonData);
            console.log(pokemonData);
        } catch (error) {
            console.error('Error fetching Pokémon:', error);
        }
    };

    function previousPage() {
        if (offset >= 20) {
            setOffset(offset - 20);
        }
        console.log(offset);
    }

    function nextPage() {
        setOffset(offset + 20);
        console.log(offset);
    }

    return (
        <>
            <header>
                <img src={PokemonLogo} alt="Pokemon Logo"/>
                <div className="button-container">
                    <button type="button" onClick={previousPage} disabled={offset < 20}>Vorige</button>
                    <button type="button" onClick={nextPage} disabled={offset >= totalPokemonListLength-20}>Volgende</button>
                </div>
            </header>
            <div className="pokemon-grid">
                {pokemonList.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className="ability-item"
                    >
                        <PokemonCard data={pokemon}/>
                    </li>
                ))}
            </div>
        </>
    )
}

export default App
