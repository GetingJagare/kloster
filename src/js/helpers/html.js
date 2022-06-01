export default function () {
}

/**
 * @param {string} str
 * @returns {string}
 */
export function decode(str = '')
{
    return str.replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
