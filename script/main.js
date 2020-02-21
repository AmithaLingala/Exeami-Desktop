const title = document.getElementById('title');
const windowPane = document.getElementById('window-pane');
const desktop = document.getElementById('desktop');

let folders = [];
fetch("/data/folders.json")
    .then(response => response.json())
    .then(json => {
        folders = json.folders;
        generateFolderLinks();
    });

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
                windowPane.src = '/' + folder.name;
                title.innerHTML = 'exeami: ' + folder.path;
            } else {
                windowPane.src = '/' + folder.name;
                title.innerHTML = 'exeami: ' + folder.path;
            }
        }
        desktop.appendChild(folderDiv);
    }
}
