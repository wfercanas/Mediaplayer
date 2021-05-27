import {
  currentIndexVideo,
  setSpecificVideo,
} from '../mediaplayer/mediaplayer.js';
import { videoSources } from '../mediaplayer/mediaplayer-data.js';
import { setVideoDescription } from '../video-description/video-description.js';

const relatedVideos = document.getElementById('related-videos__cards');
const seeAllRelatedVideosButton = document.getElementById(
  'related-videos__more-videos-btn'
);
const twoRelatedVideosIndexesUsed = [];
let seeMoreVideosStatus = false;

const newRelatedVideo = (index) => {
  const relatedVideoContainer = document.createElement('div');
  const relatedVideoThumb = document.createElement('img');
  const relatedVideoContent = document.createElement('div');
  const relatedVideoTitle = document.createElement('h4');
  const relatedVideoAuthor = document.createElement('p');
  const relatedVideoMetadata = document.createElement('div');
  const relatedVideoMetadataViews = document.createElement('p');
  const relatedVideoMetadataSpot = document.createElement('i');
  const relatedVideoMetadataPublished = document.createElement('p');

  relatedVideoContainer.classList.add('related-videos__container');
  relatedVideoThumb.classList.add('related-videos__cover');
  relatedVideoContent.classList.add('related-videos__content');
  relatedVideoTitle.classList.add('related-videos__content--title');
  relatedVideoAuthor.classList.add('related-videos__content--author');
  relatedVideoMetadata.classList.add('related-videos__content--metadata');
  relatedVideoMetadataViews.classList.add('related-videos__content--views');
  relatedVideoMetadataSpot.classList.add('ci-dot_01_xs');
  relatedVideoMetadataPublished.classList.add(
    'related-videos__content--published'
  );

  relatedVideoMetadata.append(
    relatedVideoMetadataViews,
    relatedVideoMetadataSpot,
    relatedVideoMetadataPublished
  );

  relatedVideoContent.append(
    relatedVideoTitle,
    relatedVideoAuthor,
    relatedVideoMetadata
  );

  relatedVideoContainer.append(relatedVideoThumb, relatedVideoContent);

  relatedVideoThumb.src = videoSources[index].thumb;
  relatedVideoTitle.textContent = videoSources[index].title;
  relatedVideoAuthor.textContent = videoSources[index].author;
  relatedVideoMetadataViews.textContent = '125.800 views';
  relatedVideoMetadataPublished.textContent = '2 days ago';

  relatedVideoThumb.dataset.index = index;
  relatedVideoTitle.dataset.index = index;

  relatedVideos.appendChild(relatedVideoContainer);
};

const setTwoRelatedVideos = () => {
  let relatedVideosInserted = 0;
  let candidateIndex = 0;
  while (relatedVideosInserted < 2) {
    if (candidateIndex != currentIndexVideo) {
      newRelatedVideo(candidateIndex);
      relatedVideosInserted++;
      twoRelatedVideosIndexesUsed.push(candidateIndex);
    }
    candidateIndex++;
  }
};

const removeAllRelatedVideos = () => {
  const totalRelatedVideos = relatedVideos.childElementCount;
  for (let i = 0; i < totalRelatedVideos; i++) {
    relatedVideos.removeChild(relatedVideos.lastChild);
  }
  const totalRecommendedVideosUsed = 2;
  for (let j = 0; j < totalRecommendedVideosUsed; j++) {
    twoRelatedVideosIndexesUsed.pop();
  }
  setTwoRelatedVideos();
  seeAllRelatedVideosButton.textContent = 'See all related videos';
  seeMoreVideosStatus = false;
};

const insertTotalRelatedVideos = () => {
  let candidateIndex = 0;
  while (candidateIndex < videoSources.length - 1) {
    if (
      candidateIndex != currentIndexVideo &&
      !twoRelatedVideosIndexesUsed.includes(candidateIndex)
    ) {
      newRelatedVideo(candidateIndex);
    }
    candidateIndex++;
  }
  seeAllRelatedVideosButton.textContent = 'See less related videos';
  seeMoreVideosStatus = true;
};

window.addEventListener('load', setTwoRelatedVideos);
seeAllRelatedVideosButton.addEventListener('click', () => {
  if (seeMoreVideosStatus) {
    removeAllRelatedVideos();
  } else {
    insertTotalRelatedVideos();
  }
});
relatedVideos.addEventListener('click', (event) => {
  if (event.target.nodeName === 'IMG' || event.target.nodeName === 'H4') {
    const index = event.target.dataset.index;
    setSpecificVideo(index);
    setVideoDescription(index);
    removeAllRelatedVideos();
  }
});

export { removeAllRelatedVideos };
