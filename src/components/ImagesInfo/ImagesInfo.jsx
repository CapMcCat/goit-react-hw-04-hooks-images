import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
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

export const ImagesInfo = ({ searchValue, onGalleryItemClick }) => {
  const [prevSearchValue, setPrevSearchValue] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [checker, setChecker] = useState(false);

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
    if (nextSearchValue === ' ') {
      setStatus(Status.IDLE);
      return;
    }

    if (prevSearchValue !== nextSearchValue) {
      // console.log(
      //   'лог после проверки или предыдущее значение равно следующему'
      // );
      setPage(1);
      setPrevSearchValue(nextSearchValue);
      setError(null);
      setChecker(false);

      API.fetchPictures(nextSearchValue, page, KEY)
        .then(images => {
          if (images.hits.length === 0) {
            toast.error(`Не находим картинок по запросу ${nextSearchValue}`);
            return;
          }
          //console.log('лог номера страницы при фетче по новому запросу', page);
          setImages(images.hits);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    }
    if (prevPage !== page && page > prevPage) {
      API.fetchPictures(nextSearchValue, page, KEY)
        .then(images => {
          if (images.hits.length === 0) {
            toast(`Закончились картинки по запросу ${nextSearchValue}`);
            setChecker(true);
            // console.log(
            //   'консоль images.hits внутри if images.hits.length === 0 в запросе на картинки на след странице',
            //   images.hits
            // );
            return;
          }
          // console.log(
          //   'консоль images.hits внутри  запроса на картинки на след странице',
          //   images.hits
          // );
          setImages(prevImages => [...prevImages, ...images.hits]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          toast(
            `Некорректный запрос или закончились картинки по запросу ${nextSearchValue}`
          );
          console.log('консоль ошибки', error);
          //setStatus(Status.REJECTED);
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
          <ImageGallery
            images={images}
            onGalleryItemClick={onGalleryItemClick}
          />
          {images.length > 0 && !error && !checker && (
            <Button onClick={handleClick} />
          )}
        </>
      )}
    </>
  );
};

ImagesInfo.propTypes = {
  searchValue: PropTypes.string.isRequired,
  onGalleryItemClick: PropTypes.func.isRequired,
};
