const index = document.getElementById('index');
let notes = document.getElementById('notes');
let posts = [];

fetch('/data/posts.json')
    .then(response => response.json())
    .then(json => {
        // get the last post first
        posts = json.posts.reverse();
        // A workaround as iframe decided to stick with previos link on refresh
        populateIndex();
        const clone = notes.cloneNode(true);
        clone.setAttribute('src', '/blog/page/' + posts[0].id);
        notes.parentNode.replaceChild(clone, notes)
        notes = clone;
    });

async function populateIndex() {
    for (let post of posts) {
        const item = document.createElement('li');
        item.innerHTML = post.name;
        item.onclick = () => {
            console.log(notes.src)
            // notes.src = '/blog/page/'+post.id
            /** The following is a workaround since neither chrome nor edge supports latest embed standard
             * We were unable to change embed src dynamically, so here we clone the embed element and replace its src before replacing the embed itself.
             */
            const clone = notes.cloneNode(true);
            clone.setAttribute('src', '/blog/page/' + post.id);
            notes.parentNode.replaceChild(clone, notes)
            notes = clone;
        };
        index.append(item);
    }
}