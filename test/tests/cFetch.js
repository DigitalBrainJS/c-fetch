const assert= require('assert');
const {CPromise}= require('c-promise2');
const cFetch= require('../../lib/index');

describe('cFetch', function(){
    it('should fetch the url', async function () {
       const url= 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=0s';

       return cFetch(url, {timeout: 1000})
            .then(response => response.json())
            .then(data => console.log(`Done: `, data), err => console.log(`Error: `, err))
    })

    it('should handle timeout', async function () {
        const url = 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=2s';

        return cFetch(url, {timeout: 500})
            .then(response => response.json())
            .then(() => {
                assert.fail('does not reject');
            }, err => {
                if (!CPromise.isCanceledError(err)) {
                    assert.fail('error is not an CanceledError instance');
                }

                assert.equal(err.message, 'timeout');
            })
    })


    it('should support request cancelation', async function () {
        const url = 'https://run.mocky.io/v3/753aa609-65ae-4109-8f83-9cfe365290f0?mocky-delay=2s';

        const chain= cFetch(url, {timeout: 1000})
            .then(response => response.json())
            .then(() => {
                assert.fail('does not reject');
            }, err => {
                if (!CPromise.isCanceledError(err)) {
                    assert.fail('error is not an CanceledError instance');
                }

                assert.equal(err.message, 'canceled');
            });

        setTimeout(()=>{
            chain.cancel();
        }, 500);

        return chain;
    })
})
