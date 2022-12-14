'use strict'


function onAddText(text) {
    // let text = document.querySelector('.text-area').value
    console.log(text)
    addText(text)

    renderMemes(gCurrImage)



}

function setPositions(lineIdx) {
    const meme = getMeme()
    meme.lines[0].pos = {
        x: gElCanvas.width / 2,
        y: 50
    }
    meme.lines[1].pos = {
        x: gElCanvas.width / 2,
        y: gElCanvas.height - 50
    }
}

function setPos(idx) {
    if(idx === 0) return {x:gElCanvas.width /2 , y:50}
    else if(idx === 1) return {x:gElCanvas.width / 2, y:gElCanvas.height-50}
    else if(idx >= 2) return {x:gElCanvas.width /2, y:gElCanvas.height/2}
}


function renderMemes(image) {
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

    // setPositions()


    const memes = getMeme()
    console.log(memes)
    const lines = memes.lines
    lines.forEach(line => makeLineText(line))
    markLine(gMeme.lines[gMeme.selectedLineIdx])
}


function makeLineText(line) {
    gCtx.lineWidth = 2
    gCtx.strokeStyle = line.strokeColor
    gCtx.fillStyle = line.fillColor
    gCtx.font = `${line.fontSize}px ${line.fontFamily}`
    gCtx.textAlign = line.textAlign
    gCtx.textBaseline = 'middle'
    gCtx.fillText(line.text, line.pos.x, line.pos.y)
    gCtx.strokeText(line.text, line.pos.x, line.pos.y)
}

function onSetNewLine() {
    setNewLine()
}



//place text on the top of the canvas
//size the canvas fairly
//move the text
