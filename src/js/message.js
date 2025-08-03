import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export const MESSAGES = {
  info: 'Please enter a value in the search field!',
  warning: 'Sorry, there are no images matching your search query. Please try again!',
  error: 'Sorry, there is no connection to the server. Try again later!',
  exception: 'Something went wrong. Please try again later!',
  end: "We're sorry, but you've reached the end of search results.",
};

export const MESSAGES_BG_COLORS = {
  blue: '#abd4f8',
  orange: '#f28111',
  red: '#e97782',
};

export function showInfoMessage(message, color) {
  iziToast.info({
    position: 'topRight',
    backgroundColor: color,
    message: message,
  });
}
