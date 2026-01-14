import React from 'react';
import './PokemonCard.css';

function PokemonCard({data}) {
    return (
        <article>
                <h1>{data.name}</h1>
                <img src={data.sprites.front_default} alt={data.name}/>
                <p>Moves: {data.moves.length}</p>
                <p>Weight: {data.weight}</p>
                <div>Abilities:
                    <ul>
                        {data.abilities.map((ability, index) => (
                            <li key={index}>{ability.ability.name}</li>
                        ))}
                    </ul>
                </div>
        </article>
    );
}

export default PokemonCard;