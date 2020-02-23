const title = document.getElementById('title');
const close = document.getElementById('close');
const desktop = document.getElementById('desktop');
const windowBox = document.getElementById('window-box');
const logo = document.getElementById('logo');
const bubble = document.getElementById('bubble');
const homebutton = document.getElementById('home-button');
const titlebar = document.getElementById('title-bar');

let isPrevMobile = null;
let isMobile = false;
let windowPane = document.getElementById('window-pane');

import {folders} from '/script/commands.js'

folders.children.forEach((folder, i) => {
  generateFolderLink(folder);
});

close.onclick = () => {
    windowBox.classList.add('hide')
    logo.classList.remove('logo');
    logo.classList.add('lion');
    bubble.classList.remove('hide');
};

function mobileViewToggle() {
    homebutton.onclick = () => {
        windowBox.classList.add('hide');
        desktop.classList.remove('hide');
    }
    isMobile = false;
    const style = window.getComputedStyle(homebutton)
    if (style.getPropertyValue('display') === 'block') {
        isMobile = true;
    }
    if(isPrevMobile === isMobile){return;}
    // now i can use is_mobile to run javascript conditionally
    isPrevMobile = isMobile;
    if (isMobile == true) {
        windowBox.classList.add('hide');
        desktop.classList.remove('hide');
        logo.classList.add('hide');
        bubble.classList.add('hide');
    } else {
        logo.classList.remove('hide');
        desktop.classList.remove('hide');
        titlebar.classList.remove('hide');

        if(windowBox.classList.contains('hide')) {
          logo.classList.remove('logo');
          logo.classList.add('lion');
          bubble.classList.remove('hide');
        }
        windowBox.style.width = "70%";
        windowBox.style.height = "80%";
    }
}

function generateFolderLink(folder) {
  const iconLabel = document.createElement('span');
  const folderDiv = document.createElement('div');
  const icon = document.createElement('span');

  //Assign classes
  iconLabel.classList.add('icon-label');
  folderDiv.classList.add('folder');
  icon.classList.add(folder.type);

  // Set Label name
  iconLabel.innerHTML = folder.name;
  // push icon and labels to folder
  folderDiv.append(icon, iconLabel);

  folderDiv.onclick = () => {
      if(isMobile) {
          desktop.classList.add('hide');
          titlebar.classList.add('hide');
          logo.classList.add('hide');
          // const st = window.getComputedStyle(windowBox)
          // st.setProperty("width","100%");
          windowBox.style.width = "98%";
          windowBox.style.height = "98%";
      }
      // windowPane.src = '/' + folder.name;
      /** The following is a workaround since neither chrome nor edge supports latest embed standard
       * We were unable to change embed src dynamically, so here we clone the embed element and replace its src before replacing the embed itself.
       */
      windowBox.classList.remove('hide');
      logo.classList.add('logo');
      logo.classList.remove('lion');
      bubble.classList.add('hide');
      const clone = windowPane.cloneNode(true);
      clone.setAttribute('src', folder.name);
      windowPane.parentNode.replaceChild(clone, windowPane)
      windowPane = clone;
      title.innerHTML = 'exeami: ' + folder.path;
  }
  desktop.appendChild(folderDiv);
}

document.onload = mobileViewToggle();
document.getElementsByTagName("BODY")[0].onresize = function() {mobileViewToggle()};
