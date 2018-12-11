'use strict'

/**
 * Render function that renders data specified in the param
 * to the given target node. A templateID corresponding to
 * the appearance of the dom node should be passed as well as
 * an individual render function that renders an individual node.
 * 
 * @param {Array} data array of elements to render
 * @param {Node} target target node to append the results to
 * @param {String} templateID the id of the template to pass
 *                            to individual render function
 * @param {Function} renderFn callback function. Given:
 *                          - Data element
 *                          - HTML template
 *                          Should return the finished DOM node
 *                          populated by the data defined in the
 *                          data element.
 */
function render(data, target, templateID, renderFn) {
    const template = document.getElementById(templateID);
    if (data.constructor === Array) {
        data.forEach(el => {
            const result = renderFn(el, template);
            target.appendChild(result);
        });
    } else {
        const result = renderFn(data, template);
        target.appendChild(result);
    }
}

export { render };