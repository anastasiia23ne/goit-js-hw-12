import axios from 'axios';
import { MESSAGES, MESSAGES_BG_COLORS, showInfoMessage } from './js.js';

const API_KEY = '42598065-1779ad5a953180c3fe77c2809';
const API_URL = 'https://pixabay.com/api/';

export async function getGalleryData(queryValue) {
  try {
    const response = await axios.get(API_URL, {
      params: {
        key: API_KEY,
        q: queryValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    });

    return response.data.hits;
  } catch (error) {
    showInfoMessage(`${MESSAGES.exception} ERROR: ${error.message}`, MESSAGES_BG_COLORS.orange);
    throw error;
  }
}
