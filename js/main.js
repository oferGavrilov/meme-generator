'use strict'

let gElCanvas
let gCtx
let gCurrImage


function onInit() {
    console.log('onInit')
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElCanvas.style.backgroundColor = 'blue'

    resizeCanvas()
    renderGallery()
}

// in click on iamge top the view 
function renderGallery() {
    const images = getImages()
    console.log(images)
    const strHtml = images.map(image =>{
        return `<img src="${image.url}"class="image" onclick="openEditor(this , '${image.id}')"/>`
    })


    const elGrid = document.querySelector('.grid-container')
    elGrid.innerHTML = strHtml.join('')
}



function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    console.dir(elContainer)
    // gElCanvas.width = elContainer.offsetWidth
    // gElCanvas.height = elContainer.offsetHeight
    console.log(gElCanvas.width, gElCanvas.height)
}









function openEditor(imageUrl,imgId) {
    document.querySelector('.search-area').classList.add('hidden')
    document.querySelector('.grid-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    
    gCurrImage = imageUrl
    // console.log(imageUrl)
    onEditorInit()
    drawImg(imageUrl)
    setSelectedImgID(imgId)
}

function closeEditor() {
    document.querySelector('.search-area').classList.remove('hidden')
    document.querySelector('.grid-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
}

function drawImg(image) {
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
}