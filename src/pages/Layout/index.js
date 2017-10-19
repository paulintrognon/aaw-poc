import React from 'react';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>
          Armies at War
        </h1>
        {this.props.children}
      </div>
    )
  }
}
