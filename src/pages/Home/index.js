import React from 'react';

import PlayerInformation from '../../components/PlayerInformation';
import Board from '../../components/Board';
import TeamsScoreBoard from '../../components/TeamsScoreBoard';
import PlayersScoreBoard from '../../components/PlayersScoreBoard';

class Home extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-4 col-12">
          <PlayerInformation></PlayerInformation>
          <div className="d-none d-lg-block">
            <TeamsScoreBoard></TeamsScoreBoard>
            <PlayersScoreBoard></PlayersScoreBoard>
          </div>
        </div>
        <div className="col-lg-8 col-12">
          <Board></Board>
        </div>
      </div>
    );
  }
}

export default Home;
