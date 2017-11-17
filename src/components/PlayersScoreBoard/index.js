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
    return <ScoreBoardTable players={list}></ScoreBoardTable>;
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
    return (
      <div className="score-board-container card-container">
        <h2>Scores</h2>
        {this.props.list ? this.renderContent(this.props.list) : this.renderLoading()}
      </div>
    );
  }
}
export default connect(mapStoreToProps)(PlayersScoreBoard);
