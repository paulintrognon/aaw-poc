import React from 'react';
import { connect } from 'react-redux';

import './square.css';
import soldierImg from './soldier.gif';

class Square extends React.Component {
  render() {
    const square = this.props.square;
    if (!square) {
      return <div className="board-square void"></div>;
    }
    return (
      <div className={'board-square ' + square.terrain.type}>
        {square.player ? <img src={soldierImg} /> : ''}
      </div>
    );
  }
}
export default connect()(Square);
