import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const AccountsService = {
  
  //Intantly Public API Call
  fetchAccounts: async () => {
    try {
      const response = await httpClient.get('/account/list');
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching accounts');
    }
  }
}

export default AccountsService;