import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import './App.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesInfo } from './ImagesInfo/ImagesInfo';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleFormSubmit = inputValue => {
    return setSearchValue(inputValue);
  };

  injectStyle();
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImagesInfo searchValue={searchValue} />
      <ToastContainer autoClose={3000} />
    </div>
  );
};
