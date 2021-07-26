import React from 'react';
import './ContactList.css';
const ContactList = ({ contacts, onDelete }) => {
  return (
    <ul className="list">
      {contacts.map(contact => (
        <li className="item" key={contact.id}>
          <p className="name">
            {contact.name}: {contact.number}
          </p>
          {
            <button className="button" data-key={contact.id} type="button" name="delete" onClick={onDelete}>
              Delete
            </button>
          }
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
