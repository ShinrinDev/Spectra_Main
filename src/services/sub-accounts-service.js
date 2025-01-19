import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const SubAccountsService = {
  
  //Go High Public API Call
  fetchSubAccounts: async (locationId = "ve9EPM428h8vShlRW1KT") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582857/locations/${locationId}`); //Todo: for the live server on "/locations/${locationId}" required
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching sub accounts');
    }
  }
}

export default SubAccountsService;