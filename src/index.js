import { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const API_URL = 'https://pixabay.com/api/';
const formEl = document.getElementById('search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const loadMoreBtnEl = document.querySelector('.load-more');
loadMoreBtnEl.style.visibility = 'hidden';
let page = 1;

async function getPictures(searchedPhrase) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: '36302590-ce388341fd0bce6375bf0ebc2',
        q: encodeURIComponent(searchedPhrase.trim()),
        image_type: 'photo',
        safesearch: true,
        orientation: 'horizontal',
        per_page: 40,
        page: page,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

function renderGallery(arrayFromApi) {
  let markup = ``;
  arrayFromApi.forEach(pic => {
    markup += `<div class="photo-card">
        <a href="${pic.largeImageURL}"><img  src="${pic.webformatURL}" alt="" loading="lazy" />
        </a>
        <div class="info">
            <p class="info-item">
                <b>Likes<br>${pic.likes}</b>
            </p>
            <p class="info-item">
                <b>Views<br>${pic.views}</b>
            </p>
            <p class="info-item">
                <b>Comments<br>${pic.comments}</b>
            </p>
            <p class="info-item">
                <b>Downloads<br>${pic.downloads}</b>
            </p>
        </div>
    </div>`;
  });
  galleryEl.innerHTML += markup;
  let gallery = new SimpleLightbox('.gallery a');
}
function clearSearch() {
  galleryEl.innerHTML = '';
  localStorage.removeItem('searchedPhrase');
}
clearSearch();

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  clearSearch();
  localStorage.setItem('searchedPhrase', inputEl.value);
  loadMoreBtnEl.style.visibility = 'hidden';
  if (inputEl.value === '') {
    return;
  }
  const picsFromApi = await getPictures(inputEl.value);
  if (picsFromApi.data.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  renderGallery(picsFromApi.data.hits);
  if (picsFromApi.data.totalHits > 40) {
    loadMoreBtnEl.style.visibility = 'visible';
  }
  inputEl.value = '';
});

loadMoreBtnEl.addEventListener('click', async () => {
  page += 1;
  loadMoreBtnEl.style.visibility = 'hidden';
  const picsFromApi = await getPictures(localStorage.getItem('searchedPhrase'));
  renderGallery(picsFromApi.data.hits);
  // below code makes the page not to jump to the the bottom when loading more photos
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
  //once there is no more photos - stop showing 'load more' button
  picsFromApi.data.totalHits / page < 40
    ? (loadMoreBtnEl.style.visibility = 'hidden')
    : (loadMoreBtnEl.style.visibility = 'visible');
});
