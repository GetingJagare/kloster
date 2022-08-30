export default function () {
}

export function hasElemClass(elem, className) {
    return elem.className.indexOf(className) > -1;
}

export function deleteClassName(elem, className) {
    const regExp = new RegExp('\\s*' + className + '\\s*');
    elem.className = elem.className.replace(regExp, '');
}
