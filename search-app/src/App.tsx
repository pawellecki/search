import { useRef, useState, useEffect } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick';
import { useGetBeersByName } from './hooks/useGetBeersByName';
import { BeersList } from './components/BeersList';

export const App = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const outsideClickRef = useOutsideClick(() => {
    setOpen(false);
  });
  const { data = [], isLoading } = useGetBeersByName(name);

  const updateName = (query: string) => {
    setName(query);
  };

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  return (
    <div className="app">
      <div className="content">
        <input className="baseInput startInput" onClick={() => setOpen(true)} />
        {open && (
          <div ref={outsideClickRef} className="box">
            <input
              ref={inputRef}
              className="baseInput"
              onChange={(e) => updateName(e.target.value)}
            />
            <BeersList beers={data} />
          </div>
        )}
      </div>
    </div>
  );
};
