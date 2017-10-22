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
  }

  render() {
    const square = this.props.square;
    const classes = [
      'board-square',
      square.terrain.type,
    ];
    if (square.isWalkable) {
      classes.push('walkable');
    }
    return (
      <div className={classes.join(' ')} onClick={this.handleOnClick}>
        {square.player ? renderPlayer(square.player) : ''}
      </div>
    );
  }
}
export default connect()(Square);

function renderPlayer(player) {
  return (
    <div className="player">
      <p className="player-image-container">
        <img src={soldierImg} alt={player.name} title={player.name} />
      </p>
      <p className="player-title-container">
        <span className="player-title">
          {player.name}
        </span>
      </p>
    </div>
  );
}
