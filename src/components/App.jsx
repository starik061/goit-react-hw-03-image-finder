import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { AddContactForm } from './AddContactForm/AddContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = formState => {
    const { name, number } = formState;
    const contact = { name: name, number: number, id: nanoid(4) };

    let isNameInContacts = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameInContacts) {
      alert('Такое имя уже существует в контактах');
      return;
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <>
        <h1>Phonebook</h1>
        <AddContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter changeValue={this.changeFilter} value={this.state.filter} />
        <ContactsList
          contacts={filteredContacts}
          onFilterChange={this.updateInputState}
          onDeleteButton={this.deleteContact}
        />
      </>
    );
  }
}
