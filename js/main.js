'use strict'
// set global variables that keeps values of the canvas properties and the current image
let gElCanvas
let gCtx
let gCurrImage

// this function start after the loading of the gallery page
function onInit() {
    gElCanvas = document.querySelector('#my-canvas')//change location!
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
}

// that function get images from the service and render them into the gallery
function renderGallery() {
    const images = getImages()
    console.log(images)
    const strHtml = images.map(image => {
        return `<img src="${image.url}" id="${image.url}" class="image" onclick="openEditor(this , '${image.id}')"/>`
    })

    const elGrid = document.querySelector('.grid-container')
    elGrid.innerHTML = strHtml.join('')
}

// this function activated when the user click on the menu and on the page to close menu
function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

// By select an image this function will hide the gallery and show the editor page
function openEditor(imageUrl, imgId) {
    document.querySelector('.search-area').classList.add('hidden')
    document.querySelector('.grid-container').classList.add('hidden')
    document.querySelector('.saved-memes-container').classList.add('hidden')
    document.querySelector('.meme-editor').classList.remove('hidden')
    gCurrImage = imageUrl // update the current image to the image the user selected

    setSelectedImgID(imgId) // defines the selected image on meme service
    onEditorInit() // start the meme Controller  javascript file 


    // drawImg(gCurrImage) // draw image on the canvas
    // renderMemes(gCurrImage)
}

// this function hides the editor page and shows the gallery
function closeEditor() {
    document.querySelector('.search-area').classList.remove('hidden')
    document.querySelector('.grid-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.text-area').value = "" // clear the text area input
    clearCanvas() // clear the text lines in the model meme service
}


function renderSavedMemes() {
    const savedMemes = getFromLocalStorage()
    console.log(savedMemes)
    if (!savedMemes) {
        let strHtmls = `<h1> No saved memes yet ... </h1>`
        document.querySelector('.saved-memes').innerHTML = strHtmls
    }
    else {
        let strHtmls = savedMemes.map(meme => {
            return `
            <img class="image" src="${meme.meme}" onclick="openEditor(this)" />
            `
        })
        document.querySelector('.saved-memes').innerHTML = strHtmls.join('')
    }
}


function onFilterImages(searchKey) {
    filterImages(searchKey)
    renderGallery()
}

//this function activate when the user click on download meme
function downloadMeme(link) {
    // resetSelectedLines()
    const data = gElCanvas.toDataURL()
    console.log(link)
    link.href = data
    link.download = 'my-meme.jpg'
}

function onRandomMeme() {
    const images = getImages()
    let randomIdx = getRandomIntInclusive(1, images.length)
    console.log(randomIdx)
    const imageUrl = document.getElementById(`img/${randomIdx}.jpg`)
    openEditor(imageUrl, randomIdx)
    makeRandomMeme()
}







/// pages ///
function onSavedMemesPage() {
    document.querySelector('.search-area').classList.add('hidden')
    document.querySelector('.grid-container').classList.add('hidden')
    document.querySelector('.saved-memes-container').classList.remove('hidden')
    document.querySelector('.meme-editor').classList.add('hidden')

    renderSavedMemes()
}
function onGalleryPage() {
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.search-area').classList.remove('hidden')
    document.querySelector('.grid-container').classList.remove('hidden')
    document.querySelector('.saved-memes-container').classList.add('hidden')
    clearCanvas()
}