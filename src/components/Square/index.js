import React from 'react';
import { connect } from 'react-redux';

import { moveOwnPlayerAction } from '../../actions/gameActions';

import './square.css';
import soldierStillImg from './soldier_still.png';
import soldierAttackingImg from './soldier_attacking.gif';

class Square extends React.Component {
  attackPlayer = () => {
    this.props.attackHandler(this.props.square.player);
  }

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
    if (this.props.canWalk && square.isWalkable) {
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
        {square.player ? this.renderPlayer(square.player) : ''}
      </div>
    );
  }

  renderPlayer = (player) => {
    const isAttacking = player.animation === 'attacking';

    const soldierImg = isAttacking ? soldierAttackingImg : soldierStillImg;
    return (
      <div className="player" title={player.name}>
        <p className="player-image-container">
          <img src={soldierImg} alt={player.name} />
        </p>
        <p className="player-title-container">
          {player.name}
        </p>
        {player.takingDamages === undefined ? '' : (
          <p className="player-damages">
            - {player.takingDamages}
          </p>
        )}
        {this.props.displayPlayerInformation ? this.renderPlayerInformationBox(player) : ''}
      </div>
    );
  }

  renderPlayerInformationBox = (player) => {
    return (
      <div className="player-information-popup">
        <p>
          {player.name}
        </p>
        <p>
          x{player.coordinates.x} / y{player.coordinates.y}
        </p>
        {this.props.ownPlayerId === player.id ? null : (
          <p>
            <button disabled={!this.props.canAttack} onClick={this.attackPlayer}>
              Attaquer
            </button>
          </p>
        )}
      </div>
    );
  }

}
export default connect()(Square);
