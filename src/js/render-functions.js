import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function markup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <li class="gallery-item hvr-grow">
          <a class="gallery-link" href="${largeImageURL}">
            <figure class="gallery-figure">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
              <figcaption class="gallery-figcaption">
                <ul class="img-content-wrapper">
                  <li>Likes<span>${likes}</span></li>
                  <li>Views<span>${views}</span></li>
                  <li>Comments<span>${comments}</span></li>
                  <li>Downloads<span>${downloads}</span></li>
                </ul>
              </figcaption>
            </figure>
          </a>
        </li>
      `
    )
    .join('');
}

export function renderGallery(images) {
  gallery.insertAdjacentHTML('beforeend', markup(images));
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  if (loader) loader.style.display = 'block';
}

export function hideLoader() {
  if (loader) loader.style.display = 'none';
}
