import { Commands } from '/script/commands.js'
const commands = Commands.getInstance();
const backBtn = document.getElementById('back-btn');
const addressBar = document.getElementById('address-bar');
const content = document.getElementById('content');
const loadIcon = document.getElementById('loadIcon');


const urlParams = new URLSearchParams(window.location.search);
let path = urlParams.get('path');
const prev = urlParams.get('prevfolder');
console.log(prev);

if (!prev) {
  backBtn.classList.add('hide');
} else {
  backBtn.classList.remove('hide');  
}
backBtn.onclick = () => {
  if (prev) {
    window.location.href = prev.toString().replace(/_/g, "");
  }
}
async function renderFolders() {
  addressBar.value = (await commands.cd([path])).path;
  const folders = await commands.getFiles();
  folders.forEach(folder => {
    if (!folder.hide) {
      const iconLabel = document.createElement('span');
      const folderDiv = document.createElement('div');
      let icon = document.createElement('span');

      //Assign classes
      iconLabel.classList.add('icon-label');
      folderDiv.classList.add('folder');
      if (folder.type === 'image') {
        icon = document.createElement('img');
        icon.src = folder.path;
      }
      else if (folder.type === 'link') {
        icon = document.createElement('div');
        const img = document.createElement('div');
        img.style.backgroundImage = `url(${folder.icon})`;
        const text = document.createElement('span');
        text.innerHTML = folder.name;
        icon.append(img, text);
        folderDiv.classList.remove('folder');
        folderDiv.classList.add('card');
        content.classList.add('flex');
      } else {
        iconLabel.innerHTML = folder.name;
      }

      icon.classList.add(folder.type);

      // Set Label name
      
      // push icon and labels to folder
      folderDiv.append(icon);
      if(folder.type !== 'link') {
        folderDiv.append(iconLabel);
      }
      content.append(folderDiv);

      folderDiv.onclick = () => {
        loadIcon.classList.remove('hide');
        if (folder.type == 'directory') {
          location.href = `/folder?path=${folder.path}&prevfolder=_${location.href}_`;
        } else if (folder.type == 'link') {
          // console.log(`${path}?path=${folder.name}&prev=_${location.href}_`);
          location.href = `${path}?path=${folder.name}&prev=_${location.href}_&prevfolder=_${location.href}_`;
        } else {
          location.href = `/file/?path=${folder.path}&prev=_${location.href}_&prevfolder=_${location.href}_`;
        }
      }
    }
  });
}
renderFolders();
loadIcon.classList.add('hide');
