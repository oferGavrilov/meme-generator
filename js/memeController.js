'use strict'
let gIsClickOnText = false
let gStartPos
const THOUCH_EVS = ['touchstart', 'touchmove', 'touchend']


function onEditorInit() {
    // setPositions()
    resizeCanvas()
    addListeners()
}


function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    let heightRatio = 1
    gElCanvas.height = gElCanvas.width * heightRatio
    // gElCanvas.width = window.innerWidth -60
    // gElCanvas.height = elContainer.offsetHeight
    // console.log("height:",gElCanvas.height, 'width:',gElCanvas.width)
    setPositions()
    renderMemes(gCurrImage)
}

function onAddText(text) {
    // let text = document.querySelector('.text-area').value
    addText(text)
    renderMemes(gCurrImage)
}

function setPositions() {
    const meme = getMeme()
    if(meme.lines.length > 1) {
        meme.lines[0].pos = {
            x: gElCanvas.width / 2,
            y: 50
        }
        meme.lines[1].pos = {
            x: gElCanvas.width / 2,
            y: gElCanvas.height - 50
        }
        meme.lines[2].pos = {
            x: gElCanvas.width / 2,
            y: gElCanvas.height /2
        }
    }
    else{
      setNewLine()
    }
}


//delete func
function setPos(idx) {
    if (idx === 0) return { x: gElCanvas.width / 2, y: 50 }
    else if (idx === 1) return { x: gElCanvas.width / 2, y: gElCanvas.height - 50 }
    else if (idx >= 2) return { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
}


function renderMemes(image) {
    gCtx.drawImage(image, 0, 0, gElCanvas.width, gElCanvas.height)


    const memes = getMeme()
    const lines = memes.lines
    console.log(lines)
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
    document.querySelector('.text-area').value = ""
    const memes = gMeme
    memes.selectedLineIdx += 1 

    if(memes.selectedLineIdx >= 3) setNewLine()
    console.log(memes.lines)
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

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}
function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (THOUCH_EVS.includes(ev.type)) {
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
    gIsClickOnText = false
    document.querySelector('.canvas-container').style.cursor = 'grab'
}

function onDown(ev) {
    const pos = getEvPos(ev)
    const isClicked = isLineClicked(pos)
    if (!isClicked) return

    document.querySelector('.canvas-container').style.cursor = 'grabbing'
    console.log('clicked')
    setSelectedLine(gMeme.lines.indexOf(isClicked))
    gStartPos = pos
    console.log('pos', pos)
    gIsClickOnText = true
    const diffX = pos.x - gStartPos.x
    const diffY = pos.y - gStartPos.y
    moveLine(diffX, diffY)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    renderMemes(gCurrImage)
}

function onMove(ev) {
    if (!gIsClickOnText || !gStartPos) return
    const pos = getEvPos(ev)
    // console.log(pos)
    const dY = pos.x - gStartPos.x
    const dX = pos.y - gStartPos.y
    moveLine(dX, dY)
    markLine(gMeme.lines[gMeme.selectedLineIdx])
    renderMemes(gCurrImage)
    gStartPos = pos
}

/////// tools ////////////

function onDeleteLine() {
    deleteLine()
    renderMemes(gCurrImage)
}

function onChangeStrokeColor(color){
    changeStrokeColor(color)
    gCtx.strokeStyle = color
    renderMemes(gCurrImage)
}
function onChangeFillColor(color){
    changeFillColor(color)
    gCtx.fillColor = color
    renderMemes(gCurrImage)
}

function onChangeTextSize(size) {
    const meme = getMeme()
    const memeSize = meme.lines[gMeme.selectedLineIdx].fontSize

    if(size === 'increase') changeTextSize(10)
    else if(memeSize > 10) changeTextSize(-10)
    renderMemes(gCurrImage)
}

function onSwitchLine() {
    switchLine()
    renderMemes(gCurrImage)
}

function onChangeAlignment(alignment){
    changeAlignment(alignment)
    renderMemes(gCurrImage)
}



function onDownload(link) {
    resetSelectedLines()
    renderMemes(gCurrImage)
    downloadMeme(link)
}