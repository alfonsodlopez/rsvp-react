import React from 'react';
import PropTypes from 'prop-types'


//In app.js we pass <GuessList guests={this.state.guests}
//In that statement, 'guests' is the props list we pass in 
//to this component
const PendingGuest = props => {
  if (props.name) {
    return (
    <li className="pending">
      <span>
        {props.name}
      </span>
    </li>
    );
  }
  return null;
}

PendingGuest.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PendingGuest;