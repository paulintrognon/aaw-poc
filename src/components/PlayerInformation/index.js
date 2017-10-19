import React from 'react';
import { connect } from 'react-redux';

import CreatePlayerForm from './CreatePlayerForm';

function mapStoreToProps(store) {
  return store.game.player;
}
class PlayerInformation extends React.Component {

  render() {
    if (!this.props.created) {
      return <CreatePlayerForm></CreatePlayerForm>;
    }
    return (
      <div>
        <h2>
          {this.props.player.name} [{this.props.player.id}]
        </h2>
        <ul>
          <li>
            <b>Health</b>: {this.props.player.health}
          </li>
          <li>
            <b>Coordinates</b>: x={this.props.player.coordinates.x} / y={this.props.player.coordinates.y}
          </li>
        </ul>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
