const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');


async function purifyDOM(dom){
    const window = new JSDOM('').window;
    const DOMPurify = createDOMPurify(window);
    const clean = DOMPurify.sanitize(dom);
    const removed = DOMPurify.removed;
    let result = {
        cleanedDOM : clean,
        removedDOM : removed
    }
    return result;
}

module.exports = {purifyDOM}