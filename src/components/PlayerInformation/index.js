import React from 'react';
import { connect } from 'react-redux';

import CreatePlayerForm from './CreatePlayerForm';

import './playerInformation.css'

function mapStoreToProps(store) {
  return store.game.player;
}
class PlayerInformation extends React.Component {

  render() {
    if (!this.props.created) {
      return <CreatePlayerForm></CreatePlayerForm>;
    }
    return (
      <div className="player-information-container">
        <h2>Player's Data</h2>
        <div className="player-information">
          <h3 className="player-title">
            {this.props.player.name} <span className="player-id">[{this.props.player.id}]</span>
          </h3>
          <ul>
            <li>
              <b>Health</b>: {this.props.player.health}
            </li>
            <li>
              <b>Coordinates</b>: x={this.props.player.coordinates.x} / y={this.props.player.coordinates.y}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
