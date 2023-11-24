import React from 'react';
import client from './client';
import './App.css';
import PokemonList from './PokemonList';
import { ApolloProvider } from '@apollo/client';

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <PokemonList />
      </ApolloProvider>
    </div>
  );
}

export default App;
