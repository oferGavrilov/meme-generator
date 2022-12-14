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
            fontFamily: 'arial'
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
            fontFamily: 'arial'
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
            fontFamily: 'arial'
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
    console.log(gMeme.lines[gMeme.selectedLineIdx].text)
}

function getMeme() {
    return gMeme
}

function markLine(line) {
    console.log(line)
    const lineWidth = gCtx.measureText(line.text).width + line.fontSize 
    const lineHeight = line.fontSize
    console.log('lineWidth', lineWidth, 'lineHeight', lineHeight)

    gCtx.strokeStyle = 'lightblue'
    gCtx.strokeRect(line.pos.x - lineWidth/2, line.pos.y - lineHeight /2, lineWidth, lineHeight)
}

function setNewLine(text = 'new line') {
    document.querySelector('.text-area').value = ""

    // const pos = gMeme.lines[gMeme.selectedLineIdx].pos
    gMeme.selectedLineIdx += 1
    const pos = setPos(gMeme.selectedLineIdx)
    console.log('setPos', pos)
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