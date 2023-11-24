import React, { useMemo } from 'react';

export interface Pokemon {
    id: string
    image: string
    name: string; types: string | string[];
    pokemon_v2_pokemonsprites: { sprites: string }[]
    pokemon_v2_pokemontypes: { pokemon_v2_type: {name: string} }[]
    pokemon_v2_pokemonabilities: { pokemon_v2_ability: {name: string} }[]
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
    const image = useMemo(() => {
        const ser = JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites)
        return ser['front_default']
    },[])
  return (
    <div className="border rounded p-4 shadow w-full" > 
      <img src={image} alt={pokemon.name} className="w-full" />
      <h3 className="text-xl font-bold">{pokemon.name}</h3>
      <p>Types: {pokemon.pokemon_v2_pokemontypes.map(type => type.pokemon_v2_type.name).join(', ')}</p>
      <p>Abilities: {pokemon.pokemon_v2_pokemonabilities.map(ability => ability.pokemon_v2_ability.name).join(', ')}</p>
    </div>
  );
};

export default PokemonCard;
