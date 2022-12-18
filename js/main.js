'use strict'
// set global variables that keeps values of the canvas properties and the current image
let gElCanvas
let gCtx
let gCurrImage
let gSavedMemes = []

// this function start after the loading of the gallery page
function onInit() {
    gElCanvas = document.querySelector('#my-canvas')//change location!
    gCtx = gElCanvas.getContext('2d')

    renderGallery()
    renderKeywords()
}

// that function get images from the service and render them into the gallery
function renderGallery() {
    const images = getImages()
    const strUploadBtn = `<label class="image uploadImg" onchange="onImgInput(event)"><input name="uploadimg" type="file" /><img src="img/upload.png" /> </label>`
    const strHtml = images.map(image => {
        return `<img src="${image.url}" id="${image.url}" class="image" onclick="openEditor(this , '${image.id}')"/>`
    })
    const elGrid = document.querySelector('.grid-container')
    elGrid.innerHTML = strUploadBtn + strHtml.join('')
}


function onImgInput(ev) {
    loadImgFromInput(ev, setUploadedImage)
}

function renderKeywords() {
    const keywords = getKeywords()
    console.log(keywords)
    let strHtmls = keywords.map(keyword => {
        return `<li class="tag ${keyword}" data-trans="${keyword.toLowerCase()}" onclick="onFilterImages('${keyword}'); onSizeUpKeyword(this)"><a href="#" class="${keyword}">${keyword}</a></li>`
    })
    document.querySelector('.filter-tags').innerHTML += strHtmls.join('')
}

function onSizeUpKeyword(elKeyword) {
    sizeUpKeyword(elKeyword)
    // renderKeywords()

}

function onClearFilter() {
    clearFilter()
    renderGallery()
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
    if (!savedMemes) {
        let strHtmls = `<h1 data-trans="no-saved-memes"> No saved memes yet ... </h1>`
        document.querySelector('.saved-memes').innerHTML = strHtmls
    }
    else {
        let strHtmls = savedMemes.map((meme, idx) => {
            return `
            <img class="image" src="${meme.url}" onclick="editMeme(${idx})" />
            `
        })
        document.querySelector('.saved-memes').innerHTML = strHtmls.join('')
    }
}

function editMeme(idx) {
    const savedMemes = getFromLocalStorage()

    gEditSavedMeme = true
    gMeme.lines = savedMemes[idx].data.lines

    const url = savedMemes[idx].data.selectedImgId
    const image = document.getElementById(`img/${url}.jpg`)
    openEditor(image, url)

}


function onFilterImages(searchKey) {
    filterImages(searchKey)
    renderGallery()
}





function onRandomMeme() {
    const images = getImages()
    let randomIdx = getRandomIntInclusive(1, images.length)
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
    document.querySelector('.flexible-btn').classList.add('hidden')

    renderSavedMemes()
}
function onGalleryPage() {
    document.querySelector('.meme-editor').classList.add('hidden')
    document.querySelector('.search-area').classList.remove('hidden')
    document.querySelector('.grid-container').classList.remove('hidden')
    document.querySelector('.saved-memes-container').classList.add('hidden')
    document.querySelector('.flexible-btn').classList.remove('hidden')
    clearCanvas()
    gEditSavedMeme = false
}

function onSetLang() {
    setLang()
    if (gCurrLang === 'he') document.body.classList.add('rtl')
    else document.body.classList.remove('rtl')
    doTrans()
}
function doTrans() {
    var els = document.querySelectorAll('[data-trans]')
    els.forEach(function (el) {
        var txt = getTrans(el.dataset.trans)
        if (el.nodeName === 'INPUT') el.placeholder = txt
        else el.innerText = txt
    })
}
