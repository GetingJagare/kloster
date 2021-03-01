const fs = require('fs');

const langPath = `${__dirname}/translations`;
const defaultLang = 'ru';
const t = require(`${__dirname}/src/helpers/t`);

const defaultPageOptions = {
    entry: 'src/main.js',
    template: 'public/index.html',
    t,
    lang: defaultLang
};

let pages = {
    main_ru: Object.assign({}, defaultPageOptions, {filename: 'index.html'})
};

fs.readdirSync(langPath).forEach(file => {
    //let langTranslations = require(langPath + '/' + file);
    let langName = file.match(/^(.+)\..+$/)[1];

    let langDir = __dirname + '/' + langName;

    if (!fs.existsSync(langDir)) {
        return phrase;
    }

    pages[`main_${langName}`] = Object.assign({}, defaultPageOptions, {
        filename: `${langName}/index.html`,
        lang: langName
    });
});

module.exports = {
    pages
};
