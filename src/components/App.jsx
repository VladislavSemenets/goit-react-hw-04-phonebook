import React, { useState, useEffect, useCallback } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { nanoid } from 'nanoid';
import { Div } from './App.styled';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const addContact = useCallback(
    (name, number) => {
      const isNameExists = contacts.some((contact) => contact.name === name);

      if (isNameExists) {
        alert(`${name} is already in contacts`);
        return;
      }

      const newContact = {
        name: name,
        number: number,
        id: nanoid(),
      };

      setContacts((prevContacts) => [...prevContacts, newContact]);
    },
    [contacts]
  );

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = (id) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Div>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <input
        type="text"
        placeholder="Search contacts by name"
        value={filter}
        onChange={handleFilterChange}
      />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </Div>
  );
}

export default App;
