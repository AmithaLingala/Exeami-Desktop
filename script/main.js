const close = document.getElementById('close');
const maximize = document.getElementById('maximize');
const restore = document.getElementById('restore');
const desktop = document.getElementById('desktop');
const windowBox = document.getElementById('window-box');
const logo = document.getElementById('logo');
const bubble = document.getElementById('bubble');
const homebutton = document.getElementById('home-button');
const titlebar = document.getElementById('title-bar');
const loadIcon = document.getElementById('loadIcon');

let isPrevMobile = null;
let isMobile = false;
let windowPane = document.getElementById('window-pane');
import Paths from '/script/paths.js'

async function init() {
  const folders = await Paths.getInstance().getPaths();
  folders.children.forEach(folder => {
    if (!folder.hide) {
      generateFolderLink(folder);
    }
  });

  homebutton.onclick = () => {
    closeOperation(true);
  }

  close.onclick = () => {
    closeOperation(false);
  };

  maximize.onclick = () => {
    maximizeWindow();
  };

  restore.onclick = () => {
    restoreWindow();
  };
}
init();

function closeOperation() {
  let oDoc = windowPane.contentWindow || windowPane.contentDocument;
  const urlParams = new URLSearchParams(oDoc.location.search);
  const prev = urlParams.get('prev');
  if (prev && !isMobile) {
    const clone = windowPane.cloneNode(true);
    let src = prev.replace(/_/g, "");
    const prevFolder = urlParams.get('prevfolder');
    if (prevFolder) {
      src += '&prevfolder=' + prevFolder.replace(/_/g, "");
    }
    clone.setAttribute('src', src);
    windowPane.parentNode.replaceChild(clone, windowPane)
    windowPane = clone;
  } else {
    desktop.classList.remove('hide');
    windowBox.classList.add('hide');

    if (isMobile) {
      desktop.classList.remove('hide');
    } else {
      logo.classList.remove('hide');
      logo.classList.remove('logo');
      logo.classList.add('lion');
      bubble.classList.remove('hide');
    }
  }
}

function mobileViewToggle() {
  const style = window.getComputedStyle(homebutton)
  isMobile = style.getPropertyValue('display') === 'block';
  if (isPrevMobile === isMobile) { return; }
  // now i can use isMobile to run javascript conditionally
  isPrevMobile = isMobile;
  if (isMobile === true) {
    // windowBox.classList.add('hide');
    if (windowBox.classList.contains('hide')) {
      desktop.classList.remove('hide');
    } else {
      desktop.classList.add('hide');
    }
    titlebar.classList.add('hide');
    logo.classList.add('hide');
    bubble.classList.add('hide');
    maximizeWindow();
  } else {
    logo.classList.remove('hide');
    desktop.classList.remove('hide');
    titlebar.classList.remove('hide');

    if (windowBox.classList.contains('hide')) {
      logo.classList.remove('logo');
      logo.classList.add('lion');
      bubble.classList.remove('hide');
    }
    restoreWindow();
  }
}
function maximizeWindow() {
  if (windowBox.classList.contains('hide')) return;
  windowBox.classList.add('maximize');
  windowBox.classList.remove('restore');
  maximize.classList.add('hide');
  restore.classList.remove('hide');
  desktop.classList.add('hide');
  logo.classList.add('hide');
}

function restoreWindow() {
  windowBox.classList.add('restore');
  windowBox.classList.remove('maximize');
  maximize.classList.remove('hide');
  restore.classList.add('hide');
  desktop.classList.remove('hide');
  logo.classList.remove('hide');
}

function generateFolderLink(folder) {
  const iconLabel = document.createElement('span');
  const folderDiv = document.createElement('div');
  const icon = document.createElement('span');

  //Assign classes
  iconLabel.classList.add('icon-label');
  folderDiv.classList.add('folder');
  icon.classList.add(folder.type);
  if(folder.type==="application")
  icon.style.backgroundImage = `url(/icons/${folder.icon})`;
  // Set Label name
  iconLabel.innerHTML = folder.name;
  // push icon and labels to folder
  folderDiv.append(icon, iconLabel);

  folderDiv.onclick = () => {
    // windowPane.src = '/' + folder.name;
    /** The following is a workaround since neither chrome nor edge supports latest embed standard
     * We were unable to change embed src dynamically, so here we clone the embed element and replace its src before replacing the embed itself.
     */
    loadIcon.classList.remove('hide');
    windowBox.classList.remove('hide');
    logo.classList.add('logo');
    logo.classList.remove('lion');
    bubble.classList.add('hide');

    const clone = windowPane.cloneNode(true);
    clone.onload = function(){
      loadIcon.classList.add('hide');
    }
    if (folder.type == 'directory') {
      clone.setAttribute('src', '/folder?path=' + folder.path)
    } else {
      clone.setAttribute('src', folder.name);
    }
    windowPane.parentNode.replaceChild(clone, windowPane)
    windowPane = clone;
    if (isMobile) {
      desktop.classList.add('hide');
      titlebar.classList.add('hide');
      logo.classList.add('hide');
      maximizeWindow();
    }
    else {
      restoreWindow();
    }
  }
  desktop.appendChild(folderDiv);
}

document.onload = mobileViewToggle();
document.getElementsByTagName("BODY")[0].onresize = function () { mobileViewToggle() };
