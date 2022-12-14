'use strict'

function renderMemes() {
    const images = getImages()
    console.log(images)
    const strHtml = images.map(image =>{
        return `<img src="${image.url}" class="image" onclick="openEditor(this)"/>`
    })


    const elGrid = document.querySelector('.grid-container')
    elGrid.innerHTML = strHtml.join('')
}