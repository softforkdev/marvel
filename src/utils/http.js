import axios from 'axios';

const http = axios.create({baseURL: "https://gateway.marvel.com:443/v1/public"})

export default http;