import React from 'react';
import { SeachFilter } from 'components/SeachBar/SeachFilter';
import { Block } from './SeachBar.styled';

const SearchBar = ({ seachFilter, onChangeFilter }) => {
  return (
    <Block>
      <p>Find contact by name</p>
      <SeachFilter value={seachFilter} onChange={onChangeFilter} />
    </Block>
  );
};

export default SearchBar;
