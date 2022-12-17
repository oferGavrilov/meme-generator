'use strict'

const MEME_STORAGE_KEY = 'meme_db'

let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [ // top line
        {
            pos: {
                x: 0,
                y: 0,
            },
            text: 'Type',
            fillColor: 'white',
            strokeColor: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'impact',
            isSelected: false
        },
        {// bottom line
            pos: {
                x: 0,
                y: 0,
            },
            text: '',
            fillColor: 'white',
            strokeColor: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'impact',
            isSelected: false
        },
        {// middle line
            pos: {
                x: 0,
                y: 0,
            },
            text: '',
            fillColor: 'white',
            strokeColor: 'black',
            textAlign: 'center',
            fontSize: 30,
            fontFamily: 'impact',
            isSelected: false
        },
    ]
}

function clearCanvas() {
    gMeme.lines.forEach(line=> line.text = '')
}

function setSelectedImgID(id) {
    gMeme.selectedImgId = id
}


function addText(text) {
    console.log(gMeme.lines)
    gMeme.lines[gMeme.selectedLineIdx].text = text
}

function addSticker(sticker) {
    gMeme.lines[gMeme.selectedLineIdx].text += sticker
}

function getMeme() {
    return gMeme
}

function markLine(line) {
    if (!line) return
    const lineWidth = gCtx.measureText(line.text).width + line.fontSize
    const lineHeight = line.fontSize

    gCtx.strokeStyle = 'lightblue'
    gCtx.strokeRect(line.pos.x - lineWidth / 2, line.pos.y - lineHeight / 2, lineWidth, lineHeight)
}

function setNewLine(text = 'new line') {
    document.querySelector('.text-area').value = ""
    gMeme.selectedLineIdx += 1
    const line = {
        text,
        fontSize: 30,
        textAlign: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        pos: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2,
        },
        fontFamily: 'impact',
    }
    gMeme.lines.push(line)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
    markLine(gMeme.lines[gMeme.selectedLineIdx])

}

///edit 
function isLineClicked(pos) {
    const clickedLine = gMeme.lines.find((line) => {
        if (
            Math.sqrt((pos.x - line.pos.x) ** 2 + (pos.y - line.pos.y) ** 2) <= gCtx.measureText(line.text).width / 2) {
            return line
        }
    })

    return clickedLine
}

// set new position in the model 
function moveLine(dx, dy) {
    console.log(dx, dy)
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

// set selected line on the model
function setSelectedLine(idx) {
    // resetSelectedLines()
    gMeme.lines[idx].isSelected = true
    gMeme.selectedLineIdx = idx
}

// update on the model - all lines are not selected
function resetSelectedLines() {
    gMeme.lines.forEach((_, idx) => gMeme.lines[idx].isSelected = false)
    gMeme.selectedLineIdx = -1
}

//edit // delete line on the model
function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx
    console.log(lineIdx)
    if (lineIdx >= 0) {
        gMeme.lines.splice(lineIdx, 1)
    } else {
        return
    }
    if (gMeme.lines.length) {
        gMeme.selectedLineIdx = lineIdx === 1 ? gMeme.selectedLineIdx - 1 : 0
        console.log(gMeme.selectedLineIdx)
        gMeme.lines[gMeme.selectedLineIdx].isSelected = true
    }
}

function changeStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}
function changeFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = color
}

function changeTextSize(size) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += size
}



function switchLine() {
    document.querySelector('.text-area').value = ""

    console.log(gMeme.lines)
    if (gMeme.selectedLineIdx >= 0) {
        if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
            gMeme.lines[gMeme.selectedLineIdx].isSelected = false
            gMeme.selectedLineIdx = 0
            gMeme.lines[gMeme.selectedLineIdx].isSelected = true
        } else {
            gMeme.lines[gMeme.selectedLineIdx].isSelected = false
            gMeme.selectedLineIdx++
            gMeme.lines[gMeme.selectedLineIdx].isSelected = true
        }
    } else {
        gMeme.selectedLineIdx = 0
        gMeme.lines[0].isSelected = true
    }
}

function changeAlignment(alignment) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    switch (alignment) {
        case 'start':
            line.pos.x = gElCanvas.width / 4
            break
        case 'end':
            line.pos.x = gElCanvas.width - gElCanvas.width / 4
            break
        case 'center':
            line.pos.x = gElCanvas.width / 2
            break
    }
}

function changeFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
}

function createLines() {
    for(let i = 0; i < 3; i++) {
        gMeme.lines.push({
            pos:{x:0,y:0},
            text:'',
            fillColor:'white',
            strokeColor:'black',
            textAlign: 'center',
            fontSize:30,
            fontFamily: 'impact',
            isSelected:false
        })
    }
    setPositions()
}

//edit
function saveMeme(meme) {
    let lines =  gMeme.lines
    console.log('meme: ', meme)
    let savedMemes = loadFromStorage(MEME_STORAGE_KEY)
    // console.log('savedMemes' , savedMemes)

    if(!savedMemes || savedMemes === null){
        savedMemes = [{meme:meme, lines:lines}]
        console.log('savedMemes' , savedMemes)
        saveToStorage(MEME_STORAGE_KEY,savedMemes)
        return
    }
    savedMemes.push({meme:meme, lines:lines})
    saveToStorage(MEME_STORAGE_KEY, savedMemes)
}

function getFromLocalStorage(){
    return loadFromStorage(MEME_STORAGE_KEY)
}