import axios from 'axios';

// Go High API Http Client Config,
// If you want to connect to live serve change baseURL and auth token
export const httpClient = axios.create({
    baseURL: 'https://api.instantly.ai/api/v1',
    headers: {
      'Content-Type': 'application/json',
    },
    params: {
        api_key: 'hAjes-l0kZOP8UbGjGj1aeHO9LxrB'
    }
  });

export default httpClient;