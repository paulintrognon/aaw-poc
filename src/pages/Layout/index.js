import React from 'react';

import './reset.css';
import './layout.css';

export default class Layout extends React.Component {
  render() {
    return (
      <div className="full-container">
        <nav className="main-nav navbar navbar-dark">
          <div className="container">
            <a className="navbar-brand" href="/">
              Armies At War
            </a>
          </div>
        </nav>
        <div className="container main-content">
          {this.props.children}
        </div>
      </div>
    )
  }
}
