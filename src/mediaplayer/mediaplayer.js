import { videoSources } from './mediaplayer-data.js';
import { setVideoDescription } from '../video-description/video-description.js';
import { removeAllRelatedVideos } from '../related-videos/related-videos.js';

const video = document.getElementById('mediaplayer__video');
const controls = document.getElementById('mediaplayer__controls');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const progressBar = document.getElementById('progress-bar');
const currentMin = document.getElementById('current-min');
const currentSec = document.getElementById('current-sec');
const durationMin = document.getElementById('duration-min');
const durationSec = document.getElementById('duration-sec');
const volumeButton = document.getElementById('volume-button');
const muteButton = document.getElementById('mute-button');
const volumeRange = document.getElementById('volume-range');

const totalVideos = videoSources.length;
let currentIndexVideo = 0;
video.src = videoSources[currentIndexVideo].sources;

/* Control play and pause buttons */
const togglePlayPause = () => {
  if (playButton.classList.contains('off')) {
    playButton.classList.remove('off');
    pauseButton.classList.add('off');
  } else {
    playButton.classList.add('off');
    pauseButton.classList.remove('off');
  }
};

const turnOnPauseButton = () => {
  if (pauseButton.classList.contains('off')) {
    pauseButton.classList.remove('off');
    playButton.classList.add('off');
  }
};

const turnOnPlayButton = () => {
  playButton.classList.remove('off');
  pauseButton.classList.add('off');
};

/* Control video advancement */
let playedVideo = false;
let videoBarProgress;
let videoTimeProgress;

const currentVideoProgress = () => {
  progressBar.style.width = `${Math.floor(
    (video.currentTime / video.duration) * 100
  )}%`;
  if (video.ended) {
    turnOnPlayButton();
    setTimeout(pauseVideoProgress, 1000);
  }
};

const startVideoProgress = () => {
  videoBarProgress = setInterval(currentVideoProgress, 1000);
  videoTimeProgress = setInterval(setVideoCurrentTime, 1000);
};

const pauseVideoProgress = () => {
  clearInterval(videoBarProgress);
  clearInterval(videoTimeProgress);
};

const setVideoDuration = () => {
  durationMin.textContent = Math.floor(video.duration / 60);
  durationSec.textContent =
    video.duration % 60 < 10
      ? `0${Math.floor(video.duration % 60)}`
      : Math.floor(video.duration % 60);
  playedVideo = true;
};

const setVideoCurrentTime = () => {
  currentMin.textContent = Math.floor(video.currentTime / 60);
  currentSec.textContent =
    video.currentTime % 60 < 10
      ? `0${Math.floor(video.currentTime % 60)}`
      : Math.floor(video.currentTime % 60);
};

/* Skip video */
const setNewVideo = () => {
  if (currentIndexVideo === totalVideos - 1) {
    currentIndexVideo = 0;
  } else {
    currentIndexVideo++;
  }
  video.src = videoSources[currentIndexVideo].sources;
  setVideoDescription();
};

const setSpecificVideo = (index) => {
  currentIndexVideo = index;
  if (!video.paused) {
    video.pause();
    pauseVideoProgress();
  }
  video.src = videoSources[index].sources;
  playedVideo = false;
  turnOnPauseButton();
  startVideoProgress();
  setTimeout(setVideoDuration, 1000);
  video.play();
};

/* Volume control */
const setInitialVolume = () => {
  video.volume = 0.75;
  volumeRange.value = 75;
};

const setVolume = () => {
  video.volume = volumeRange.value / 100;
  if (video.volume > 0) {
    turnOnVolumeButton();
  } else {
    turnOnMuteButton();
  }
};

const toggleMute = (event) => {
  if (event.target.id === 'volume-button' && !video.muted) {
    volumeButton.classList.add('off');
    muteButton.classList.remove('off');
    video.volume = 0;
    volumeRange.value = 0;
  } else {
    volumeButton.classList.remove('off');
    muteButton.classList.add('off');
    video.volume = 0.75;
    volumeRange.value = 75;
  }
};

const turnOnVolumeButton = () => {
  volumeButton.classList.remove('off');
  muteButton.classList.add('off');
};

const turnOnMuteButton = () => {
  volumeButton.classList.add('off');
  muteButton.classList.remove('off');
};

/* Control fullscreen */
const toggleFullscreen = () => {
  if (video.classList.contains('fullscreen-video')) {
    video.classList.remove('fullscreen-video');
    controls.classList.remove('fullscreen-controls');
  } else {
    video.classList.add('fullscreen-video');
    controls.classList.add('fullscreen-controls');
  }
};

/* Display controls when hover */

video.addEventListener('mouseover', () => {
  controls.style.visibility = 'visible';
});

video.addEventListener('mouseleave', () => {
  controls.style.visibility = 'hidden';
});

controls.addEventListener('mouseover', () => {
  controls.style.visibility = 'visible';
});

controls.addEventListener('mouseleave', () => {
  controls.style.visibility = 'hidden';
});

/* Media player functionality */
const play = () => {
  if (!playedVideo) {
    setVideoDuration();
  }
  video.play();
  startVideoProgress();
  togglePlayPause();
};

const pause = () => {
  video.pause();
  pauseVideoProgress();
  togglePlayPause();
};

const next = () => {
  if (!video.paused) {
    video.pause();
    pauseVideoProgress();
  }
  setNewVideo();
  playedVideo = false;
  turnOnPauseButton();
  startVideoProgress();
  setTimeout(setVideoDuration, 1000);
  removeAllRelatedVideos();
  video.play();
};

const mediaplayer = (event) => {
  switch (event.target.id) {
    case 'play-button':
      play();
      break;
    case 'pause-button':
      pause();
      break;
    case 'next-button':
      next();
      break;
    case 'volume-button':
      toggleMute(event);
      break;
    case 'mute-button':
      toggleMute(event);
      break;
    case 'volume-range':
      setVolume(event);
      break;
    case 'fullscreen-button':
      toggleFullscreen();
      break;
  }
};

/* Event listeners */
controls.addEventListener('click', mediaplayer);
video.addEventListener('click', () => {
  video.paused ? play() : pause();
});
window.addEventListener('load', setInitialVolume);

export { currentIndexVideo, video, setSpecificVideo };
