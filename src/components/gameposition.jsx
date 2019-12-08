import React, { Component } from 'react';

class GamePosition extends Component {
  getTextClasses() {
    let classes = 'text-center text-';
    switch (this.props.children) {
      case 'X':
        classes += 'primary';
        break;
      case 'O':
        classes += 'danger';
        break;
      default:
        break;
    }

    return classes;
  }

  getBoxClasses() {
    let classes = 'text-center col-4 border';

    if (this.props.position.isWinningPosition === true) {
      classes += ' bg-warning';
    }

    return classes;
  }

  getTextDisplay() {
    if (this.props.children === '') return <span>&nbsp;</span>;
    return this.props.children;
  }

  render() {
    return (
      <div
        className={this.getBoxClasses()}
        onClick={() => this.props.handleClick(this.props.position)}
      >
        <h1 className={this.getTextClasses()}>{this.getTextDisplay()}</h1>
      </div>
    );
  }
}

export default GamePosition;
