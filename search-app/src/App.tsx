import { useState } from 'react';
import { useOutsideClick } from './hooks/useOutsideClick';

import './App.css';

function App() {
  const [open, setOpen] = useState(false);

  const ref = useOutsideClick(() => {
    setOpen(false);
  });

  const updateValue = (value: string) => {
    // setValue(value);
  };

  return (
    <div className="app">
      <div className="content">
        <input className="baseInput startInput" onClick={() => setOpen(true)} />
        {open && (
          <div ref={ref} className="box">
            <input className="baseInput" onClick={() => setOpen(true)} />
            <ul>
              <li>aa</li>
              <li>bb</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
