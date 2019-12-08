import React from 'react';
import Navbar from './components/navbar';
import GameBoard from './components/gameboard';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <div className='container'>
        <GameBoard />
      </div>
    </React.Fragment>
  );
}

export default App;
