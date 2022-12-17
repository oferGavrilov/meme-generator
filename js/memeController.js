'use strict'
let gIsClickOnText = false
let gStartPos

const THOUCH_EVS = ['touchstart', 'touchmove', 'touchend']

//this function activate when the user selected an image
function onEditorInit() {
    setPositions() // set positions on the canvas
    resizeCanvas() // resize the canvas by the screen size
    addListeners() // add events listeners - touch and mouse
    renderStickers()
}

// this function resize the canvas by the properties of canvas container
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    let heightRatio = 1
    gElCanvas.height = gElCanvas.width * heightRatio

    setPositions() // after each resize , set positions on the canvas
    renderMemes(gCurrImage) // after each resize , render image on the canvas
}

// this function activated when the user typing text
function onAddText(text) {
    addText(text) // executes a service function
    renderMemes(gCurrImage) // render image after every change 
}

// set positions on the canvas by top then bottom then middle 
function setPositions() {
    const meme = getMeme()
    if (meme.lines.length > 1) { //top
        meme.lines[0].pos = {
            x: gElCanvas.width / 2,
            y: 50
        }
        meme.lines[1].pos = { //bottom
            x: gElCanvas.width / 2,
            y: gElCanvas.height - 50
        }
        meme.lines[2].pos = { //middle
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        }
    }
    // else if(meme.lines.length <= 0) {   /// if the user delete all the lines this func will create new positions lines
    //     createLines()
    // }
}

// this function draw image , text lines and border lines on the canvas
function renderMemes(image) {
    console.log(gMeme.lines.length)
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)

    const memes = getMeme()
    const lines = memes.lines

    lines.forEach(line => makeLineText(line)) // render text
    markLine(gMeme.lines[gMeme.selectedLineIdx]) // render mark
}

// render text lines on the canvas
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

// move to the next line 
function onSetNewLine() {
    document.querySelector('.text-area').value = "" // clean input

    const memes = gMeme
    memes.selectedLineIdx += 1

    if (memes.selectedLineIdx >= 3) setNewLine() // if there no lines in the model create new one in the middle

    else if (memes.lines.length <= 0) { // if the user deleted all lines, create new lines and reset selected line
        resetSelectedLines()
        memes.selectedLineIdx = 0
        createLines()
    }
    renderMemes(gCurrImage)
}

//////////     listeners    ////////////
function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderMemes(gCurrImage)
    })
}

//add listeners for mouse events
function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}
// add listeners for touch events
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

// this function returns positions of mouse events and touch events
function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (THOUCH_EVS.includes(ev.type)) { /// recognize touch events
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop,
        }
    }
    return pos
}

function onUp() {
    document.querySelector('.canvas-container').style.cursor = 'grab'
    gIsClickOnText = false
}

function onDown(ev) {
    document.querySelector('.canvas-container').style.cursor = 'grabbing'

    const pos = getEvPos(ev) // get position
    const isClicked = isLineClicked(pos) // recognize position on line or not 
    if (!isClicked) return

    setSelectedLine(gMeme.lines.indexOf(isClicked)) // set selected line on the model
    document.querySelector('.text-area').value = gMeme.lines[gMeme.selectedLineIdx].text  // put selected line on the input area

    gStartPos = pos // update start position 
    gIsClickOnText = true // update global variable to be true

    const diffX = pos.x - gStartPos.x // calculate the distance between 
    const diffY = pos.y - gStartPos.y

    moveLine(diffX, diffY) // set positions in the model
    markLine(gMeme.lines[gMeme.selectedLineIdx]) // set selected line in the model
    renderMemes(gCurrImage) // render changes in the canvas view
}

function onMove(ev) {
    if (!gIsClickOnText || !gStartPos) return
    const pos = getEvPos(ev)
    // console.log(pos)
    const dX = pos.x - gStartPos.x
    const dY = pos.y - gStartPos.y
    moveLine(dX, dY)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    renderMemes(gCurrImage)
    gStartPos = pos
}

/////// tools ////////////

// delete line function
function onDeleteLine() {
    deleteLine()
    renderMemes(gCurrImage)
}

// change stroke color function
function onChangeStrokeColor(color) {
    changeStrokeColor(color)
    gCtx.strokeStyle = color
    renderMemes(gCurrImage)
}

// change fill color function
function onChangeFillColor(color) {
    changeFillColor(color)
    gCtx.fillColor = color
    renderMemes(gCurrImage)
}
// increase or decrease text size function
function onChangeTextSize(size) {
    const meme = getMeme()
    const memeSize = meme.lines[gMeme.selectedLineIdx].fontSize

    if (size === 'increase') changeTextSize(10)
    else if (memeSize > 10) changeTextSize(-10)
    renderMemes(gCurrImage)
}

// switch between lines function
function onSwitchLine() {
    switchLine()
    renderMemes(gCurrImage)
}

// change alignment function
function onChangeAlignment(alignment) {
    changeAlignment(alignment)
    renderMemes(gCurrImage)
}

// change font family function
function onChangeFontFamily(fontFamily) {
    changeFontFamily(fontFamily)
    renderMemes(gCurrImage)
}

// download meme
function onDownload(link) {
    resetSelectedLines() // clear selected lines on the model
    renderMemes(gCurrImage) // render image and clear selected lines on the canvas
    downloadMeme(link) // active function on the main javascript file
}

function onSave() {
    resetSelectedLines() // reset selected lines on the model
    renderMemes(gCurrImage)

    const savedMeme = gElCanvas.toDataURL('image/jpeg')
    saveMeme(savedMeme)
}

// random meme selection
function makeRandomMeme() {
    const meme = getMeme()
    const text = getRandomText()
    const size = getRandomIntInclusive(20, 35)

    console.log(getRandomColor())
    meme.lines[0].text = text.top
    meme.lines[0].strokeColor = getRandomColor()
    meme.lines[0].fillColor = getRandomColor()
    meme.lines[0].fontSize = size

    meme.lines[1].text = text.bottom
    meme.lines[1].strokeColor = getRandomColor()
    meme.lines[1].fillColor = getRandomColor()
    meme.lines[1].fontSize = size

    renderMemes(gCurrImage)
}

function renderStickers() {
    const stickers = getStickers()
    const strHtmls = stickers.map(sticker => {
        return `<div class="sticker" onclick="onSetSticker('${sticker}')">${sticker}</div>`
    })
    document.querySelector('.sticker-container').innerHTML = strHtmls.join('')
    console.log(stickers)
}

function onSetSticker(sticker) {
    console.log(sticker)
    addSticker(sticker)
    renderMemes(gCurrImage)
}