'use strict'

let gElCanvas
let gCtx
let gCurrImage


function onInit() {
    gElCanvas = document.querySelector('#my-canvas')
    gCtx = gElCanvas.getContext('2d')
    // gElCanvas.style.backgroundColor = 'blue'

    // resizeCanvas()
    renderGallery()
}

// in click on iamge top the view 
function renderGallery() {
    const images = getImages()
    console.log(images)
    const strHtml = images.map(image => {
        return `<img src="${image.url}"class="image" onclick="openEditor(this , '${image.id}')"/>`
    })


    const elGrid = document.querySelector('.grid-container')
    elGrid.innerHTML = strHtml.join('')
}





function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function openEditor(imageUrl, imgId) {
    document.querySelector('.search-area').classList.add('hidden')
    document.querySelector('.grid-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')

    setPositions()
    gCurrImage = imageUrl
    // console.log(imageUrl)
    onEditorInit()
    drawImg(imageUrl)
    renderMemes(gCurrImage)
    setSelectedImgID(imgId)
}

function closeEditor() {
    document.querySelector('.search-area').classList.remove('hidden')
    document.querySelector('.grid-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.text-area').value = ""
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    clearCanvas()
}

function drawImg(image) {
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadMeme(link) {
    resetMarkLine()
    const data = gElCanvas.toDataURL()
    console.log(link)
    link.href = data
    link.download = 'my-meme.jpg'
}