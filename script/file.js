let content = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
let path = urlParams.get('path');

let clone = content.cloneNode(true);
clone.setAttribute('src', path);
content.parentElement.replaceChild(clone, content);
content = clone;