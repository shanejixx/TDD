let axios = require('axios')

let fetchDataCallback = (fn) => {
    axios.get('https://api.github.com/users/shanejix/repos').then(res => {
        fn(res.data)
    })


}

module.exports = fetchDataCallback