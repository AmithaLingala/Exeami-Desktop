const content = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get('path');
const clone = content.cloneNode(true);
clone.setAttribute('src', path);
content.parentElement.replaceChild(clone, content);
content = clone;