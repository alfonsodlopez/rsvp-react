import React from 'react';
import PropTypes from 'prop-types'
import Guest from './Guest'
import PendingGuest from './PendingGuest'
import Header from './Header'

 
//In app.js we pass <GuessList guests={this.state.guests}
//In that statement, 'guests' is the props list we pass in 
//to this component
const GuestList = props =>
            //Props is coming from the parent component in app.js
            //Also set guest name and isConfirmed properties of props
            //We do not supply a key here as the key is the 
            //responsibility of the parent component
  <ul>
    <PendingGuest name={props.pendingGuest}/>
    {props.guests
      //Returns false if a guest should not appear and true if they should
      //If filter is false, then all guests should appear.
      //if isFiltered, then the entire statement is true.
      //If isFiltered is false, then we want to return isConfirmed
      //Unlike isFiltered, we want to return the actually valcue of isConfirmed, not it's opposite.

      .filter(guest => !props.isFiltered || guest.isConfirmed)
      .map((guest, index) => 
      <Guest 
        key={index} 
        name={guest.name} 
        isConfirmed={guest.isConfirmed}
        isEditing={guest.isEditing}
        //We want
        //This function is going to be passed down to the child component
        //where the toggle takes place. The Guest component is unaware of 
        //the other guests in the array. That knowledge (key) comes from GuestList
        //Even though it is being passed down to the child component
        //The JS functions remember the scope in which they are declared
        //Thus here we are passing down the value of index and creating a closure
        handleConfirmation={() => props.toggleConfirmationAt(index)}
        handleToggleEditing={() => props.toggleEditingAt(index)}
        //Accepts the new name and sets it as the state at that particular index
        setName={text => props.setNameAt(text, index)}
        //removeGuestAt passes the index to the Guest component in it's closure
        //via a prop
        handleRemove={() => props.removeGuestAt(index)}
      />
      )}
  </ul>

GuestList.propTypes = {
  guests: PropTypes.array.isRequired,
  toggleConfirmationAt: PropTypes.func.isRequired,
  toggleEditingAt: PropTypes.func.isRequired,
  setNameAt: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired,
  removeGuestAt: PropTypes.func.isRequired,
  pendingGuest: PropTypes.string.isRequired
};

export default GuestList;