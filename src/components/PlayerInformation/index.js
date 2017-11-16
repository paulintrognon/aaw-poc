import React from 'react';
import Moment from 'react-moment';
import moment from 'moment';
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
        <h2 className="player-name">{this.props.player.name}</h2>
        <div className="row">
          <div className="col-6">
            <p title="Points de Vie. Vous mourrez si vos PVs tombent à zéro.">
              PV : {this.props.player.health} / 100
            </p>
          </div>
          <div className="col-6">
            <p title="Points d'Actions. Permettent de se déplacer.">
              PA: {this.props.player.actionPoints} / 20
            </p>
          </div>
          <div className="col-12">
            <p title={moment(this.props.player.nextTurnDate).format('dddd, Do MMMM YYYY, H:mm:ss')}>
              Prochain tour : <Moment fromNow interval={100}>{this.props.player.nextTurnDate}</Moment>
            </p>
            <p>
              {this.props.player.kills} enemis tué(s) / Mort {this.props.player.deaths} fois
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
