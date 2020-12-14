const fetchPonyfill = require('cross-fetch');
/**
 * @exports {cpFetch}
 */
module.exports = require('../src/cp-fetch')(fetchPonyfill)


