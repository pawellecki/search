import { useRef, useState, useEffect } from 'react';

import { Pokemon } from './types';

import { useOutsideClick } from './hooks/useOutsideClick';
import { useGetPokemonsByName } from './hooks/useGetPokemonsByName';
import { Pagination } from './components/Pagination';
import { MorResultsPage } from './components/MoreResultsPage';

import iconSearch from './iconSearch.svg';
const perPage = 10;

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [listActiveIndex, setListActiveIndex] = useState<number>();
  const [visited, setVisited] = useState<string[]>([]);
  const [moreResultsName, setMoreResultsName] = useState<string>();

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
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const onInputKeyDown = (key: string) => {
    setMoreResultsName(undefined);

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
      setVisited((prev) => [...prev, moreResultsName]);
      setMoreResultsName(moreResultsName);
      setOpen(false);
    }
  };

  const onLiButtonKeyDown = (key: string, index: number, name: string) => {
    if (key === 'Enter') {
      setMoreResultsName(name);
      setVisited((prev) => [...prev, name]);
      setOpen(false);
    }

    if (key === 'ArrowUp') {
      if (listActiveIndex === 0) {
        setListActiveIndex(undefined);
        return inputRef.current?.focus();
      }

      setListActiveIndex((prev) => prev! - 1);
      return document.getElementById((listActiveIndex! - 1).toString())?.focus();
    }

    if (key === 'ArrowDown') {
      const isActiveLastIndex = listActiveIndex! + 1 === data?.data.length;
      if (isActiveLastIndex) return;

      setListActiveIndex((prev) => prev! + 1);
      return document.getElementById((index + 1).toString())?.focus();
    }
  };

  const checkWasVisited = (name: string) => visited.includes(name);

  return (
    <div className="app">
      <div className="content">
        <input
          className="baseInput startInput"
          value={name}
          onClick={() => {
            setOpen(true);

            if (listActiveIndex) {
              setTimeout(() => {
                document.getElementById(listActiveIndex.toString())?.focus();
              }, 100);
            }
          }}
          onChange={() => {}}
        />
        {open && (
          <div ref={outsideClickRef} className="box">
            <input
              ref={inputRef}
              className="baseInput"
              value={name}
              onChange={(e) => updateName(e.target.value)}
              onKeyDown={(e) => onInputKeyDown(e.key)}
            />
            <ul>
              {name &&
                data?.data.map((pokemon: Pokemon, index: number) => (
                  <li className={listActiveIndex === index ? 'active' : ''} key={pokemon.name}>
                    <img className="iconSearch" src={iconSearch} alt="iconSearch" />
                    <button
                      className={`buttonResult ${checkWasVisited(pokemon.name) ? 'purple' : ''}`}
                      id={index.toString()}
                      onClick={() => {
                        setMoreResultsName(pokemon.name);
                        setVisited((prev) => [...prev, pokemon.name]);
                        setOpen(false);
                      }}
                      onKeyDown={(e) => onLiButtonKeyDown(e.key, index, pokemon.name)}
                    >
                      {pokemon.name}
                    </button>
                    {checkWasVisited(pokemon.name) && (
                      <button
                        className="buttonRemoveResult"
                        onClick={() =>
                          setVisited((prev) => prev.filter((name) => name !== pokemon.name))
                        }
                      >
                        Remove
                      </button>
                    )}
                  </li>
                ))}
            </ul>
            {name && (
              <Pagination
                isLoading={status === 'loading'}
                page={page}
                totalPages={data?.totalPages}
                setPage={(index) => {
                  setPage(index);
                  inputRef.current?.focus();
                  setListActiveIndex(undefined);
                }}
              />
            )}
          </div>
        )}
      </div>
      {moreResultsName && <MorResultsPage name={moreResultsName} />}
    </div>
  );
};
