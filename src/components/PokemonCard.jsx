import React from 'react';

function PokemonCard({ pokemon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-semibold mb-2 capitalize">{pokemon.name}</h2>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="mx-auto w-40 h-40 mb-4"
      />
      <p className="text-gray-700">ID: {pokemon.id}</p>
      <p className="text-gray-700">Height: {pokemon.height}</p>
      <p className="text-gray-700">Weight: {pokemon.weight}</p>
    </div>
  );
}

export default PokemonCard;