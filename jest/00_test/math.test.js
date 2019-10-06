

function expect(res) {

    // console.log(res)

    function toBe(exp) {

        // console.log(exp)

        if (res !== exp) {
            throw Error(`${res} not eq ${exp}`)
        }
    }


    return {
        toBe
    }
}


function test(des, fn) {

    try {
        fn()
    } catch (e) {
        console.log(des, e)
    }
}