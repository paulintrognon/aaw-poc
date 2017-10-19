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
      <h2>
        {this.props.player.name}
        [{this.props.player.id}]
      </h2>
    );
  }
}
export default connect(mapStoreToProps)(PlayerInformation);
