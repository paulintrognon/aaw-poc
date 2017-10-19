import React from 'react';
import { connect } from 'react-redux';

import './square.css';

class Square extends React.Component {
  render() {
    if (!this.props.square) {
      return <div className="board-square void"></div>;
    }
    return (
      <div className={'board-square ' + this.props.square.terrain.type}></div>
    );
  }
}
export default connect()(Square);
