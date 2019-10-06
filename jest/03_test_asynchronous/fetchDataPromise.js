let axios = require('axios')

let fetchDataPromise = (fn) => {
    return axios.get('https://api.github.com/users/shanejix/repos')

}

module.exports = fetchDataPromise