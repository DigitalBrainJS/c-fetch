![Travis (.com)](https://img.shields.io/travis/com/DigitalBrainJS/c-fetch)
[![Coverage Status](https://coveralls.io/repos/github/DigitalBrainJS/c-fetch/badge.svg?branch=master)](https://coveralls.io/github/DigitalBrainJS/c-fetch?branch=master)
![npm](https://img.shields.io/npm/dm/c-fetch)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/c-fetch)
![David](https://img.shields.io/david/DigitalBrainJS/c-fetch)

## SYNOPSIS :sparkles:

cFetch is a simple wrapper around fetch using cancelable promise ([CPromise](https://www.npmjs.com/package/c-promise2)). 
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
$ npm install c-fetch
```

```bash
$ yarn add c-fetch
```

#### CDN bundle

- [production UMD bundle](https://unpkg.com/c-fetch) (or [minified](https://unpkg.com/c-fetch/dist/c-fetch.umd.min.js) ~31KB)

## Usage examples

#### Live Example

[Live browser example](https://codesandbox.io/s/ancient-glade-1wsnj)

#### Abortable fetch with timeout

A simple example:
````javascript
const cFetch= require('c-fetch');
const url= 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=5s';

const chain = cFetch(url, {timeout: 10000})
    .then(response => response.json())
    .then(data => console.log(`Done: `, data), err => console.log(`Error: `, err))

setTimeout(()=> chain.cancel(), 1000); // abort the request after 1000ms 

// you able to call cancel() at any time to cancel the entire chain at any stage
// Take into account the related network request will also be aborted
````

The same using generators as async function:

````javascript
const cFetch= require('c-fetch');
const CPromise= require('c-promise2');
const url= 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=5s';

const chain= CPromise.from(function*(){
    try{
        const response= yield cFetch(url, {timeout: 5000});
        console.log(`Done: `, yield response.json())
    }catch(err){
        console.log(`Error: `, err)
    }   
});

 setTimeout(()=> chain.cancel(), 1000); // abort the request after 1000ms 
````

#### Abortable concurrent requests

````javascript
const cFetch= require('c-fetch');
const CPromise = require('c-promise2');

const chain= CPromise.race([
    cFetch("https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=3s"),
    cFetch("https://run.mocky.io/v3/30a97b24-ed0e-46e8-9f78-8f954aead2f8?mocky-delay=5s")
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
## License

The MIT License Copyright (c) 2020 Dmitriy Mozgovoy robotshara@gmail.com

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

