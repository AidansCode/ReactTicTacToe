import React, { Component } from 'react';
import GamePosition from './gameposition';
import ResetButton from './resetbutton';

class GameBoard extends Component {
  state = {
    positions: [
      { id: 0, text: '', isWinningPosition: false },
      { id: 1, text: '', isWinningPosition: false },
      { id: 2, text: '', isWinningPosition: false },
      { id: 3, text: '', isWinningPosition: false },
      { id: 4, text: '', isWinningPosition: false },
      { id: 5, text: '', isWinningPosition: false },
      { id: 6, text: '', isWinningPosition: false },
      { id: 7, text: '', isWinningPosition: false },
      { id: 8, text: '', isWinningPosition: false }
    ],
    nextMove: 'X',
    gameState: 'IN_PROGRESS',
    displayMessage: ''
  };

  onResetClick = () => {
    let positions = [...this.state.positions];
    positions.forEach(p => {
      p.text = '';
      p.isWinningPosition = false;
    });

    let nextMove = 'X';
    let gameState = 'IN_PROGRESS';
    let displayMessage = '';

    this.setState({
      positions: positions,
      nextMove: nextMove,
      gameState: gameState,
      displayMessage: displayMessage
    });
  };

  onPositionClick = p => {
    if (this.state.gameState === 'IN_PROGRESS' && p.text === '') {
      let positions = [...this.state.positions];
      let index = positions.indexOf(p);
      positions[index] = { ...p };
      positions[index].text = this.state.nextMove;

      let newNextMove = this.getNextMove();

      this.setState(
        { positions: positions, nextMove: newNextMove },
        this.checkGameFinished //callback
      );
    }
  };

  getNextMove() {
    return this.state.nextMove === 'X' ? 'O' : 'X';
  }

  getCurrentMoveText() {
    if (this.state.gameState === 'IN_PROGRESS')
      return 'It is ' + this.state.nextMove + "'s move!";
    else return '';
  }

  checkGameFinished() {
    let { positions } = this.state;

    //Check all rows:
    for (let i = 0; i < 9; i += 3) {
      if (positions[i].text !== '') {
        if (
          positions[i].text === positions[i + 1].text &&
          positions[i].text === positions[i + 2].text
        ) {
          this.endGame(positions[i].text, [i, i + 1, i + 2]);
          return;
        }
      }
    }

    //No winner, check columns
    for (let i = 0; i < 3; i++) {
      if (positions[i].text !== '') {
        if (
          positions[i].text === positions[i + 3].text &&
          positions[i].text === positions[i + 6].text
        ) {
          this.endGame(positions[i].text, [i, i + 3, i + 6]);
          return;
        }
      }
    }

    //No winner, check diagonal down
    if (positions[0].text !== '') {
      if (
        positions[0].text === positions[4].text &&
        positions[0].text === positions[8].text
      ) {
        this.endGame(positions[0].text, [0, 4, 8]);
        return;
      }
    }

    //No winner, check diagonal down
    if (positions[2].text !== '') {
      if (
        positions[2].text === positions[4].text &&
        positions[2].text === positions[6].text
      ) {
        this.endGame(positions[2].text, [2, 4, 6]);
        return;
      }
    }

    //No winner after all positional checks, check if all spots are full
    let foundOpenSpot = false;
    for (let i = 0; i < 9; i++) {
      if (positions[i].text === '') {
        foundOpenSpot = true;
        break;
      }
    }

    if (!foundOpenSpot) {
      this.endGame('', []);
    }
  }

  endGame(winner, indexes) {
    let gameState = '';
    let displayMessage = '';
    let positions = [...this.state.positions];

    if (winner === '') {
      gameState = 'OVER_NO_WINNER';
      displayMessage = 'Tie! Nobody wins';
    } else {
      gameState = 'OVER_WINNER';
      displayMessage = winner + ' wins!';
    }

    indexes.forEach(i => {
      positions[i].isWinningPosition = true;
    });
    this.setState({
      gameState: gameState,
      displayMessage: displayMessage,
      positions: positions
    });
  }

  render() {
    return (
      <div>
        <ResetButton handleClick={this.onResetClick} />
        <h1 className='text-center'>{this.state.displayMessage}</h1>
        <div className='d-flex justify-content-center'>
          <div className='row w-33'>
            {this.state.positions.map(p => {
              return (
                <GamePosition
                  key={p.id}
                  position={p}
                  handleClick={this.onPositionClick}
                >
                  {p.text}
                </GamePosition>
              );
            })}
          </div>
        </div>
        <h4 className='text-center mt-3'>{this.getCurrentMoveText()}</h4>
      </div>
    );
  }
}

export default GameBoard;
