import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const ContactsService = {
  
  //Go High Public API Call
  fetchContacts: async (contactId = "ocQHyuzHvysMo5N5VsXc") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582863/contacts/${contactId}`); //Todo: for the live server on "/contacts/${contactCode}" required
      return response.data.contact;
    } catch (err) {
      throw new Error('Error fetching contacts');
    }
  }
}

export default ContactsService;