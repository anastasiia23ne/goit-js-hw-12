import iziToast from 'izitoast';

import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './js/js.js';
import { getGalleryData } from './js/pixabay-api.js';
import { renderGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const form = document.querySelector('.search-form');

form.addEventListener('submit', onSubmitForm);

async function onSubmitForm(event) {
  event.preventDefault();
  iziToast.destroy();

  const formData = new FormData(event.target);
  const { search } = Object.fromEntries(formData.entries());

  if (!search.trim()) {
    showInfoMessage(MESSAGES.info, MESSAGES_BG_COLORS.blue);
    clearGallery();
    return;
  }

  clearGallery();
  showLoader();

  try {
    const images = await getGalleryData(search.trim());

    if (!images || images.length === 0) {
      showInfoMessage(MESSAGES.warning, MESSAGES_BG_COLORS.red);
      return;
    }

    renderGallery(images);
  } catch (error) {
    showInfoMessage(`${MESSAGES.exception} ${error.message}`, MESSAGES_BG_COLORS.orange);
  } finally {
    hideLoader();
    event.target.reset();
  }
}
