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
      <form onSubmit={this.handleSubmit} className="create-soldier-form">
        <input type="text" placeholder="Votre nom, soldat ?" onChange={this.handleNameChange} />
        <input type="submit" value="Go !" />
      </form>
    );
  }
}
export default connect()(PlayerInformation);
