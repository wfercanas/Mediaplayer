import { videoSources } from './mediaplayer-data.js';

const video = document.getElementById('mediaplayer__video');
const controls = document.getElementById('mediaplayer__controls');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const progressBar = document.getElementById('progress-bar');
const currentMin = document.getElementById('current-min');
const currentSec = document.getElementById('current-sec');
const durationMin = document.getElementById('duration-min');
const durationSec = document.getElementById('duration-sec');
const nextButton = document.getElementById('next-button');

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

/* Control video advancement */
let playedVideo = false;
let videoBarProgress;
let videoTimeProgress;

const currentVideoProgress = () => {
  progressBar.style.width = `${Math.floor(
    (video.currentTime / video.duration) * 100
  )}%`;
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

/* Next video */
const setNewVideo = () => {
  if (currentIndexVideo === totalVideos) {
    currentIndexVideo = 0;
  } else {
    currentIndexVideo++;
  }
  video.src = videoSources[currentIndexVideo].sources;
};

/* Event listeners */
controls.addEventListener('click', (event) => {
  switch (event.target.id) {
    case 'play-button':
      if (!playedVideo) {
        setVideoDuration();
      }
      video.play();
      startVideoProgress();
      togglePlayPause();
      break;
    case 'pause-button':
      video.pause();
      pauseVideoProgress();
      togglePlayPause();
      break;
    case 'next-button':
      if (!video.paused) {
        pauseVideoProgress();
        video.pause();
      }
      setNewVideo();
      playedVideo = false;
      video.play();
      turnOnPauseButton();
      startVideoProgress();
      setTimeout(setVideoDuration, 500);
  }
});
