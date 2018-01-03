import React, { Component } from 'react';
import './App.css';


//We renamed these files to index.js. React will search the folders
//of the same name and will looks for index.js by default
import Header from './Header';
import MainContent from './MainContent';

class App extends Component {
  //this holds our initial state
  state = {
    isFiltered: false,
    //pendingGuest will be for tracking input data in our form
    pendingGuest: "",
    //We will store our guests in here as an array of objects
    //When we click on our checkbox we will change the state 
    //Of the Guest and GuestList components, which will have
    //App change the state of isConfirmed
    guests: []
  };

  lastGuestId = 0;

  newGuestId = () => {
    const id = this.lastGuestId;
    this.lastGuestId += 1;
    return id;
  }


  //This function toggles the confirmation at the specified id.
  //Pass in property parameter
  //Question: Why do I need a key value pair for setState?
  toggleGuestPropertyAt = (property, id) => 
    this.setState({
      guests: this.state.guests.map(guest => {
        if(id === guest.id) {
          return {
            //The spread operator transers the keys and values from one object to another.
            ...guest,
            //We then overwrite the property value and use a computed value in brackets
            [property]: !guest[property]
          };
        }
        //else return the object unchanged
        return guest;
      })
    })

    //We can now invoke the function above to toggle any of the properties
    //In the guest object

    toggleConfirmationAt = id =>
      this.toggleGuestPropertyAt("isConfirmed", id);

    //removeGuestAt takes an id pointing to an item we want to remove
/*    removeGuestAt = id => 
      //Set the state of Guests pointing to a new array
      //Use the spread operator to add the contents of two arrays into one
      //The first will hold every guest before we get to the one we want to remove
      //Then we produce another array taking everything after the element we want to remove
      this.setState({
        guests: [
          ...this.state.guests.slice(0, id),
          ...this.state.guests.slice(id + 1)
        ]
      })*/

  removeGuestAt = id =>
    this.setState({
      guests: this.state.guests.filter(guest => id !== guest.id)
    })

  toggleEditingAt = id =>
    this.toggleGuestPropertyAt("isEditing", id);

  setNameAt = (name, id) => 
    this.setState({
      guests: this.state.guests.map(guest => {
        if(id === guest.id) {
          return {
            //The spread operator transers the keys and values from one object to another.
            ...guest,
            name
          };
        }
        //else return the object unchanged
        return guest;
      })
    })

  toggleFilter = () =>
    this.setState({isFiltered: !this.state.isFiltered})

  //We are going to pass this to the same component, so we will not need to go down the
  //component tree for this one.
  handleNameInput = e => 
    this.setState({ pendingGuest: e.target.value });

  newGuestSubmitHandler = e => {
    e.preventDefault();
    const id = this.newGuestId();

    this.setState({
      guests: [
        {
          name: this.state.pendingGuest,
          isConfirmed: false,
          isEditing: false,
          id
        },
        ...this.state.guests
      ],
      pendingGuest: ''
    })
  }

  //this method will count the number of guests invited.
  getTotalInvited = () => this.state.guests.length;
  
  //we will calculate the total attending by counting isConfirmed ==== true values
  getAttendingGuests = () => 
    this.state.guests.reduce(
      (total, guest) => guest.isConfirmed ? total + 1 : total, 
      0)


  render() {
    //totalInvited is from the Counter component
    //We set totalInvited here as we want it to update as the app rerenders
    const totalInvited = this.getTotalInvited()
    const numberAttending = this.getAttendingGuests();
    const numberUnconfirmed = totalInvited - numberAttending;
    return (
      <div className="App">
        <Header 
          newGuestSubmitHandler={this.newGuestSubmitHandler}
          pendingGuest={this.state.pendingGuest}
          handleNameInput={this.handleNameInput}
        />
        <MainContent 
          toggleFilter={this.toggleFilter}
          isFiltered={this.state.isFiltered}
          totalInvited={totalInvited}
          numberAttending={numberAttending}
          numberUnconfirmed={numberUnconfirmed}
          guests={this.state.guests}
          toggleConfirmationAt={this.toggleConfirmationAt}
          toggleEditingAt={this.toggleEditingAt}
          setNameAt={this.setNameAt}
          removeGuestAt={this.removeGuestAt}
          pendingGuest={this.state.pendingGuest}
        />
      </div>
    );
  }
}

export default App;
