'use strict'


let gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [ // top line
        {
            pos: {
                x: 0,
                y: 0,
            },
            text: 'random',
            fillColor: 'white',
            strokeColor: 'black',
            textAlign: 'center',
            fontSize: 50,
            fontFamily: 'arial',
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
            fontSize: 50,
            fontFamily: 'arial',
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
            fontSize: 50,
            fontFamily: 'arial',
            isSelected: false
        },
    ]
}

function setSelectedImgID(id) {
    gMeme.selectedImgId = id
}

// gCtx.lineWidth = 2
//     gCtx.strokeStyle = 'black'
//     gCtx.fillStyle = 'white'
//     gCtx.font = '50px arial'
//     gCtx.textAlign = 'center'
//     gCtx.textBaseline = 'middle'

function addText(text) {
    gMeme.lines[gMeme.selectedLineIdx].text = text
}

function getMeme() {
    return gMeme
}

function markLine(line) {
    const lineWidth = gCtx.measureText(line.text).width + line.fontSize
    const lineHeight = line.fontSize

    gCtx.strokeStyle = 'lightblue'
    gCtx.strokeRect(line.pos.x - lineWidth / 2, line.pos.y - lineHeight / 2, lineWidth, lineHeight)
}

function setNewLine(text = 'new line') {
    document.querySelector('.text-area').value = ""

    // const pos = gMeme.lines[gMeme.selectedLineIdx].pos
    gMeme.selectedLineIdx += 1
    const pos = setPos(gMeme.selectedLineIdx)
    const line = {
        text,
        fontSize: 50,
        textAlign: 'center',
        fillColor: 'white',
        strokeColor: 'black',
        pos: {
            x: pos.x,
            y: pos.y,
        },
        fontFamily: 'arial',
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

function moveLine(dx, dy) {
    console.log(dx, dy)
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dy
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dx
}


function setSelectedLine(idx) {
    gMeme.lines[idx].isSelected = true
    gMeme.selectedLineIdx = idx
}

function deleteLine() {
    const lineIdx = gMeme.selectedLineIdx
    console.log(lineIdx)
    if(lineIdx >= 0) {
        gMeme.lines.splice(lineIdx , 1)
    }
    console.log(lineIdx)
}