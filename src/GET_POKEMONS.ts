import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query getPokemons($limit: Int, $offset: Int) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMONS_BY_TYPE = gql`
  query getPokemons($limit: Int, $offset: Int, $filter: String) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {
      pokemon_v2_pokemontypes: { pokemon_v2_type: { name: { _like: $filter } } }
    }
    ) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMONS_BY_ABILITY = gql`
  query getPokemons($limit: Int, $offset: Int, $filter: String) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {
      pokemon_v2_pokemonabilities: { pokemon_v2_ability: { name: { _like: $filter } } }
    }
    ) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const GET_POKEMONS_BY_NAME = gql`
  query getPokemons($limit: Int, $offset: Int, $filter: String) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset, where: {
      name: { _like: $filter }
    }) {
      id
      name
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;
