import React from 'react';

function ResetButton(props) {
  return (
    <button onClick={props.handleClick} className='btn btn-success btn-lg my-3'>
      RESET GAME
    </button>
  );
}

export default ResetButton;
