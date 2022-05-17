import s from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onGalleryItemClick }) => {
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
    </>
  );
};
