const title = document.getElementById('title');
const close = document.getElementById('close');
const desktop = document.getElementById('desktop');
const windowBox = document.getElementById('window-box');
const logo = document.getElementById('logo');
const bubble = document.getElementById('bubble');

let windowPane = document.getElementById('window-pane');

let folders = [];

fetch("/data/folders.json")
    .then(response => response.json())
    .then(json => {
        folders = json.folders;
        generateFolderLinks();
    });
close.onclick = () => {
  windowBox.classList.add('hide')
  logo.classList.remove('logo');
  logo.classList.add('lion');
  bubble.classList.remove('hide');
};

function generateFolderLinks() {
    for (let folder of folders) {
        // Create a Folder div for every path in folders.json
        const iconLabel = document.createElement('span');
        const folderDiv = document.createElement('div');
        const icon = document.createElement('span');

        //Assign classes
        iconLabel.classList.add('icon-label');
        folderDiv.classList.add('folder');
        icon.classList.add('icon');

        // Set Label name
        iconLabel.innerHTML = folder.name;
        // push icon and labels to folder
        folderDiv.append(icon, iconLabel);

        folderDiv.onclick = () => {
            if (folder.isWindow) {
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
            } else {
                // Not implimented yet
            }
        }
        desktop.appendChild(folderDiv);
    }
}
