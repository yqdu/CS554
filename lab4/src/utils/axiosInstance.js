import axios from "axios";

const apiRoot = "https://pokeapi.co/api/v2/";

// const url = `${apiRoot}/characters?nameStartsWith=${searchQuery}`;

const instance = axios.create({
    // headers: {'Access-Control-Allow-Origin': 'http://localhost:3000/',
    // "Access-Control-Allow-Credentials": "true",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
// }
});

// Add a request interceptor
instance.interceptors.request.use(
  function(config) {
    
      config.url = `${apiRoot}${config.url}`;
      config.headers = {'Access-Control-Allow-Origin': '*',"Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT","Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"}

    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
