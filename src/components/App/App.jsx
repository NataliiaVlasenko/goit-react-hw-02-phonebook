import React, { Component } from 'react';
import { ContactForm } from '../Form/Form';
import { ContactList } from '../Contacts/Contacts';
import { ContactFilter } from '../ContactFilter/ContactFilter';
import { Container } from './App.styled';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  onFormSubmit = ({ name, id, number }) => {
    const contact = { name, id, number };
    this.setState(({ contacts }) => {
      return { contacts: [contact, ...contacts] };
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  onDeleteHandler = id => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState(prevState => {
      return { ...prevState, contacts: [...filteredContacts] };
    });
  };

  onFilterContacts = () => {
    let filterContact = [];
    if (this.state.filter) {
      filterContact = this.state.contacts.filter(
        contact =>
          contact.name.includes(this.state.filter) ||
          contact.name.toLowerCase().includes(this.state.filter)
      );
    } else {
      return this.state.contacts;
    }
    return filterContact;
  };

  render() {
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm
          contacts={this.state.contacts}
          onSubmit={this.onFormSubmit}
        ></ContactForm>

        <h2>Contacts</h2>
        <ContactFilter onFilter={this.onFilter} filter={this.state.filter} />

        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          filterContacts={this.onFilterContacts}
          onDelete={this.onDeleteHandler}
        ></ContactList>
      </Container>
    );
  }
}
