import React from 'react';
import { connect } from 'react-redux';

import './square.css';

class Square extends React.Component {
  render() {
    const square = this.props.square;
    if (!square) {
      return <div className="board-square void"></div>;
    }
    return (
      <div className={'board-square ' + square.terrain.type}>
        {square.player ? square.player.name : ''}
      </div>
    );
  }
}
export default connect()(Square);
