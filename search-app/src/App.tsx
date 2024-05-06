import { useState } from 'react';

import { MorResultsPage } from './components/MoreResultsPage';
import { SearchBox } from './components/SearchBox';

export const App = () => {
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [listActiveIndex, setListActiveIndex] = useState<number>();
  const [moreResultsName, setMoreResultsName] = useState('');

  return (
    <div className="app">
      <p>Search for a Pokémon by name</p>
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
          onChange={e => setName(e.target.value)}
        />
        <SearchBox
          open={open}
          name={name}
          listActiveIndex={listActiveIndex}
          setOpen={setOpen}
          setName={setName}
          setListActiveIndex={setListActiveIndex}
          setMoreResultsName={setMoreResultsName}
        />
      </div>
      {moreResultsName && <MorResultsPage name={moreResultsName} />}
    </div>
  );
};
