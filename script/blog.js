const index = document.getElementById('index');
const notes = document.getElementById('notes');
let posts = [];

fetch('/data/posts.json')
.then(response => response.json())
.then(json=>{
    posts=json.posts.reverse();
    // A workaround as iframe decided to stick with previos link on refresh
    populateIndex();
    notes.src = '/blog/page/'+posts[0].id;
});

async function populateIndex() {
    for (let post of posts) {
        const item = document.createElement('li');
        item.innerHTML = post.name;
        item.onclick = ()=> {
            console.log(notes.src)
            if(notes.src.indexOf('/blog/page/'+post.id) === -1){
                notes.src = '/blog/page/'+post.id
            }
        };
        index.append(item);
    }
}