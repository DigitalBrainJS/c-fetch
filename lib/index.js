const fetch= require('cross-fetch');
const CPromise= require('c-promise2');

/**
 * Make cancelable request
 * @param {String} url
 * @param {Object} [options]
 * @return {CPromise}
 */

function cFetch(url, options= {}) {
    const {timeout, ...fetchOptions}= options;
    return new CPromise((resolve, reject, {signal}) => {
        fetch(url, {...fetchOptions, signal}).then(resolve, reject)
    }, timeout)
}

module.exports= cFetch;
