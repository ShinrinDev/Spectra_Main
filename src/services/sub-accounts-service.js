import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const SubAccountsService = {
  
  //Go High Public API Call
  fetchSubAccounts: async () => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582857/locations/`); //Todo: for the live server on "/locations" required
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching sub accounts');
    }
  },

  fetchSubAccountsById: async (locationId = "ve9EPM428h8vShlRW1KT") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582857/locations/${locationId}`); //Todo: for the live server on "/locations/${locationId}" required
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching sub accounts');
    }
  },

  updateSubAccounts: async (locationId = "ve9EPM428h8vShlRW1KT", locationBody = {
    "name": "Mark Shoes",
    "phone": "+1410039940",
    "companyId": "UAXssdawIWAWD",
    "address": "4th fleet street",
    "city": "New York",
    "state": "Illinois",
    "country": "AF",
    "postalCode": "567654",
    "website": "https://yourwebsite.com",
    "timezone": "US/Central",
    "prospectInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@mail.com"
    },
    "settings": {
      "allowDuplicateContact": false,
      "allowDuplicateOpportunity": false,
      "allowFacebookNameMerge": false,
      "disableContactTimezone": false
    },
    "social": {
      "facebookUrl": "https://www.facebook.com/",
      "googlePlus": "https://www.googleplus.com/",
      "linkedIn": "https://www.linkedIn.com/",
      "foursquare": "https://www.foursquare.com/",
      "twitter": "https://www.foutwitterrsquare.com/",
      "yelp": "https://www.yelp.com/",
      "instagram": "https://www.instagram.com/",
      "youtube": "https://www.youtube.com/",
      "pinterest": "https://www.pinterest.com/",
      "blogRss": "https://www.blogRss.com/",
      "googlePlacesId": "ChIJJGPdVbQTrjsRGUkefteUeFk"
    },
    "twilio": {
      "sid": "AC_XXXXXXXXXXX",
      "authToken": "77_XXXXXXXXXXX"
    },
    "mailgun": {
      "apiKey": "key-XXXXXXXXXXX",
      "domain": "replies.yourdomain.com"
    },
    "snapshot": {
      "id": "XXXXXXXXXXX",
      "override": false
    }
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.put(`/39582857/locations/${locationId}`, {data : locationBody}); //Todo: for the live server on "/locations/${locationId}" required
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching sub accounts');
    }
  },

  createSubAccounts: async (locationBody = {
    name: 'Mark Shoes', // required
    phone: '+1410039940',
    companyId: 'UAXssdawIWAWD',
    address: '4th fleet street',
    city: 'New York',
    state: 'Illinois',
    country: 'AF',
    postalCode: '567654',
    website: 'https://yourwebsite.com',
    timezone: 'US/Central',
    prospectInfo: {firstName: 'John', lastName: 'Doe', email: 'john.doe@mail.com'},
    settings: {
      allowDuplicateContact: false,
      allowDuplicateOpportunity: false,
      allowFacebookNameMerge: false,
      disableContactTimezone: false
    },
    social: {
      facebookUrl: 'https://www.facebook.com/',
      googlePlus: 'https://www.googleplus.com/',
      linkedIn: 'https://www.linkedIn.com/',
      foursquare: 'https://www.foursquare.com/',
      twitter: 'https://www.foutwitterrsquare.com/',
      yelp: 'https://www.yelp.com/',
      instagram: 'https://www.instagram.com/',
      youtube: 'https://www.youtube.com/',
      pinterest: 'https://www.pinterest.com/',
      blogRss: 'https://www.blogRss.com/',
      googlePlacesId: 'ChIJJGPdVbQTrjsRGUkefteUeFk'
    },
    twilio: {sid: 'AC_XXXXXXXXXXX', authToken: '77_XXXXXXXXXXX'},
    mailgun: {apiKey: 'key-XXXXXXXXXXX', domain: 'replies.yourdomain.com'},
    snapshotId: 'XXXXXXXXXXX'
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582857/locations/`, {data : locationBody}); //Todo: for the live server on "/locations/${locationId}" required
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching sub accounts');
    }
  },

  deleteSubAccounts: async (locationId = "ve9EPM428h8vShlRW1KT", deleteTeilioAccount = false) => { //Remove default param only for mock
    try {
      const response = await httpClient.delete(`/39582857/locations/${locationId}`, {params : {deleteTwilioAccount: deleteTeilioAccount}}); //Todo: for the live server on "/locations/${locationId}" required
      return response.data.location;
    } catch (err) {
      throw new Error('Error fetching sub accounts');
    }
  },
}

export default SubAccountsService;