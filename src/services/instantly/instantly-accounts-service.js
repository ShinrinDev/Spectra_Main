import React, { useState, useEffect } from 'react';
import { httpClient, api_key } from './instantly-http-client';
import { check } from 'prettier';

const AccountsService = {

  //Intantly Public API Call
  fetchAccounts: async () => {
    try {
      const response = await httpClient.get('/account/list', {
        params: {
          api_key: api_key
        }
      });
      return response.data.accounts;
    } catch (err) {
      throw new Error('Error fetching accounts');
    }
  },

  checkAccountStatus: async (email = "abc@xyz.com") => {//Remove default param only for mock
    try {
      const response = await httpClient.get('/account/status', {
        params: {
          api_key: api_key,
          email: email
        }
      });
      return response.data;
    } catch (err) {
      throw new Error('Error checking accounts status');
    }
  },

  deleteAccount: async (emailData = {
    "api_key": api_key,
    "email": "abc@xyz.com"
  }) => {//Remove default param only for mock
    try {
      const response = await httpClient.get('/account/delete', {
        data: {
          body: emailData
        }
      });
      return response.data;
    } catch (err) {
      throw new Error('Error deleting accounts');
    }
  }
}

export default AccountsService;