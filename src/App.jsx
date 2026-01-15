import './App.css'
import React, {useEffect, useState} from "react";
import axios from 'axios';
import PokemonCard from "./components/PokemonCard.jsx";
import PokemonLogo from './assets/International_Pokémon_logo.webp';


function App() {

    const [pokemonList, setPokemonList] = useState([]);
    // const [pokemonNameList, setPokemonNameList] = useState([]);
    const [offset, setOffset] = useState(0);
    // const [pokemon, setPokemon] = useState(null);


    useEffect(() => {
        fetchPokemonList();
    }, []);

    const fetchPokemonList = async () => {
        try {
            const listResponse = await axios.get(
                `https://pokeapi.co/api/v2/pokemon?limit=${offset}&offset=0`
            );

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

    // async function fetchPokemon(pokemonName) {
    //     try {
    //         const result = await axios.get('https://pokeapi.co/api/v2/pokemon/jigglypuff');
    //         console.log(result);
    //         setPokemon(result);
    //     } catch (e) {
    //         console.error(e);
    //     }
    // }

    function previousPage(){
        if(offset>20){
            setOffset(offset-20);
        }
    }

    function nextPage(){
        setOffset(offset+20);
    }


    return (
        <>
            <header>
                <img src={PokemonLogo} alt="Pokemon Logo"/>
                {/*<button type="button" onClick={() => fetchPokemon()}>Get data</button>*/}
                <div className="button-container">
                    <button type="button" onClick={()=>previousPage}>Vorige</button>
                    <button type="button" onClick={()=>nextPage}>Volgende</button>
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
