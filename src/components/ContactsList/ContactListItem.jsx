import React, { Component } from 'react';
export class ContactsListItem extends Component {
  render() {
    return (
      <>
        <li>
          <span>
            {this.props.contact.name}: {this.props.contact.number}
          </span>
          <button
            type="button"
            onClick={() => {
              this.props.onDeleteButton(this.props.contact.id);
            }}
          >
            Delete
          </button>
        </li>
      </>
    );
  }
}
