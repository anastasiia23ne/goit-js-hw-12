import axios from 'axios';

const API_KEY = '42598065-1779ad5a953180c3fe77c2809';
const API_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  const response = await axios.get(API_URL, { params });
  return response.data;
}
