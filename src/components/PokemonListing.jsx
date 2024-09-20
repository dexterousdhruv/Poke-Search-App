import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';

function PokemonListing
() {
  const [pokemonData, setPokemonData] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
        const pokemonResults = response.data.results;

        const pokemonDetails = await Promise.all(
          pokemonResults.map(async (pokemon) => {
            const pokeResponse = await axios.get(pokemon.url);
            return pokeResponse.data;
          })
        );

        setPokemonData(pokemonDetails);
        setFilteredPokemon(pokemonDetails);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchPokemon();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchQuery = e.target.value.toLowerCase();
    const filtered = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery)
    );
    setFilteredPokemon(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
        className="px-4 py-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}

export default PokemonListing
;