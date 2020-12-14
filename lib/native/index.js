/**
 * @exports {cpFetch}
 */
module.exports = require('../src/cp-fetch')(typeof fetch==='function'?
    fetch :
    (()=> {
        throw TypeError('The fetch API is not defined in the environment.' +
            ' Please, import the cp-fetch version with cross-fetch ponyfill or use some third-party polyfill')
    })())

