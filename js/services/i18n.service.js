'use strict'

let gTrans = {
    'gallery' : {
        en : 'Gallery',
        he : 'גלריה'
    },
    'memes' : {
        en : 'Memes',
        he : 'ממים'
    },
    'lang' : {
        en : 'עברית',
        he : 'English' 
    },
    'search' : {
        en : 'Search',
        he : 'חיפוש'
    },
    'funny' : {
        en : 'Funny',
        he : 'מצחיק'
    },
    'animal' : {
        en : 'Animal',
        he : 'חיות'
    },
    'men' : {
        en : 'Men',
        he : 'גברים'
    },
    'kids' : {
        en : 'Kids',
        he : 'ילדים'
    },
    'celebrity' :{
        en:'Celebrity',
        he:'סלבים',
    },
    'add-text-here' : {
        en : 'Add Text Here',
        he : 'הוסף טקסט כאן'
    },
    'share' : {
        en : 'Share',
        he : 'שתף'
    },
    'download' : {
        en : 'Download',
        he : 'הורדה'
    },
    'im-flexible' : {
        en: `I'm Flexible`,
        he:'אני גמיש'
    },
    'about':{
        en:'About',
        he:'אודות',
    },
    'saved-memes':{
        en:'Saved memes',
        he:'ממים שמורים',
    },
    'all': {
        en:'All',
        he:'הכל'
    },
    'save':{
        en:'Save',
        he:'שמור'
    },
    'no-saved-memes':{
        en:'No saved memes yet ...',
        he:'אין ממים שמורים בנתיים ...'
    },
    'text-line': {
        en:'Text Line',
        he:'שורת חיפוש',
    }

}

let gCurrLang = 'en';

function getTrans(transKey) {
    var keyTrans = gTrans[transKey]
    if (!keyTrans) return 'UNKNOWN'
    var txt = keyTrans[gCurrLang];
    if (!txt) return keyTrans.en
    return txt
}
function setLang() {
    if(gCurrLang === 'en'){
        gCurrLang = 'he';
        return;
    } 
    if(gCurrLang === 'he') gCurrLang = 'en';
}