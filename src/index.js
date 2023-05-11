import { Notify } from 'notiflix';
import axios from 'axios';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const API_URL = 'https://pixabay.com/api/';
const formEl = document.getElementById('search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
console.log(formEl);

async function getPictures(userInput) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: '36302590-ce388341fd0bce6375bf0ebc2',
        q: encodeURIComponent(userInput),
        image_type: 'photo',
        safesearch: true,
        orientation: 'horizontal',
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
}

// const mockArr = [
//   {
//     collections: 5,
//     comments: 28,
//     downloads: 4334,
//     id: 7972990,
//     imageHeight: 2897,
//     imageSize: 3024501,
//     imageWidth: 4885,
//     largeImageURL:
//       'https://pixabay.com/get/g2a55b9d99ed5b37b76c2ae860b489b29f857d80ea4fd9d427abd5d6ba0ebcd25410c86b5e43cb93281a9462d6af25fe0a8b8403ef5f701db6e0253f78e4cd536_1280.jpg',
//     likes: 68,
//     pageURL: 'https://pixabay.com/photos/allium-flowers-plant-7972990/',
//     previewHeight: 89,
//     previewURL:
//       'https://cdn.pixabay.com/photo/2023/05/05/18/20/allium-7972990_150.jpg',
//     previewWidth: 150,
//     tags: 'allium, flowers, plant',
//     type: 'photo',
//     user: 'matthiasboeckel',
//     userImageURL:
//       'https://cdn.pixabay.com/user/2022/04/12/06-48-11-19_250x250.jpg',
//     user_id: 3930681,
//     views: 4517,
//     webformatHeight: 380,
//     webformatURL:
//       'https://pixabay.com/get/g5ae87d1467f3baf7965fbee06dc10ffc15317101a1dc5d6fd272e8ecdaa148a11fbbeea9bac4a187942fdc53875bd003c8ffd9aa3046183e5dd6bb257db689ad_640.jpg',
//     webformatWidth: 640,
//   },
//   {
//     collections: 5,
//     comments: 28,
//     downloads: 4334,
//     id: 7972990,
//     imageHeight: 2897,
//     imageSize: 3024501,
//     imageWidth: 4885,
//     largeImageURL:
//       'https://pixabay.com/get/g2a55b9d99ed5b37b76c2ae860b489b29f857d80ea4fd9d427abd5d6ba0ebcd25410c86b5e43cb93281a9462d6af25fe0a8b8403ef5f701db6e0253f78e4cd536_1280.jpg',
//     likes: 68,
//     pageURL: 'https://pixabay.com/photos/allium-flowers-plant-7972990/',
//     previewHeight: 89,
//     previewURL:
//       'https://cdn.pixabay.com/photo/2023/05/05/18/20/allium-7972990_150.jpg',
//     previewWidth: 150,
//     tags: 'allium, flowers, plant',
//     type: 'photo',
//     user: 'matthiasboeckel',
//     userImageURL:
//       'https://cdn.pixabay.com/user/2022/04/12/06-48-11-19_250x250.jpg',
//     user_id: 3930681,
//     views: 4517,
//     webformatHeight: 380,
//     webformatURL:
//       'https://pixabay.com/get/g5ae87d1467f3baf7965fbee06dc10ffc15317101a1dc5d6fd272e8ecdaa148a11fbbeea9bac4a187942fdc53875bd003c8ffd9aa3046183e5dd6bb257db689ad_640.jpg',
//     webformatWidth: 640,
//   },
// ];
// renderGallery(mockArr);

function renderGallery(arrayFromApi) {
  let markup = ``;
  galleryEl.innerHTML = '';
  arrayFromApi.forEach(pic => {
    markup += `
    <div class="photo-card">
        <a><img  src="${pic.webformatURL}" alt="" loading="lazy" />
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
    galleryEl.innerHTML = markup;
  });
}

formEl.addEventListener('submit', async event => {
  event.preventDefault();
  if (inputEl.value === '') {
    return;
  }
  const picsFromApi = await getPictures(inputEl.value);
  console.log(picsFromApi);
  console.log(picsFromApi.data.hits);
  renderGallery(picsFromApi.data.hits);
  inputEl.value = '';
});
