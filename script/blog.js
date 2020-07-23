//const index = document.getElementById('index');
//const arrow = document.getElementById('arrow');
const noteContainer = document.getElementById('note-container');
//let navigator1 = document.getElementById('navigator');
let notes = document.getElementById('notes');
let posts = [];
//navigator1.style.width = "2em";
//index.classList.add('hide');
noteContainer.classList.add('left');

const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get('path');
fetch('/data/posts.json')
    .then(response => response.json())
    .then(json => {
        // get the last post first
        posts = json.posts.reverse();
        // A workaround as iframe decided to stick with previos link on refresh
//        populateIndex();
        const clone = notes.cloneNode(true);
        let postIndex = 0;
        if(path) {
          postIndex = posts.findIndex(post=>post.name == path);
          if(postIndex == -1) postIndex = 0;
        }
        clone.setAttribute('src', '/blogs/page/' + posts[postIndex].id);

        notes.parentNode.replaceChild(clone, notes)
        notes = clone;
    });

// arrow.onclick = () => {
//     const style = window.getComputedStyle(navigator1);
//     const wd = style.getPropertyValue('width');
//     // pixel to em
//     const em = wd.substring(0, wd.length-2)/ 16;
//     if (em > 2) {
//         navigator1.style.width = "2em";
//         index.classList.add('hide');
//         noteContainer.classList.add('left');
//     } else {
//         navigator1.style.width = "250em";
//         index.classList.remove('hide');
//         noteContainer.classList.remove('left');
//     }
//
// }
async function populateIndex() {
    for (let post of posts) {
        if (post.hide) {
            continue;
        }

        const item = document.createElement('li');
        item.innerHTML = post.name;
        item.onclick = () => {
            console.log(notes.src)
            // notes.src = '/blogs/page/'+post.id
            /** The following is a workaround since neither chrome nor edge supports latest embed standard
             * We were unable to change embed src dynamically, so here we clone the embed element and replace its src before replacing the embed itself.
             */
            const clone = notes.cloneNode(true);
            clone.setAttribute('src', '/blogs/page/' + post.id);
            notes.parentNode.replaceChild(clone, notes)
            notes = clone;
            navigator1.style.width = "2em";
        index.classList.add('hide');
        noteContainer.classList.add('left');

        };
        index.append(item);
    }
}