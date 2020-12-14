![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-fetch)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-fetch/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-fetch?branch=master)
![npm](https://img.shields.io/npm/dm/cp-fetch)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/cp-fetch)
![David](https://img.shields.io/david/DigitalBrainJS/c-fetch)

## SYNOPSIS :sparkles:

cpFetch is a simple wrapper around `fetch` with cancelable promise ([c-promise2](https://www.npmjs.com/package/c-promise2)). 
This lib can be used for both backend and frontend development, platform specific fetch API is provided by 
[cross-fetch package](https://www.npmjs.com/package/cross-fetch).

## Why :question:
It's good to have the ability to cancel fetch requests automatically when the related promise is canceling.
Using powerful of a promise with cancelation feature lets you automatically manage fetch request cycle, handling timeouts,
abort the related request when you use concurrent requests.  

## Features / Advantages
- browser & node.js support
- timeouts
- cancellation (rejecting promise chain & aborting the related network request)
- returns [CPromise](https://www.npmjs.com/package/c-promise2) instead of native
- automatically aborting other requests, passed to the CPromise.all, if one fails.
- automatically aborting other requests, passed to the CPromise.race, if one of them resolves or fails.

## Installation :hammer:

```bash
$ npm install cp-fetch
```

```bash
$ yarn add cp-fetch
```

````javascript
// cross-platform version
const cpFetch= require('cpFetch'); 

// version that uses the global fetch API, instead of cross-fetch ponyfill 
// (for modern browsers only or in case you're using third-party polyfill)
const cpFetch= require('cpFetch/lib/native');
````

#### CDN bundle
Ready for use prebuilt UMD bundles for browser with all dependencies inside.
- [production UMD cross-platform bundle with fetch ponyfill](http://unpkg.com/cp-fetch/dist/cp-fetch.umd.js) ([minified](https://unpkg.com/cp-fetch/dist/cp-fetch.umd.min.js) ~32KB)
- [production UMD bundle](http://unpkg.com/cp-fetch/dist/native/cp-fetch.umd.js) ([minified](http://unpkg.com/cp-fetch/dist/native/cp-fetch.umd.min.js) ~25KB)

These module bundles are only suitable to load as a script directly from the html page. 
If you're using some module bunlder like `webpack` or `rollup`, 
please import cjs module to avoid potential duplications in your project dependencies tree.

Global module export is `cpFetch`.

## Usage examples

#### Live Example

[Live browser example](https://codesandbox.io/s/ancient-glade-1wsnj)

#### Abortable fetch with timeout

A simple example:
````javascript
const cpFetch= require('cp-fetch');
const url= 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=5s';

const chain = cpFetch(url, {timeout: 10000})
    .then(response => response.json())
    .then(data => console.log(`Done: `, data), err => console.log(`Error: `, err))

setTimeout(()=> chain.cancel(), 1000); // abort the request after 1000ms 

// you able to call cancel() at any time to cancel the entire chain at any stage
// Take into account the related network request will also be aborted
````

The same using generators as async function:

````javascript
const cpFetch= require('cp-fetch');
const CPromise= require('c-promise2');
const url= 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=5s';

const chain= CPromise.from(function*(){
    try{
        const response= yield cpFetch(url, {timeout: 5000});
        console.log(`Done: `, yield response.json())
    }catch(err){
        console.log(`Error: `, err)
    }   
});

 setTimeout(()=> chain.cancel(), 1000); // abort the request after 1000ms 
````

#### Abortable concurrent requests

````javascript
const cpFetch= require('cp-fetch');
const CPromise = require('c-promise2');

const chain= CPromise.race([
    cpFetch("https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=3s"),
    cpFetch("https://run.mocky.io/v3/30a97b24-ed0e-46e8-9f78-8f954aead2f8?mocky-delay=5s")
]).timeout(10000).then((response)=> {
    console.log(`Result :`, response.data);
}, function (err) {
    console.warn(`We got an error: ${err}`);
});

// the slower request will be aborted

// setTimeout(()=> chain.cancel(), 1000); // abort the request after 1000ms 
````

## API Reference

The package exports a wrapped version of the [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) function.

`cFetch(url, {timeout, ...nativeFetchOptions}): CPromise`

Options:

`timeout`- the timeout before the promise and related request will be rejected/aborted.

`...nativeFetchOptions`- other native options of the fetch function.

Learn more about [CPromise features](https://www.npmjs.com/package/c-promise2) 

## Related projects

- [cp-axios](https://www.npmjs.com/package/cp-axios) - a simple axios wrapper that provides an advanced cancellation api 
- [c-promise2](https://www.npmjs.com/package/c-promise2) - promise with cancellation and progress capturing support 

## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

