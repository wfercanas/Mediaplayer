import { videoSources } from './mediaplayer-data.js';

const video = document.getElementById('mediaplayer__video');
const controls = document.getElementById('mediaplayer__controls');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const progressBar = document.getElementById('progress-bar');

video.src = videoSources[1].sources;

const togglePlayPause = () => {
  if (playButton.classList.contains('off')) {
    playButton.classList.remove('off');
    pauseButton.classList.add('off');
  } else {
    playButton.classList.add('off');
    pauseButton.classList.remove('off');
  }
};

/* Control progress-bar advancement */
let videoProgress;

const currentVideoProgress = () => {
  progressBar.style.width = `${Math.floor(
    (video.currentTime / video.duration) * 100
  )}%`;
};

const startVideoProgress = () => {
  videoProgress = setInterval(currentVideoProgress, 1000);
};

const pauseVideoProgress = () => {
  clearInterval(videoProgress);
};

/* Event listeners */
controls.addEventListener('click', (event) => {
  switch (event.target.id) {
    case 'play-button':
      video.play();
      startVideoProgress();
      togglePlayPause();
      break;
    case 'pause-button':
      video.pause();
      pauseVideoProgress();
      togglePlayPause();
      break;
  }
});
