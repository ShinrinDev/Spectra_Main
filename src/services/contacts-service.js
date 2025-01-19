import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const ContactsService = {

  //Go High Public API Call
  fetchContacts: async (locationId = "ve9EPM428h8vShlRW1KT") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582863/contacts/search`); //Todo: for the live server only "/contacts/" required
      return response.data.contacts;
    } catch (err) {
      throw new Error('Error fetching contacts');
    }
  },

  fetchContactById: async (contactId = 'ocQHyuzHvysMo5N5VsXc') => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582863/contacts/${contactId}`); //Todo: for the live server only "/contacts/${contactId}" required
      return response.data.contact;
    } catch (err) {
      throw new Error('Error fetching contacts');
    }
  },

  createContact: async (contactData = {
    "firstName": "Rosan",
    "lastName": "Deo",
    "name": "Rosan Deo",
    "email": "rosan@deos.com",
    "locationId": "ve9EPM428h8vShlRW1KT",
    "gender": "male",
    "phone": "+1 888-888-8888",
    "address1": "3535 1st St N",
    "city": "Dolomite",
    "state": "AL",
    "postalCode": "35061",
    "website": "https://www.tesla.com",
    "timezone": "America/Chihuahua",
    "dnd": true,
    "dndSettings": {
      "Call": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "Email": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "SMS": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "WhatsApp": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "GMB": {
        "status": "active",
        "message": "string",
        "code": "string"
      },
      "FB": {
        "status": "active",
        "message": "string",
        "code": "string"
      }
    },
    "inboundDndSettings": {
      "all": {
        "status": "active",
        "message": "string"
      }
    },
    "tags": [
      "nisi sint commodo amet",
      "consequat"
    ],
    "customFields": [
      {
        "id": "6dvNaf7VhkQ9snc5vnjJ",
        "key": "my_custom_field",
        "field_value": "9039160788"
      }
    ],
    "source": "public api",
    "country": "US",
    "companyName": "DGS VolMAX",
    "assignedTo": "y0BeYjuRIlDwsDcOHOJo"
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582863/contacts/`, { data: contactData }); //Todo: for the live server on "/contacts/" required
      return response.data.contact;
    } catch (err) {
      throw new Error('Error fetching contact by Id');
    }
  },

  updateContact: async (contactId = 'ocQHyuzHvysMo5N5VsXc', contactData = {
    firstName: 'rosan',
    lastName: 'Deo',
    name: 'rosan Deo',
    email: 'rosan@deos.com',
    phone: '+1 888-888-8888',
    address1: '3535 1st St N',
    city: 'Dolomite',
    state: 'AL',
    postalCode: '35061',
    website: 'https://www.tesla.com',
    timezone: 'America/Chihuahua',
    dnd: true,
    dndSettings: {
      Call: { status: 'active', message: 'string', code: 'string' },
      Email: { status: 'active', message: 'string', code: 'string' },
      SMS: { status: 'active', message: 'string', code: 'string' },
      WhatsApp: { status: 'active', message: 'string', code: 'string' },
      GMB: { status: 'active', message: 'string', code: 'string' },
      FB: { status: 'active', message: 'string', code: 'string' }
    },
    inboundDndSettings: { all: { status: 'active', message: 'string' } },
    tags: ['nisi sint commodo amet', 'consequat'],
    customFields: [
      { id: '6dvNaf7VhkQ9snc5vnjJ', key: 'my_custom_field', field_value: '9039160788' }
    ],
    source: 'public api',
    country: 'US',
    assignedTo: 'y0BeYjuRIlDwsDcOHOJo'
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.put(`/39582863/contacts/${contactId}`, { data: contactData }); //Todo: for the live server on "/contacts/${contactId}" required
      return response.data.contact;
    } catch (err) {
      throw new Error('Error updating contacts');
    }
  },

  deleteContact: async (contactId = 'ocQHyuzHvysMo5N5VsXc') => { //Remove default param only for mock
    try {
      const response = await httpClient.delete(`/39582863/contacts/${contactId}`); //Todo: for the live server on "/contacts/${contactId}" required
      return response.data;
    } catch (err) {
      throw new Error('Error deleting contact');
    }
  },

  searchContact: async (search = {}) => {
    try {
      const response = await httpClient.post(`/39582863/contacts/search`, { data: search }); //Todo: for the live server on "/contacts/search" required
      return response.data.contact;
    } catch (err) {
      throw new Error('Error serching contact by Id');
    }
  },

  addTagsToContact: async (contactId, tags = {tags: ['minim', 'velit magna']}) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582863/contacts/${contactId}/tags`, { data: tags }); //Todo: for the live server on "/contacts/${contactId}/tags" required
      return response.data.tags;
    } catch (err) {
      throw new Error('Error serching contact by Id');
    }
  }
}

export default ContactsService;