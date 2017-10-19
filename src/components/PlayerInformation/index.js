import React from 'react';
import { connect } from 'react-redux';
import { createNewPlayerAction } from '../../actions/gameActions';

function mapStoreToProps(store) {
  return store.game.player;
}

class PlayerInformation extends React.Component {

  createPlayerHandler = () => {
    this.props.dispatch(createNewPlayerAction('Joe'));
  }

  render() {
    if (!this.props.created) {
      return (
        <button onClick={this.createPlayerHandler}>
          Start!
        </button>
      );
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
