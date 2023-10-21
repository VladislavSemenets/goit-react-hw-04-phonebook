import { useState, useEffect } from 'react';
import { FormPhonebook } from './FormPhonebook/FormPhonebook';
import { ListContact } from './ListContact/ListContact';
import { SearchBar } from './SeachBar/SeachBar';

const localStorageKey = 'contacts';

const getContacts = () => {
  const contacts = localStorage.getItem(localStorageKey);
  if (contacts !== null) {
    return JSON.parse(contacts);
  } else {
    return [];
  }
};

export const App = () => {
  const [contacts, setContacts] = useState(getContacts);
  const [filters, setFilters] = useState('');

  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filters.toLowerCase())
  );

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(contacts));
  }, [contacts]);

  const addName = newName => {
    const searchName = contacts.map(cont => cont.name).includes(newName.name);

    if (searchName) {
      alert(`${newName.name} is already in contacts`);
    } else {
      setContacts(prevState => [...prevState, newName]);
    }
  };

  const changeFilter = newFilter => {
    setFilters(newFilter);
  };

  const handleDelete = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
        }}
      >
        Phonebook
      </h1>

      <FormPhonebook onAdd={addName} />

      <h2
        style={{
          textAlign: 'center',
        }}
      >
        Contacts:
      </h2>

      <SearchBar seachFilter={filters} onChangeFilter={changeFilter} />

      <ListContact contacts={visibleContact} onDelete={handleDelete} />
    </>
  );
};
