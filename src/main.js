import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  initializeLightbox,
  refreshLightbox,
} from './js/render-functions';
import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './js/message';


const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;
const PER_PAGE = 15;

form.addEventListener('submit', async e => {
  e.preventDefault();

  hideLoadMoreButton();
  clearGallery(gallery);
  showLoader();
   await new Promise(resolve => setTimeout(resolve, 50));

  const formData = new FormData(form);
  const searchQuery = formData.get('search').trim();

  if (!searchQuery) {
    hideLoader();
    showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.blue);
    return;
  }

  currentQuery = searchQuery;
  currentPage = 1;

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      hideLoader();
      showInfoMessage(MESSAGES.warning, MESSAGES_BG_COLORS.red);
      return;
    }

    gallery.innerHTML = createGallery(data.hits);
    initializeLightbox();

   
    if (currentPage < Math.ceil(totalHits / PER_PAGE)) {
      showLoadMoreButton();
    }
  } catch (err) {
    showInfoMessage(`${MESSAGES.exception} ${err}`, MESSAGES_BG_COLORS.orange);
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, PER_PAGE);
    gallery.insertAdjacentHTML('beforeend', createGallery(data.hits));
    refreshLightbox();

    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage >= Math.ceil(totalHits / PER_PAGE)) {
      hideLoadMoreButton();
      showInfoMessage(MESSAGES.end, MESSAGES_BG_COLORS.red);
    }
  } catch (err) {
    showInfoMessage(`${MESSAGES.exception} ${err}`, MESSAGES_BG_COLORS.orange);
  } finally {
    hideLoader();
  }
});
