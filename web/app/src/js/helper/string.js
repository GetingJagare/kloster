/**
 * @param {string} str
 * @returns {string}
 */
export const htmlDecode = str => str.replace(/&quot;/g, '"').replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>').replace(/&amp;/g, '&');
