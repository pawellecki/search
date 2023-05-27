import { FC } from 'react';
import { Pokemon } from '../types';

type Props = {
  pokemons: Pokemon[];
};

export const PokemonsList: FC<Props> = ({ pokemons }) => {
  return (
    <ul>
      {pokemons.map((pokemon: Pokemon) => (
        <li key={pokemon.name}>{pokemon.name}</li>
      ))}
    </ul>
  );
};
