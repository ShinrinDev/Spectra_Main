import axios from 'axios';

// Go High API Http Client Config,
// If you want to connect to live serve change baseURL and auth token
export const httpClient = axios.create({
    baseURL: 'https://stoplight.io/mocks/highlevel/integrations',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2NhdGlvbl9pZCI6InB3SENPcVUxcU8weXFDRk1wTVRoIiwidmVyc2lvbiI6MSwiaWF0IjoxNzMwMDEzODc4NTI5LCJzdWIiOiJhSjdBa2IwYzJBVWM5WmpNa1VYbCJ9.hP05evOm-gEH2mmHJ3phvF20rnUaxjIFw6l4GsUsn1w',
      'Content-Type': 'application/json',
      'Version': '2021-07-28'
    },
  });

export default httpClient;