import { currentIndexVideo } from '../mediaplayer/mediaplayer.js';
import { videoSources } from '../mediaplayer/mediaplayer-data.js';

const authorName = document.getElementById('author-name');
const authorAvatar = document.getElementById('author-avatar');
const videoTitle = document.getElementById('video-title');
const videoDescription = document.getElementById('video-brief');
const favoriteButton = document.getElementById('favorite-button');

const setVideoDescription = () => {
  authorAvatar.src = videoSources[currentIndexVideo].authorAvatar;
  authorName.textContent = videoSources[currentIndexVideo].author;
  videoTitle.textContent = videoSources[currentIndexVideo].title;
  videoDescription.textContent = videoSources[currentIndexVideo].description;
};

const toggleFavoriteButton = (event) => {
  if (favoriteButton.style.backgroundColor === 'var(--red)') {
    favoriteButton.style.backgroundColor = 'var(--midgray)';
  } else {
    favoriteButton.style.backgroundColor = 'var(--red)';
  }
};

window.addEventListener('load', setVideoDescription);
favoriteButton.addEventListener('click', toggleFavoriteButton);

export { setVideoDescription };
