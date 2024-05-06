import { useRef, useState, useEffect } from 'react';

import { useOutsideClick } from '../hooks/useOutsideClick';
import { useGetPokemonsByName } from '../hooks/useGetPokemonsByName';
import { Pokemon } from '../types';
import { Pagination } from './Pagination';
import iconSearch from '../iconSearch.svg';

const perPage = 10;

type SearchBoxProps = {
  open: boolean;
  name: string;
  setOpen: (value: boolean) => void;
  setName: (name: string) => void;
  setListActiveIndex: (index?: number) => void;
  setMoreResultsName: (name: string) => void;
  listActiveIndex?: number;
};

export const SearchBox = ({
  open,
  name,
  setName,
  setOpen,
  setMoreResultsName,
  setListActiveIndex,
  listActiveIndex,
}: SearchBoxProps) => {
  const [page, setPage] = useState(1);
  const [visited, setVisited] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const outsideClickRef = useOutsideClick(() => {
    setOpen(false);
  });
  const { data, status } = useGetPokemonsByName(name, page, perPage);

  const updateName = (query: string) => {
    setName(query);
    setPage(1);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onInputKeyDown = (key: string) => {
    setMoreResultsName('');

    if (!name) return;

    if (key === 'ArrowDown') {
      const noActiveIndex = listActiveIndex === undefined;

      if (noActiveIndex) {
        setListActiveIndex(0);

        return document.getElementById('0')?.focus();
      }
    }

    if (key === 'Enter' && data?.data.length) {
      const moreResultsName = data.data[0].name;
      setVisited(prev => [...prev, moreResultsName]);
      setMoreResultsName(moreResultsName);
      setOpen(false);
    }
  };

  const onLiButtonKeyDown = (key: string, index: number, name: string) => {
    if (key === 'Enter') {
      setName(name);
      setMoreResultsName(name);
      setVisited(prev => [...prev, name]);
      setOpen(false);
    }

    if (key === 'ArrowUp') {
      if (listActiveIndex === 0) {
        setListActiveIndex(undefined);
        return inputRef.current?.focus();
      }

      setListActiveIndex(listActiveIndex! - 1);
      return document.getElementById((listActiveIndex! - 1).toString())?.focus();
    }

    if (key === 'ArrowDown') {
      const isActiveLastIndex = listActiveIndex! + 1 === data?.data.length;
      if (isActiveLastIndex) return;

      setListActiveIndex(listActiveIndex! + 1);
      return document.getElementById((index + 1).toString())?.focus();
    }
  };

  const checkWasVisited = (name: string) => visited.includes(name);
  const isEmptyData = data && !data.data.length;

  return (
    <div>
      {open && name && (
        <div ref={outsideClickRef} className="box">
          <input
            ref={inputRef}
            className="baseInput"
            value={name}
            onChange={e => updateName(e.target.value)}
            onKeyDown={e => onInputKeyDown(e.key)}
          />
          {isEmptyData && <p className="emptData">no Pokémon found</p>}
          <ul>
            {data?.data.map((pokemon: Pokemon, index: number) => (
              <li className={listActiveIndex === index ? 'active' : ''} key={pokemon.name}>
                <img className="iconSearch" src={iconSearch} alt="iconSearch" />
                <button
                  className={`buttonResult ${checkWasVisited(pokemon.name) ? 'purple' : ''}`}
                  id={index.toString()}
                  onClick={() => {
                    setName(pokemon.name);
                    setMoreResultsName(pokemon.name);
                    setVisited(prev => [...prev, pokemon.name]);
                    setOpen(false);
                  }}
                  onKeyDown={e => onLiButtonKeyDown(e.key, index, pokemon.name)}
                >
                  {pokemon.name}
                </button>
                {checkWasVisited(pokemon.name) && (
                  <button
                    className="buttonRemoveResult"
                    onClick={() => setVisited(prev => prev.filter(name => name !== pokemon.name))}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))}
          </ul>
          <Pagination
            isLoading={status === 'loading'}
            page={page}
            totalPages={data?.totalPages}
            setPage={index => {
              setPage(index);
              inputRef.current?.focus();
              setListActiveIndex(undefined);
            }}
          />
        </div>
      )}
    </div>
  );
};
