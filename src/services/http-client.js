import axios from 'axios';

// Go High API Http Client Config,
// If you want to connect to live serve change baseURL and auth token
export const httpClient = axios.create({
    baseURL: 'https://stoplight.io/mocks/highlevel/integrations',
    headers: {
      'Authorization': '',
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
  });

export default httpClient;