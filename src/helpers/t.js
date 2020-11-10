const htmlDecode = require('./html-decode');
const langPath = `@/translations`;
const defaultLang = 'ru';

module.exports = (phrase, isClient = false) => {
    phrase = htmlDecode(phrase);
    //return langTranslations && langTranslations[phrase] ? langTranslations[phrase] : phrase;
};