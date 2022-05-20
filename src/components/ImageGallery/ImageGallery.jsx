import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images, onGalleryItemClick }) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        <ImageGalleryItem
          images={images}
          onGalleryItemClick={onGalleryItemClick}
        />
      </ul>
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onGalleryItemClick: PropTypes.func.isRequired,
};
