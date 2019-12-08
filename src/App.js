import React, { Component } from 'react';
import Navbar from './components/navbar';
import GameBoard from './components/gameboard';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div className='container'>
          <GameBoard />
        </div>
      </React.Fragment>
    );
  }
}

export default App;
