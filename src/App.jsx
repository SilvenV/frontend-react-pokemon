import './App.css'
import {useState} from "react";
import axios from 'axios';
import PokemonCard from "./components/PokemonCard.jsx";


function App() {

    const [pokemon, setPokemon] = useState(null);

    async function fetchData() {
        try {
            const result = await axios.get('https://pokeapi.co/api/v2/pokemon/flygon');
            console.log(result);
            setPokemon(result);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <button type="button" onClick={() => fetchData()}>Get data</button>
            {pokemon &&
                <PokemonCard data={pokemon.data}/>
            }
            <h1>Gotta catch em all!</h1>
        </>
    )
}

export default App
