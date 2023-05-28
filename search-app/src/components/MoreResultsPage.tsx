import { FC } from 'react';
import { allPokemonsObject } from '../pokemon';

type Props = {
  name: string;
};

export const MorResultsPage: FC<Props> = ({ name }) => {
  const searchResult = allPokemonsObject[name].searchResult;

  return (
    <div>
      <p className="searchMeta">
        About {searchResult.length} results ({Math.floor(Math.random() * 100) / 100} seconds)
      </p>
      <ul className="searchResults">
        {searchResult.map((result) => (
          <li key={result.title}>
            <a href={result.link}>{result.title}</a>
            <p>{result.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
