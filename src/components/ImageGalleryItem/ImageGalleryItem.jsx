import { useState } from 'react';
import s from './ImageGalleryItem.module.css';
import { Modal } from '../Modal/Modal';

export const ImageGalleryItem = ({ images }) => {
  const [showModal, setShowModal] = useState(false);
  const [url, setUrl] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onGalleryItemClick = e => {
    setUrl(e.currentTarget.dataset.url);

    toggleModal();
  };

  return (
    <>
      {images.map(image => (
        <li
          className={s.ImageGalleryItem}
          key={image.id}
          onClick={onGalleryItemClick}
          id={image.id}
          data-url={image.largeImageURL}
        >
          <img
            src={image.webformatURL}
            alt={image.id}
            className={s.ImageGalleryItemImage}
          />
        </li>
      ))}
      {showModal && <Modal onClose={toggleModal} url={url} />}
    </>
  );
};
