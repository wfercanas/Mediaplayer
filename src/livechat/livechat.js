import { livechatContentData } from './livechat-data.js';

const livechatContent = document.getElementById('live-chat__content');

window.addEventListener('load', () => {
  console.log('loaded');
  livechatContentData.forEach((post) => {
    const livechatPost = document.createElement('div');
    const livechatPostAvatar = document.createElement('img');
    const livechatPostTextWrapper = document.createElement('div');
    const livechatPostAuthor = document.createElement('h3');
    const livechatPostText = document.createElement('p');
    livechatPostText.textContent = post.text;
    livechatPostAuthor.textContent = post.username;
    livechatPostTextWrapper.append(livechatPostAuthor, livechatPostText);
    livechatPostAvatar.src = post.avatarURL;
    livechatPost.append(livechatPostAvatar, livechatPostTextWrapper);
    livechatPost.classList.add('live-chat__content--post');
    livechatContent.append(livechatPost);
  });
});
