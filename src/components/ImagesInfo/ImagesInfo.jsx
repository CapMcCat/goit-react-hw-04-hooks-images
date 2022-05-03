import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../services/picture-api';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { Button } from '../Button/Button';
import { Spinner } from '../Loader/Loader';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

const KEY = '23664732-922ae8a04b91fba4e55f74778';

export const ImagesInfo = ({ searchValue }) => {
  const [prevSearchValue, setPrevSearchValue] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  function usePrevious(page) {
    const ref = useRef();
    useEffect(() => {
      ref.current = page;
    });
    return ref.current;
  }

  const prevPage = usePrevious(page);
  const nextSearchValue = searchValue;

  useEffect(() => {
    if (prevSearchValue !== nextSearchValue) {
      setStatus(Status.PENDING);
      setPage(1);
      setPrevSearchValue(nextSearchValue);

      API.fetchPictures(nextSearchValue, page, KEY)
        .then(images => {
          if (images.hits.length === 0) {
            toast.error(`Не находим картинок по запросу ${nextSearchValue}`);
          }
          setImages(images.hits);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
          console.log(error.message);
          console.log(error);
        });
    }
    if (prevPage !== page && page > prevPage) {
      API.fetchPictures(nextSearchValue, page, KEY)
        .then(images => {
          if (images.hits.length === 0) {
            toast(`Закончились картинки по запросу ${nextSearchValue}`);
          }

          setImages(prevImages => [...prevImages, ...images.hits]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        })
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    }
  }, [prevSearchValue, page, prevPage, nextSearchValue, status]);

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };
  return (
    <>
      {status === 'idle' && <div>Введите запрос.</div>}
      {status === 'pending' && <Spinner />}
      {status === 'rejected' && <div>{error.message}</div>}
      {status === 'resolved' && (
        <>
          <ImageGallery images={images} />
          {images.length > 0 && <Button onClick={handleClick} />}
        </>
      )}
    </>
  );
};
