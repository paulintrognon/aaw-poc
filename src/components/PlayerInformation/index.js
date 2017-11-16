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
      <div className="player-information-container card-container">
        <h2>{this.props.player.name} ({this.props.player.id})</h2>
        <div className="player-information">
          <ul>
            <li>
              PV: {this.props.player.health}
            </li>
            <li>
              PA: {this.props.player.actionPoints}
            </li>
            <li>
              Coordonnées: x={this.props.player.coordinates.x} / y={this.props.player.coordinates.y}
            </li>
            <li>
              Tués: {this.props.player.kills}
            </li>
            <li>
              Morts: {this.props.player.deaths}
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
