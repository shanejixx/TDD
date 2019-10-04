// // Mock Functions

// // 1.ieasy to test the links between code by erasing the actual implementation of a function,
// // 2.capturing calls to the function (and the parameters passed in those calls),
// // 3.capturing instances of constructor functions when instantiated with new,
// // 4.and allowing test - time configuration of return values.



// // Using a mock function






// beforeAll(() => {
// })

// test('using mock', () => {

//     // testing  a function forEach
//     function forEach(items, callback) {
//         for (let index = 0; index < items.length; index++) {
//             callback(items[index]);
//         }
//     }

//     // use a mock function, 
//     // and inspect the mock's state to ensure the callback is invoked as expected.
//     const mockCallback = jest.fn(x => 42 + x);
//     forEach([0, 1], mockCallback);

//     // The mock function is called twice
//     expect(mockCallback.mock.calls.length).toBe(2);

//     // The first argument of the first call to the function was 0
//     expect(mockCallback.mock.calls[0][0]).toBe(0);

//     // The first argument of the second call to the function was 1
//     expect(mockCallback.mock.calls[1][0]).toBe(1);

//     // The return value of the first call to the function was 42
//     expect(mockCallback.mock.results[0].value).toBe(42);
// })




// // .mock property


// // All mock functions have this special.mock property,
// // which is where data about how the function has been called
// // and what the function returned is kept.
// // The.mock property also tracks the value of this for each call,
// // so it is possible to inspect this as well:
// const myMock = jest.fn();

// const a = new myMock();

// const b = {};
// const bound = myMock.bind(b);
// bound();

// console.log(myMock.mock.instances);
// // > [ <a>, <b> ]


// // These mock members are very useful in tests to assert
// // how these functions get called, instantiated, or what they returned:

// test('.mock property', () => {


//     const someMockFunction = jest.fn();

//     // The function was called exactly once
//     expect(someMockFunction.mock.calls.length).toBe(1);

//     // The first arg of the first call to the function was 'first arg'
//     expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

//     // The second arg of the first call to the function was 'second arg'
//     expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

//     // The return value of the first call to the function was 'return value'
//     expect(someMockFunction.mock.results[0].value).toBe('return value');

//     // This function was instantiated exactly twice
//     expect(someMockFunction.mock.instances.length).toBe(2);

//     // The object returned by the first instantiation of this function
//     // had a `name` property whose value was set to 'test'
//     expect(someMockFunction.mock.instances[0].name).toEqual('test');
// })





// Mock Return Values


const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock
    .mockReturnValueOnce(10)
    .mockReturnValueOnce('x')
    .mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true


const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(filterTestFn);

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls);
// > [ [11], [12] ]





// Mocking Modules




// // users.js
// import axios from 'axios';

// class Users {
//   static all() {
//     return axios.get('/users.json').then(resp => resp.data);
//   }
// }

// export default Users;


// // users.test.js
// import axios from 'axios';
// import Users from './users';

// jest.mock('axios');

// test('should fetch users', () => {
//   const users = [{name: 'Bob'}];
//   const resp = {data: users};
//   axios.get.mockResolvedValue(resp);

//   // or you could use the following depending on your use case:
//   // axios.get.mockImplementation(() => Promise.resolve(resp))

//   return Users.all().then(data => expect(data).toEqual(users));
// });






// Mock Implementations



// Still, there are cases where it's useful to go beyond the ability to specify return values and full-on replace the implementation of a mock function. This can be done with jest.fn or the mockImplementationOnce method on mock functions.

const myMockFn = jest.fn(cb => cb(null, true));

myMockFn((err, val) => console.log(val));
// > true
// The mockImplementation method is useful when you need to define the default implementation of a mock function that is created from another module:

// foo.js
module.exports = function () {
    // some implementation;
};

// test.js
jest.mock('../foo'); // this happens automatically with automocking
const foo = require('../foo');

// foo is a mock function
foo.mockImplementation(() => 42);
foo();
// > 42
// When you need to recreate a complex behavior of a mock function such that multiple function calls produce different results, use the mockImplementationOnce method:

const myMockFn = jest
    .fn()
    .mockImplementationOnce(cb => cb(null, true))
    .mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// > true

myMockFn((err, val) => console.log(val));
// > false
// When the mocked function runs out of implementations defined with mockImplementationOnce, it will execute the default implementation set with jest.fn(if it is defined):

const myMockFn = jest
    .fn(() => 'default')
    .mockImplementationOnce(() => 'first call')
    .mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// > 'first call', 'second call', 'default', 'default'
// For cases where we have methods that are typically chained(and thus always need to return this), we have a sugary API to simplify this in the form of a.mockReturnThis() function that also sits on all mocks:

const myObj = {
    myMethod: jest.fn().mockReturnThis(),
};

// is the same as

const otherObj = {
    myMethod: jest.fn(function () {
        return this;
    }),
};



// Mock Names




// You can optionally provide a name for your mock functions, which will be displayed instead of "jest.fn()" in test error output. Use this if you want to be able to quickly identify the mock function reporting an error in your test output.

const myMockFn = jest
    .fn()
    .mockReturnValue('default')
    .mockImplementation(scalar => 42 + scalar)
    .mockName('add42');



// Custom Matchers
// Finally, in order to make it simpler to assert how mock functions have been called, we've added some custom matcher functions for you:

// The mock function was called at least once
expect(mockFunc).toBeCalled();

// The mock function was called at least once with the specified args
expect(mockFunc).toBeCalledWith(arg1, arg2);

// The last call to the mock function was called with the specified args
expect(mockFunc).lastCalledWith(arg1, arg2);

// All calls and the name of the mock is written as a snapshot
expect(mockFunc).toMatchSnapshot();


// These matchers are really just sugar for common forms of inspecting the .mock property. You can always do this manually yourself if that's more to your taste or if you need to do something more specific:

// The mock function was called at least once
expect(mockFunc.mock.calls.length).toBeGreaterThan(0);

// The mock function was called at least once with the specified args
expect(mockFunc.mock.calls).toContainEqual([arg1, arg2]);

// The last call to the mock function was called with the specified args
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1]).toEqual([
    arg1,
    arg2,
]);

// The first arg of the last call to the mock function was `42`
// (note that there is no sugar helper for this specific of an assertion)
expect(mockFunc.mock.calls[mockFunc.mock.calls.length - 1][0]).toBe(42);

// A snapshot will check that a mock was invoked the same number of times,
// in the same order, with the same arguments. It will also assert on the name.
expect(mockFunc.mock.calls).toEqual([[arg1, arg2]]);
expect(mockFunc.getMockName()).toBe('a mock name');