import axios from 'axios';

// Go High API Http Client Config,
// If you want to connect to live serve change baseURL and auth token
export const httpClient = axios.create({
    baseURL: 'https://api.instantly.ai/api/v1',
    headers: {
      'Content-Type': 'application/json',
    }
  });

export const api_key = '';

export default [httpClient, api_key];