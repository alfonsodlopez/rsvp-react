import React from 'react';
import PropTypes from 'prop-types'

const GuestInputForm = props =>
    <form onSubmit={props.newGuestSubmitHandler}>
	    <input 
	      type="text" 
	      onChange={props.handleNameInput}
	      value={props.pendingGuest} 
	      placeholder="Invite Someone" 
	    />
	    <button type="submit" name="submit" value="submit">Submit</button>
	</form>

GuestInputForm.propTypes = {
	pendingGuest: PropTypes.string.isRequire,
	handleNameInput: PropTypes.func.isRequired,
	newGuestSubmitHandler: PropTypes.func.isRequired
};

export default GuestInputForm;