const {CPromise} = require('c-promise2');

/**
 * @typedef {CPromiseOptions} CPFetchOptions
 */

/**
 * Makes a cancelable fetch request wrapped with CPromise
 * @typedef {Function} cpFetch
 * @param {String} url
 * @param {CPFetchOptions} [options]
 * @return {CPromise}
 */

/**
 * @name init
 * @param {Function} fetch
 * @returns {cpFetch}
 */
module.exports = function init(fetch){
    return function cpFetch(url, options = {}) {
        const {timeout, ...fetchOptions} = options;
        return new CPromise((resolve, reject, {signal}) => {
            fetch(url, {...fetchOptions, signal}).then(resolve, reject)
        }, {timeout, nativeController: true})
    }
};
