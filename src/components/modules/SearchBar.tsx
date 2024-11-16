"use client";
import InputField from '../elements/InputField';
import Button from '../elements/Button';
import { useState } from 'react';

interface SearchBarProps {
  onQueryChange: (newQuery: string) => void;
  onSearchSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onQueryChange, onSearchSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuery(value);
    onQueryChange(value);
  };

  const searchClick = () => {
    onSearchSubmit();
  };

  return (
    <div className="flex space-x-2">
      <InputField value={query} onChange={handleSearch} />
      <Button label="Search" onClick={searchClick} />
    </div>
  );
};

export default SearchBar;
