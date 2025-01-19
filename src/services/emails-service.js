import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const EmailsService = {
  
  //Go High Public API Call
  fetchEmails: async () => {
    try {
      const response = await httpClient.get('/593716043/emails/builder', {
          params: {
            locationId: locationId
          }
        }); //Todo: for the live server on "/emails/builder" required
      return response.data;
    } catch (err) {
      throw new Error('Error fetching emails');
    }
  }
}

export default EmailsService;