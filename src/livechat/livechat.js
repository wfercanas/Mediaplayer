import { livechatContentData, livechatUserData } from './livechat-data.js';

const livechatContent = document.getElementById('live-chat__content');
const livechatForm = document.getElementById('live-chat__write');
const livechatFormText = document.getElementById('live-chat__write--text');

let scrolled = false;

/* Initialize the content of the chat */
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

/* Submit a new message */
const onSubmit = (event) => {
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

/* Reset the textarea for new messages */
const resetForm = () => {
  livechatFormText.value = '';
};

/* Auto scroll down the chat */
let userScrolled = false;

const scrollDown = () => {
  livechatContent.scrollTop = livechatContent.scrollHeight;
};

/* Event listeners */
window.addEventListener('load', loadLivechatContent);
window.addEventListener('load', resetForm);
window.addEventListener('load', () => {
  setTimeout(() => {
    scrollDown();
  }, 1000);
});
livechatForm.addEventListener('submit', (event) => {
  onSubmit(event);
  scrollDown();
});

livechatForm.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    onSubmit(event);
    scrollDown();
  }
});
// livechatContent.addEventListener('scroll', switchUserScrolled);
