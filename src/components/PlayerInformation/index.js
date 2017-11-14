import React from 'react';
import { connect } from 'react-redux';
import { loadExistingPlayer } from '../../actions/gameActions';

import { getCookie } from '../../services/cookies';

import CreatePlayerForm from './CreatePlayerForm';

import './playerInformation.css'

function mapStoreToProps(store) {
  return store.player;
}
class PlayerInformation extends React.Component {
  componentWillMount() {
    const token = getCookie('aaw_token');
    if (token) {
      this.props.dispatch(loadExistingPlayer());
    }
  }

  render() {
    if (!this.props.fetched) {
      return <CreatePlayerForm></CreatePlayerForm>;
    }
    return (
      <div className="player-information-container">
        <h2>{this.props.player.name} ({this.props.player.id})</h2>
        <div className="player-information">
          <ul>
            <li>
              <b>PV</b>: {this.props.player.health}
            </li>
            <li>
              <b>Coordonnées</b>: x={this.props.player.coordinates.x} / y={this.props.player.coordinates.y}
            </li>
            <li>
              <b>Tués</b>: {this.props.player.kills}
            </li>
            <li>
              <b>Morts</b>: {this.props.player.deaths}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
