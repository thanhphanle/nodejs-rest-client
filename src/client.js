const axios = require('axios')
const qs = require('qs');

const RestClient = class {

    /**
     * 
     * POST login
     */
    login(username, password) {
        let data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:3000/login', data)
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    /**
     * 
     * Get list of user data
     * Call endpoint: http://localhost:3000/users
     */
    getUsers(token) {
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('http://localhost:3000/users', { headers: headers, timeout: 5000 })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    /**
     * 
     * GET user data by id with Authorization header and query param
     * Call endpoint: http://localhost:3000/users?id=<id>
     */
    getUser(token, id) {
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        let params = {
            id: id
        }
        axios.get('http://localhost:3000/users', { params: params, headers: headers, timeout: 5000 })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    /**
     * GET user data by multiple name in query param => use URLSearchParams
     * Call endpoint: http://localhost:3000/users?name=<name1>&name=<name2>&name=<name3>
     */
    getUserByNames(token, names) {
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        let params = URLSearchParams();
        if (names !== undefined) {
            for (var i = 0; i < names.length; i++) {
                params.append('name', names[i]);
            }
        }
        axios.get('http://localhost:3000/users', { params: params, headers: headers, timeout: 5000 })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    /**
     * POST with Authorization header and json body 
     */
    saveUser(token, user) {
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        let data = {
            username: user.username === undefined ? '' : user.username,
            password: user.password === undefined ? '' : user.password,
            fullName: user.fullName === undefined ? '' : user.fullName,
            email: user.email === undefined ? '' : user.email
        }
        axios.post('http://localhost:3000/users', data, { headers: headers })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    /**
     * 
     * POST with content-type = application/x-www-form-urlencoded
     */
    submitForm(token, name, value) {
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        let data = {
            name: name,
            value: value
        }
        axios.post('http://localhost:3000/submit-form', qs.stringify(data), { headers: headers })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }
}

module.exports = RestClient