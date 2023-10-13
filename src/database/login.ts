import axios from 'axios';
import { faker } from '@faker-js/faker';

// Generate a random username and password
const username = faker.internet.userName();
const password = faker.internet.password();

console.log(`Generated Credentials - Username: ${username}, Password: ${password}`);

// Define the API endpoint
const apiEndpoint = 'http://localhost:3000/auth/login';

// Perform the login request
axios.post(apiEndpoint, { username, password })
    .then((response) => {
        console.log('Login Successful!');
        console.log('Received Token:', response.data.token);
    })
    .catch((error) => {
        console.log('Login Failed!');
        if (error.response) {
            console.log('Response Data:', error.response.data);
            console.log('Response Status:', error.response.status);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error', error.message);
        }
    });
