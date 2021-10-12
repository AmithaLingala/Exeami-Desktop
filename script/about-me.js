const about = document.getElementById('about');
const skills = document.getElementById('skills');
const education = document.getElementById('education');
const experience = document.getElementById('experience');
const projects = document.getElementById('projects');
const resume = document.getElementById('resume');
const cardList = document.getElementById("card-list");
about.focus();
const tabs = [about, skills, education, experience, projects, resume];
tabs.forEach(tab => tab.onclick = (e) => showTab(e.target.getAttribute("data-target")));
for (let card of cardList.children) {
    card.onclick = (e) => flipCard(card);
    console.log(card);
}
function showTab(id) {
    for (let tab of document.getElementsByClassName('tab')) {
        tab.classList.add('hide');
    }
    document.getElementById(id).classList.toggle('hide');
}
function flipCard(card) {
    card.classList.toggle("flip");
    let cardFront = card.children[0];
    let cardBack = card.children[1];
    if (cardFront.getAttribute("data-hide")) {
        cardFront.classList.remove("hide");
        cardBack.classList.add("hide");
        cardFront.removeAttribute("data-hide");
        cardBack.setAttribute("data-hide","true");
    }
    else {
        cardBack.classList.remove("hide");
        cardFront.classList.add("hide");
        cardBack.removeAttribute("data-hide");
        cardFront.setAttribute("data-hide","true");
    }
}
