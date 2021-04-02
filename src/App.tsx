import { useEffect, useState } from 'react';
import './App.css';
import AllImages from './AllImages';

function App() {
  const [windowSize, setWindowSize] = useState({ h: 0, w: 0 });

  const updateWindowSize = () => {
    setWindowSize({ h: window.innerHeight, w: window.innerWidth });
  };

  useEffect(() => {
    setWindowSize({ h: window.innerHeight, w: window.innerWidth });

    window.addEventListener('resize', updateWindowSize);
    return () => window.removeEventListener('resize', updateWindowSize);
  }, []);

  return (
    <div className='App'>
      <AllImages windowHeight={windowSize.h} windowWidth={windowSize.w} />
    </div>
  );
}

export default App;
