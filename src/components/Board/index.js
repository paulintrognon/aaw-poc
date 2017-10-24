import React from 'react';
import { connect } from 'react-redux';

import Square from '../Square';
import './board.css';

function mapStoreToProps(store) {
  return store.game.board;
}
class PlayerInformation extends React.Component {
  shouldDisplayPlayerInformation = (player) => {
    if (!player) {
      return false;
    }
    if (player.id !== this.props.playerInformationBox.playerId) {
      return false;
    }
    return this.props.playerInformationBox.show;
  }

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
              {row.map((square, y) => {
                return (
                  <Square
                    key={`${x}/${y}`}
                    square={square}
                    displayPlayerInformation={this.shouldDisplayPlayerInformation(square.player)}
                    >
                  </Square>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
