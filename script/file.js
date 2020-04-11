const content = document.getElementById('content');
const urlParams = new URLSearchParams(window.location.search);
const path = urlParams.get('path');
const scale = 1;

function renderPage(pdf, pageNumber, canvas) {
    pdf.getPage(pageNumber).then(function(page) {
        const viewport = page.getViewport({scale});
        canvas.height = viewport.height;
        canvas.width = viewport.width;          
        page.render({canvasContext: canvas.getContext('2d'), viewport: viewport});
    });
}

if(!path.endsWith('pdf')) {
    const clone = content.cloneNode(true);
    clone.setAttribute('src', path);
    content.parentElement.replaceChild(clone, content);
    content = clone;
} else {
    const viewer = document.getElementById('pdf-content');
    viewer.classList.remove('hide');
    content.classList.add('hide');

    pdfjsLib.getDocument(path).promise.then(function(pdf) {
        for(let page = 1; page <= pdf.numPages; page++) {
          let canvas = document.createElement("canvas");    
          canvas.className = 'pdf-page-canvas';         
          viewer.appendChild(canvas);            
          renderPage(pdf, page, canvas);
        }
    });
}