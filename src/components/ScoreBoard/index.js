import React from 'react';
import { connect } from 'react-redux';

import { fetchScoreBoardAction } from '../../actions/scoreBoardActions';

import './scoreBoard.css'

function mapStoreToProps(store) {
  return store.scoreBoard;
}
class ScoreBoard extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchScoreBoardAction());
  }

  renderContent = (list) => {
    return <table className="score-board-table table">
      <thead>
      <tr>
        <th>
          Nom
        </th>
        <th>
          Tués
        </th>
        <th>
          Morts
        </th>
      </tr>
      </thead>
      <tbody>
      {list.map((player, i) => (
        <tr key={i}>
          <td>
            {player.name}
          </td>
          <td>
            {player.kills}
          </td>
          <td>
            {player.deaths}
          </td>
        </tr>
      ))}
      </tbody>
    </table>;
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
export default connect(mapStoreToProps)(ScoreBoard);
