import React from 'react';
import { connect } from 'react-redux';

import { createNewPlayerAction } from '../../actions/gameActions';

class PlayerInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '' };
  }

  handleSubmit = (event) => {
    this.props.dispatch(createNewPlayerAction(this.state.name));
    event.preventDefault();
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Enter your soldier name" onChange={this.handleNameChange} />
        <input type="submit" value="Start!" />
      </form>

    );
  }
}
export default connect()(PlayerInformation);
