'use strict'

let gFilterBy

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
    gFilterBy = searchKey
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

function getStickers() {
    return gStickers
}