import React from 'react';
import s from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={s.ImageGallery}>
        <ImageGalleryItem images={images} />
      </ul>
    </>
  );
};
