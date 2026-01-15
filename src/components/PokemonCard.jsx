import React from 'react';
import './PokemonCard.css';

function PokemonCard({data}) {
    return (
        <article className="pokemon-card">
                <h1>{data.name}</h1>
                <img
                    src={data.sprites.front_default}
                    alt={data.name}
                />
            <div className="pokemon-stats">
                <div className="stat-item">
                    <span className="stat-label">Moves</span>
                    <span className="stat-value">{data.moves.length}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Weight</span>
                    <span className="stat-value">{data.weight}</span>
                </div>
            </div>

            <div className="pokemon-abilities">
                <h3 className="abilities-title">Abilities</h3>
                <ul className="abilities-list">
                    {data.abilities.map((ability, index) => (
                        <li
                            key={index}
                            className="ability-item"
                        >
                            {ability.ability.name}
                        </li>
                    ))}
                </ul>
            </div>
        </article>
    );
}

export default PokemonCard;