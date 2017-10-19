import React from 'react';

import PlayerInformation from '../../components/PlayerInformation';
import Board from '../../components/Board';

class Home extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-6 col-12">
          <PlayerInformation></PlayerInformation>
        </div>
        <div className="col-lg-6 col-12">
          <Board></Board>
        </div>
      </div>
    );
  }
}

export default Home;
