import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import './App.css';
import 'modern-normalize/modern-normalize.css';
class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  componentDidMount() {
    console.log('App componentDidMount');
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
    console.log(parsedContacts);
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate');
    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновилось поле contacts');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  addContactSubmit = data => {
    const addContactName = this.state.contacts
      .map(contact => contact.name.toLowerCase())
      .includes(data.name.toLowerCase().trim());
    if (addContactName) {
      alert(`${data.name} is already in contacts `);
    } else {
      const contact = {
        ...data,
        id: uuidv4(),
      };
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
  changeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
  };

  onDeleteContact = e => {
    const id = e.target.getAttribute('data-key');

    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    var filter = this.state.filter;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1 className="header">Phonebook</h1>
        <ContactForm onSubmit={this.addContactSubmit} />
        <h2 className="title">Contacts</h2>
        <Filter value={filter} handleChange={this.changeFilter} />
        <ContactList contacts={visibleContacts} onDelete={this.onDeleteContact} />
      </div>
    );
  }
}

export default App;
