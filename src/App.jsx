import './App.css'
import React, {useEffect, useState} from "react";
import axios from 'axios';
import PokemonCard from "./components/PokemonCard.jsx";
import PokemonLogo from './assets/International_Pokémon_logo.webp';


function App() {

    const [pokemonList, setPokemonList] = useState([]);
    const [offset, setOffset] = useState(0);
    const [totalPokemonListLength, setTotalPokemonListLength] = useState(0)
    const [loading, toggleLoading] = useState(false);


    useEffect(() => {
        const controller = new AbortController();

        fetchTotalListLength(controller.signal).catch(error => {
            console.error('Failed to fetch total length:', error);
        });

        return ()=> controller.abort();
    }, []);

    useEffect(() => {
        const controller = new AbortController();

        fetchPokemonList(controller.signal);

        return ()=> controller.abort();
    }, [offset]);

    const fetchTotalListLength = async (signal) => {
        toggleLoading(true);
        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const totalList = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=1', {signal});
            setTotalPokemonListLength(totalList.data.count)
            console.log(totalList.data.count);
        } catch (error) {
            if (error.code === 'ERR_CANCELED') {
                console.log('Previous request cancelled.');
            } else{
                console.error('Error fetching Pokémon:', error);
            }
        } finally {
            toggleLoading(false);
        }
    }

    const fetchPokemonList = async (signal) => {
        toggleLoading(true);
        try {
            // await new Promise(resolve => setTimeout(resolve, 2000));
            const listResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`, {signal});

            const detailedPromises = listResponse.data.results.map(pokemon =>
                axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            );

            const detailedResponses = await Promise.all(detailedPromises);
            const pokemonData = detailedResponses.map(response => response.data);
            setPokemonList(pokemonData);
            console.log(pokemonData);
        } catch (error) {
            if (error.code === 'ERR_CANCELED') {
                console.log('Previous request cancelled.');
            } else{
                console.error('Error fetching Pokémon:', error);
            }
        } finally {
            toggleLoading(false);
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
            {loading ?
                <p className="loading-msg">Loading</p>
                :
                <div className="pokemon-grid">
                {pokemonList.map((pokemon) => (
                    <li
                        key={pokemon.id}
                        className="ability-item"
                    >
                        <PokemonCard data={pokemon}/>
                    </li>
                ))}
            </div>}
        </>
    )
}

export default App
