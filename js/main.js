'use strict'

let gElCanvas
let gCtx

const THOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    console.log('onInit')
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElCanvas.style.backgroundColor = 'blue'

    resizeCanvas()
    renderMemes()
}

function resizeCanvas() {
    console.dir(gElCanvas)
    const elContainer = document.querySelector('.canvas-container')
    // gElCanvas.width = elContainer.width
    // gElCanvas.height = offsetHeight.height
}









function openEditor(imageUrl) {
    document.querySelector('.search-area').classList.add('hidden')
    document.querySelector('.grid-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    
    
    console.log(imageUrl)
    drawImg(imageUrl)
}

function closeEditor() {
    document.querySelector('.search-area').classList.remove('hidden')
    document.querySelector('.grid-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
}

function drawImg(image) {
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)
}