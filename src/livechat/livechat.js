import { livechatContentData, livechatUserData } from './livechat-data.js';

const livechatContent = document.getElementById('live-chat__content');
const livechatForm = document.getElementById('live-chat__write');
const livechatFormText = document.getElementById('live-chat__write--text');

const loadLivechatContent = () => {
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
};

const onSubmit = (event) => {
  // console.log(event);
  event.preventDefault();
  const userPost = document.createElement('div');
  const userAvatar = document.createElement('img');
  const userPostTextWrapper = document.createElement('div');
  const userPostAuthor = document.createElement('h3');
  const userPostText = document.createElement('p');
  userPostText.textContent = livechatFormText.value;
  userPostAuthor.textContent = livechatUserData.username;
  userPostTextWrapper.append(userPostAuthor, userPostText);
  userAvatar.src = livechatUserData.avatarURL;
  userPost.append(userAvatar, userPostTextWrapper);
  userPost.classList.add('live-chat__content--post');
  livechatContent.append(userPost);
  resetForm();
};

const resetForm = () => {
  livechatFormText.value = '';
};

window.addEventListener('load', loadLivechatContent);
window.addEventListener('load', resetForm);
livechatForm.addEventListener('submit', onSubmit);
livechatForm.addEventListener('keydown', (event) => {
  // console.log(event);
  if (event.keyCode === 13) {
    onSubmit(event);
  }
});
