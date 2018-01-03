import React from 'react';
import PropTypes from 'prop-types'
import GuestName from './GuestName'


//In app.js we pass <GuessList guests={this.state.guests}
//In that statement, 'guests' is the props list we pass in 
//to this component
const Guest = props =>
            //Props is coming from the parent component in app.js
            //Also set guest name and isConfirmed properties of props
            //We do not supply a key here as the key is the 
            //responsibility of the parent component
            //HandleNameEdits will take the text entered by the user and set the new state.
          <li>
            <GuestName 
              isEditing={props.isEditing}
              handleNameEdits={e => props.setName(e.target.value)}
              >
              {props.name}
            </GuestName>
            <label>
              <input 
                type="checkbox" 
                checked = {props.isConfirmed} 
                //When the toggle occurs, the component will receive and event object.
                //Since we know that we are only changing a state, we do not need to pass it back.
                //The onClick function calls below allow us to reflect the change of state to the proper spans (GuestName)
                onChange={props.handleConfirmation}
              /> Confirmed
            </label>
            <button onClick={props.handleToggleEditing} >
              {props.isEditing ? "save" : "edit"}
            </button>
            <button onClick={props.handleRemove}>remove</button>
          </li>;

Guest.propTypes = {
  name: PropTypes.string.isRequired,
  isConfirmed: PropTypes.bool.isRequired,
  isEditing: PropTypes.bool.isRequired,
  handleConfirmation: PropTypes.func.isRequired,
  handleToggleEditing: PropTypes.func.isRequired,
  setName: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
};

export default Guest;