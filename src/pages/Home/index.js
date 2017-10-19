import React from 'react';

import PlayerInformation from '../../components/PlayerInformation';
import Board from '../../components/Board';

class Home extends React.Component {
  render() {
    return (
      <div>
        <PlayerInformation></PlayerInformation>
        <Board></Board>
      </div>
    );
  }
}

export default Home;
