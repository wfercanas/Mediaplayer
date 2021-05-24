import { videoSources } from './mediaplayer-data.js';

const video = document.getElementById('mediaplayer__video');

video.src = videoSources[1].sources;
