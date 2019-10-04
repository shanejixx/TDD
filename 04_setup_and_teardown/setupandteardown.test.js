import {
    initializeCityDatabase,
    clearCityDatabase,
    isCity,
    initializeFoodDatabase,
    isValidCityFoodPair
} from './cityDatabase'

// Often while writing tests you have some setup work that needs to happen before tests run,
// and you have some finishing work that needs to happen after tests run.
// Jest provides helper functions to handle this.


// Repeating Setup For Many Tests

// use beforeEach and afterEach
beforeEach(() => {
    initializeCityDatabase();
});

afterEach(() => {
    clearCityDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});

// beforeEach and afterEach can handle asynchronous code in the same ways that tests can handle asynchronous code 



// One-Time Setup

// provides beforeAll and afterAll to handle this situation.
beforeAll(() => {
    return initializeCityDatabase();
});

afterAll(() => {
    return clearCityDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});




// Scoping



// group tests together using a describe block

// Applies to all tests in this file
beforeEach(() => {
    return initializeCityDatabase();
});

test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});

test('city database has San Juan', () => {
    expect(isCity('San Juan')).toBeTruthy();
});

describe('matching cities to foods', () => {
    // Applies only to tests in this describe block
    beforeEach(() => {
        return initializeFoodDatabase();
    });

    test('Vienna <3 sausage', () => {
        expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    });

    test('San Juan <3 plantains', () => {
        expect(isValidCityFoodPair('San Juan', 'Mofongo')).toBe(true);
    });
});


// Note that the top-level beforeEach is executed before the beforeEach inside the describe block.

beforeAll(() => console.log('1 - beforeAll'));
afterAll(() => console.log('1 - afterAll'));

beforeEach(() => console.log('1 - beforeEach'));
afterEach(() => console.log('1 - afterEach'));

test('', () => console.log('1 - test'));

describe('Scoped / Nested block', () => {

    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));

    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));

    test('', () => console.log('2 - test'));
});



// Order of execution of describe and test blocks


// Jest executes all describe handlers in a test file before it executes any of the actual tests.
// This is another reason to do setup and teardown inside before * and after * handlers rather than inside the describe blocks.
describe('outer', () => {
    console.log('describe outer-a');

    describe('describe inner 1', () => {
        console.log('describe inner 1');
        test('test 1', () => {
            console.log('test for describe inner 1');
            expect(true).toEqual(true);
        });
    });

    console.log('describe outer-b');

    test('test 1', () => {
        console.log('test for describe outer');
        expect(true).toEqual(true);
    });

    describe('describe inner 2', () => {
        console.log('describe inner 2');
        test('test for describe inner 2', () => {
            console.log('test for describe inner 2');
            expect(false).toEqual(false);
        });
    });

    console.log('describe outer-c');
});