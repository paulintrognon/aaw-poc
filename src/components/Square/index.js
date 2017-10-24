import React from 'react';
import { connect } from 'react-redux';

import { moveOwnPlayerAction } from '../../actions/gameActions';

import './square.css';
import soldierImg from './soldier.gif';

class Square extends React.Component {

  handleOnClick = () => {
    if (this.props.square.isWalkable) {
      this.props.dispatch(moveOwnPlayerAction(this.props.square.coordinates));
    }
    if (this.props.square.player) {
      this.props.dispatch({type: 'TOGGLE_PLAYER_INFORMATION_BOX', payload: { playerId: this.props.square.player.id }});
    }
  }

  render() {
    const square = this.props.square;
    const classes = [
      'board-square',
      square.terrain.type,
    ];
    if (square.isWalkable) {
      classes.push('can-walk');
    }
    if (square.player) {
      classes.push('has-player');
      if (square.player.isInRange) {
        classes.push('player-in-range');
      }
    }
    return (
      <div className={classes.join(' ')} onClick={this.handleOnClick} title={square.isWalkable ? 'Click to move' : ''}>
        {square.player ? renderPlayer(square.player, this.props.displayPlayerInformation) : ''}
      </div>
    );
  }
}
export default connect()(Square);

function renderPlayer(player, displayPlayerInformation) {
  return (
    <div className="player" title={player.name}>
      <p className="player-image-container">
        <img src={soldierImg} alt={player.name} />
      </p>
      <p className="player-title-container">
        {player.name}
      </p>
      {displayPlayerInformation ? renderPlayerInformationBox(player) : ''}
    </div>
  );
}

function renderPlayerInformationBox(player) {
  return (
    <div className="player-information-popup">
      <p>
        {player.name}
      </p>
      <p>
        x{player.coordinates.x} / y{player.coordinates.y}
      </p>
      <p>
        <button disabled={!player.isInRange}>Attaquer</button>
      </p>
    </div>
  );
}
