'use strict'

let gFilterBy

let gKeywords = ['Celebrity', 'Animal' , 'Kids' , 'Funny' , 'Men']
let gStickers = ['😂','😭','💣','😈','👱‍♂️']

let gImgs =[
    {
        id:1,
        url:'img/1.jpg',
        keywords:['celebrity']
    },
    {
        id:2,
        url:'img/2.jpg',
        keywords:['animal']
    },
    {
        id:3,
        url:'img/3.jpg',
        keywords:['animal', 'kids']
    },
    {
        id:4,
        url:'img/4.jpg',
        keywords:['animal']
    },
    {
        id:5,
        url:'img/5.jpg',
        keywords:['kids']
    },
    {
        id:6,
        url:'img/6.jpg',
        keywords:['funny']
    },
    {
        id:7,
        url:'img/7.jpg',
        keywords:['kids']
    },
    {
        id:8,
        url:'img/8.jpg',
        keywords:['funny']
    },
    {
        id:9,
        url:'img/9.jpg',
        keywords:['kids']
    },
    {
        id:10,
        url:'img/10.jpg',
        keywords:['funny', 'celebrity']
    },
    {
        id:11,
        url:'img/11.jpg',
        keywords:['funny' , 'men']
    },
    {
        id:12,
        url:'img/12.jpg',
        keywords:['funny', 'celebrity']
    },
    {
        id:13,
        url:'img/13.jpg',
        keywords:['men']
    },
    {
        id:14,
        url:'img/14.jpg',
        keywords:['men']
    },
    {
        id:15,
        url:'img/15.jpg',
        keywords:['men']
    },
    {
        id:16,
        url:'img/16.jpg',
        keywords:['funny' ,'men']
    },
    {
        id:17,
        url:'img/17.jpg',
        keywords:['celebrity']
    },
    {
        id:18,
        url:'img/18.jpg',
        keywords:['funny']
    },
]

// update the filter key 
function filterImages(searchKey) {
    gFilterBy = searchKey.toLowerCase()
}

// return images to the gallery, and return by  filter key if it exists
function getImages() {
    if(gFilterBy){
        let filteredImages = []
        gImgs.forEach(image =>{
            return image.keywords.filter(keywords=>{
                if(keywords.includes(gFilterBy)){
                    filteredImages.push(image)
                }
            })
        })
        return filteredImages
    }
    return gImgs
}


// function loadImgFromInput(ev) {
//     const reader = new FileReader()
//     reader.onload = (event) => {
//         let img = new Image()
//         img.src = event.target.result
//         img.onload = () => onEditorInit(img)
//         console.log(img)
//     }
//     reader.readAsDataURL(ev.target.files[0])
// }


//this function increase tags font size by clicking on them
function sizeUpKeyword(elKeyword) {
    let key = elKeyword.children[0]
    let style = window.getComputedStyle(key,null).getPropertyValue('font-size')
    let currentSize = parseFloat(style)
    key.style.fontSize = (currentSize + 2 ) + 'px'
}

//this function clear filter by click on 'All' filter tag
function clearFilter() {
    gFilterBy = null
}

//returns stickers
function getStickers() {
    return gStickers
}
// returns keywords
function getKeywords() {
    return gKeywords
}