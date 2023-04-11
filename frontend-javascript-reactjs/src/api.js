import axios from 'axios';

const FASTAPI_URL = 'http://localhost:8000'; // Replace with your FastAPI backend URL
const AKKA_URL = 'http://localhost:8080'; // Replace with your Scala Akka backend URL

const fastApi = axios.create({
    baseURL: FASTAPI_URL,
});

const akkaApi = axios.create({
    baseURL: AKKA_URL,
});

export { fastApi, akkaApi };
