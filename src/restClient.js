const axios = require('axios')
const qs = require('qs');

const RestClient = class {

    // Post login
    login(username,password) {
        let data = {
            username: username,
            password: password
        }
        axios.post('http://localhost:8080/login', data)
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    // Get list of user data
    // http://localhost:8080/users
    getUsers(token) {
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        axios.get('http://localhost:8080/users', { headers: headers, timeout: 5000 })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    // Get user data by id with Authorization header
    // http://localhost:8080/users?id=<id>
    getUser(id) {
        let headers = {
            'Authorization': 'Bearer ' + token
        }
        let params = {
            id: id
        }
        axios.get('http://localhost:8080/users', { params: params, headers: headers, timeout: 5000 })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    // Post with Authorization header and json body
    saveUser(token,user) {
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
        let data = {
            username: user.username === undefined? '' : user.username,
            password: user.password === undefined? '' : user.password,
            fullName: user.fullName === undefined? '' : user.fullName,
            email: user.email === undefined? '' : user.email
        }
        axios.post('http://localhost:8080/user', data, { headers: headers })
            .then(response => {
                // Handle success.
                console.log(response.data)
            })
            .catch(error => {
                // Handle error.
                console.error('An error occurred:', error);
            });
    }

    // Post with content-type = application/x-www-form-urlencoded
    submitForm(token,name,value) {
        let headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        let data = {
            name: name,
            value: value
        }
        axios.post('http://localhost:8080/submit-form', qs.stringify(data), { headers: headers })
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