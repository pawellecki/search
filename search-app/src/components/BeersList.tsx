import { FC } from 'react';
import { Beer } from '../types';

type Props = {
  beers: Beer[];
};

export const BeersList: FC<Props> = ({ beers }) => {
  return (
    <ul>
      {beers.map((beer: Beer) => (
        <li>{beer.name}</li>
      ))}
    </ul>
  );
};
