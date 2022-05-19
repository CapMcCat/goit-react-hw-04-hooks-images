function fetchPictures(inputValue, pageNumber, KEY) {
  return fetch(
    `https://pixabay.com/api/?q=${inputValue}&page=${pageNumber}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(
        `Что-то пошло не так. Не возможно отобразить картинки по запросу ${inputValue}. Попробуйте ввести запрос заново.`
      )
    );
  });
}

const API = {
  fetchPictures,
};

export default API;
