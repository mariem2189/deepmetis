import React, {useMemo, useState } from 'react';
import PokemonCard, { Pokemon } from './PokemonCard';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS, GET_POKEMONS_BY_ABILITY, GET_POKEMONS_BY_NAME, GET_POKEMONS_BY_TYPE } from './GET_POKEMONS';

const itemsPerPage = 20; // Adjust as needed

const PokemonList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const query: {
    limit: number,
    offset: number,
    query?: string,
  } = useMemo(() => ({
    offset: (currentPage - 1) * itemsPerPage,
    limit: itemsPerPage,
    filter: filter ? (`%${searchTerm}%` || '') : undefined,
  }), [filter, searchTerm, currentPage])
  const QuerySelector = useMemo(() => {
    return filter === 'type' ? GET_POKEMONS_BY_TYPE :
      filter === 'ability' ? GET_POKEMONS_BY_ABILITY :
      filter === 'name' ? GET_POKEMONS_BY_NAME : GET_POKEMONS
  }, [filter])
  const { loading, error, data } = useQuery(QuerySelector, {
    variables: query,
  });

  
  
  // Function to handle search input change
  const handleSearchChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1)
  };
  
  // Function to handle filter change
  const handleFilterChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm('')
    setFilter(e.target.value)
  };

  const goToNextPage = () => {
    setCurrentPage(current => current + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(current => Math.max(1, current - 1));
  };
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="p-2 border border-gray-300 rounded"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select
          className="p-2 border border-gray-300 rounded"
          value={filter}
          onChange={handleFilterChange}
        >
          <option value="">Filter by Type/Ability</option>
          <option value="type">Type</option>
          <option value="ability">Ability</option>
          <option value="name">Name</option>
        </select>
      </div>

      {
        loading && (<p>Loading...</p>)
      }
      {
        error && (<p>Error : {error.message}</p>)
      }
      {
        (data &&
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data['pokemon_v2_pokemon'].map((pokemon: Pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              Previous
          </button>
            <button onClick={goToNextPage} disabled={data.pokemon_v2_pokemon.length < (itemsPerPage - 1)}>
              Next
          </button>
          </>
        )

      }

    </div>
  );
};

export default PokemonList;
