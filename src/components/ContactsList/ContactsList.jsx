import React, { Component } from 'react';
import { ContactsListItem } from './ContactListItem';

export class ContactsList extends Component {
  render() {
    return (
      <>
        <ul>
          {this.props.contacts.map(contact => (
            <ContactsListItem
              key={contact.id}
              contact={contact}
              onDeleteButton={this.props.onDeleteButton}
            />
          ))}
        </ul>
      </>
    );
  }
}
