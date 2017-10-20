import React from 'react';
import { connect } from 'react-redux';

import Square from '../Square';
import './board.css';

function mapStoreToProps(store) {
  return store.game.board;
}
class PlayerInformation extends React.Component {

  render() {
    if (!this.props.fetched) {
      return null;
    }
    return (
      <div>
        <h2>Board</h2>
        <div className="board-container">
          {this.props.board.map((row, x) => (
            <div key={x}>
              {row.map((square, y) => <Square key={`${x}/${y}`} square={square} ></Square>)}
            </div>
          ))}
        </div>

      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
