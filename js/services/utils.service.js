'use strict'

function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

function makeLorem(wordCount = 100) {
    const words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (wordCount > 0) {
        wordCount--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}

function getRandomText() {
    const texts = [
        {
            top:`There's no words to explain`,
            bottom:'THIS'
        },
        {
            top:'That moment when you realize',
            bottom:'HTML is not programming language'
        },
        {
            top:'Senior Dev: how did you fix that bug?',
            bottom:'Junior Dev: Commented the code'
        },
        {
            top:`It's called respect`,
            bottom:'Have some'
        }

    ]
    return texts[getRandomIntInclusive(0, texts.length - 1)]
}

function getRandomColor() {
    const colors= ['#8A51B0' , '#51B0A6' , '#89CD12', '#CD1312', '#BB12CD', '#12BACD', '#ffffff' , '#08191B', '#C2FE1F']
    return colors[getRandomIntInclusive(0, colors.length -1)]
}
