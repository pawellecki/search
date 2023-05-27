import { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick';
import { useGetPokemonsByName } from './hooks/useGetPokemonsByName';
import { PokemonsList } from './components/PokemonsList';
import { Pagination } from './components/Pagination';

const perPage = 10;

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);

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

  return (
    <div className="app">
      <div className="content">
        <input className="baseInput startInput" value={name} onClick={() => setOpen(true)} />
        {open && (
          <div ref={outsideClickRef} className="box">
            <input
              ref={inputRef}
              className="baseInput"
              value={name}
              onChange={(e) => updateName(e.target.value)}
            />
            <PokemonsList pokemons={(name && data?.data) || []} />
            {name && (
              <Pagination
                isLoading={status === 'loading'}
                page={page}
                totalPages={data?.totalPages}
                setPage={setPage}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
