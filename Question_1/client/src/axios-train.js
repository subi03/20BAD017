import axios from 'axios';

const longLangInstance = axios.create({
    // baseURL: 'https://jsonplaceholder.typicode.com/'
    baseURL: 'https://transportapi.com/v3/uk/'
});

export default longLangInstance;