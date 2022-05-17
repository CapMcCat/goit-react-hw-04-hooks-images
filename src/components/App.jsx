import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import './App.css';
import { Searchbar } from './Searchbar/Searchbar';
import { ImagesInfo } from './ImagesInfo/ImagesInfo';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);

  const handleFormSubmit = inputValue => {
    return setSearchValue(inputValue);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onGalleryItemClick = e => {
    setUrl(e.currentTarget.dataset.url);

    toggleModal();
  };

  injectStyle();
  return (
    <div className="App">
      <Searchbar onSubmit={handleFormSubmit} />
      <ImagesInfo
        searchValue={searchValue}
        onGalleryItemClick={onGalleryItemClick}
      />
      <ToastContainer autoClose={3000} />
      {showModal && (
        <Modal onClose={toggleModal}>
          <img src={url} alt="" />
        </Modal>
      )}
    </div>
  );
};
