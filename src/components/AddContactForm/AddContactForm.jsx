import React, { Component } from 'react';

export class AddContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  updateInputState = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  resetForm = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    return (
      <form
        onSubmit={event => {
          event.preventDefault();
          this.props.onAddContact(this.state);
          this.resetForm();
        }}
      >
        <label>
          Name
          <input
            onChange={this.updateInputState}
            type="text"
            name="name"
            pattern="^[A-Za-z\u0080-\uFFFF ']+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={this.state.name}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            onChange={this.updateInputState}
            name="number"
            value={this.state.number}
            pattern="^(\+?[0-9.\(\)\-\s]*)$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          ></input>
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
