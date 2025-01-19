import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const UsersService = {
    // https://stoplight.io/mocks/highlevel/integrations/39582858/users/{userId}
  //Go High Public API Call
  fetchUsers: async () => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582858/users/`); //Todo: for the live server on "/users/" required
      return response.data.users;
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },

  
  fetchUsersById: async (userId = "") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582858/users/${userId}`); //Todo: for the live server on "/users/${userId}" required
      return response.data;
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },

  updateUser: async (userId = "", userBody = {
    firstName: 'John',
    lastName: 'Deo',
    email: 'john@deo.com',
    emailChangeOTP: '191344',
    password: '*******',
    phone: '+18832327657',
    isEjectedUser: true,
    type: 'account',
    role: 'admin',
    companyId: 'UAXssdawIWAWD',
    locationIds: ['C2QujeCh8ZnC7al2InWR'],
    permissions: {
      campaignsEnabled: true,
      campaignsReadOnly: false,
      contactsEnabled: true,
      workflowsEnabled: true,
      workflowsReadOnly: true,
      triggersEnabled: true,
      funnelsEnabled: true,
      websitesEnabled: false,
      opportunitiesEnabled: true,
      dashboardStatsEnabled: true,
      bulkRequestsEnabled: true,
      appointmentsEnabled: true,
      reviewsEnabled: true,
      onlineListingsEnabled: true,
      phoneCallEnabled: true,
      conversationsEnabled: true,
      assignedDataOnly: false,
      adwordsReportingEnabled: false,
      membershipEnabled: false,
      facebookAdsReportingEnabled: false,
      attributionsReportingEnabled: false,
      settingsEnabled: true,
      tagsEnabled: true,
      leadValueEnabled: true,
      marketingEnabled: true,
      agentReportingEnabled: true,
      botService: false,
      socialPlanner: true,
      bloggingEnabled: true,
      invoiceEnabled: true,
      affiliateManagerEnabled: true,
      contentAiEnabled: true,
      refundsEnabled: true,
      recordPaymentEnabled: true,
      cancelSubscriptionEnabled: true,
      paymentsEnabled: true,
      communitiesEnabled: true,
      exportPaymentsEnabled: true
    },
    scopes: ['contacts.write', 'campaigns.readonly'],
    scopesAssignedToOnly: ['contacts.write', 'campaigns.readonly'],
    profilePhoto: 'https://img.png'
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.put(`/39582857/users/${userId}`, {data : userBody}); //Todo: for the live server on "/users/${userId}" required
      return response.data.user;
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },

  createUsers: async (userBody = {
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
      const response = await httpClient.post(`/39582857/users/`, {data : userBody}); //Todo: for the live server on "/users/" required
      return response.data.user;
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },

  deleteUsers: async (userId = "") => { //Remove default param only for mock
    try {
      const response = await httpClient.delete(`/39582857/users/${userId}`); //Todo: for the live server on "/users/${userId}" required
      return response.data.user;
    } catch (err) {
      throw new Error('Error fetching users');
    }
  },
}

export default UsersService;