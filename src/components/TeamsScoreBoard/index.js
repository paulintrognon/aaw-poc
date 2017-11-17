import React from 'react';
import { connect } from 'react-redux';

import { fetchScoreBoardAction } from '../../actions/scoreBoardActions';

import ScoreBoardTable from './ScoreBoardTable';
import './scoreBoard.css'

function mapStoreToProps(store) {
  return store.scoreBoard;
}
class PlayersScoreBoard extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchScoreBoardAction());
  }

  renderContent = (list) => {
    return <ScoreBoardTable teams={list}></ScoreBoardTable>;
  }

  renderLoading = () => {
    return (
      <p>Chargement...</p>
    );
  }

  render() {
    if (!this.props.fetching && !this.props.list) {
      return null;
    }
    const counts = {
      AT: { name: 'Alliance Terrestre', kills: 0, deaths: 0, diff: 0 },
      GE: { name: 'Grand Empire', kills: 0, deaths: 0, diff: 0 },
    };
    if (this.props.list) {
      this.props.list.forEach(player => {
        counts[player.team].kills += player.kills;
        counts[player.team].deaths += player.deaths;
        counts[player.team].diff += player.kills - player.deaths;
      });
    }
    const teams = [];
    if (counts.AT.diff >= counts.GE.diff) {
      teams.push(counts.AT);
      teams.push(counts.GE);
    } else {
      teams.push(counts.GE);
      teams.push(counts.AT);
    }
    return (
      <div className="score-board-container card-container">
        <h2>Scores</h2>
        {teams.length ? this.renderContent(teams) : this.renderLoading()}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayersScoreBoard);
