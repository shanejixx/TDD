import fetchDataCallback from "./fetchDataCallback"
import fetchDataPromise from "./fetchDataPromise"

// When you have code that runs asynchronously, Jest needs to know when the code it is testing has completed, before it can move on to another test.

// Jest has several ways to handle this.



// Callbacks


// The problem is that the test will complete as soon as fetchData completes, before ever calling the callback.
// Don't do this!
test('callback:the data is peanut butter', () => {
    function callback(data) {
        expect(data).toBe('peanut butter');
    }

    fetchDataCallback(callback);
});

// Jest will wait until the done callback is called before finishing the test.
test('callback:the data is peanut butter', done => {
    function callback(data) {
        expect(data).toBe('peanut butter');
        done();
    }

    fetchDataCallback(callback);
});




// Promises


// Just return a promise from your test, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail.
test('promie:the data is peanut butter', () => {
    return fetchDataPromise().then(res => {
        expect(res.data).toBe('peanut butter');
    });
});

// If you expect a promise to be rejected use the .catch method. Make sure to add expect.assertions to verify that a certain number of assertions are called. Otherwise a fulfilled promise would not fail the test.

test('the fetch fails with an error', () => {
    expect.assertions(1);
    return fetchDataPromise().catch(e => expect(e).toMatch('error'));
});

// .resolves / .rejects
// You can also use the .resolves matcher in your expect statement, and Jest will wait for that promise to resolve. If the promise is rejected, the test will automatically fail.

test('the data is peanut butter', () => {
    return expect(fetchDataPromise()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', () => {
    return expect(fetchData()).rejects.toMatch('error');
});





// Async/Await

test('the data is peanut butter', async () => {
    const data = await fetchDataPromise();
    expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    expect.assertions(1);
    try {
        await fetchDataPromise();
    } catch (e) {
        expect(e).toMatch('error');
    }
});

// Of course, you can combine async and await with .resolves or .rejects.

test('the data is peanut butter', async () => {
    await expect(fetchData()).resolves.toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
    await expect(fetchData()).rejects.toThrow('error');
});