import React, { useState, useEffect } from 'react';
import {httpClient, api_key} from './instantly-http-client';

const InstantlyLeadsService = {

    //Intantly Public API Call
    fetchLeadsById: async (campaignId = "00000000-0000-0000-0000-000000000000", email = "abc@xyz.com") => { //Remove default param only for mock
        try {
            const response = await httpClient.get('/lead/get', {
                params: {
                    api_key: api_key,
                    campaign_id: campaignId,
                    email: email
                }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching leads');
        }
    },

    addLead: async (leadData = {
        "api_key": api_key, //required
        "campaign_id": "00000000-0000-0000-0000-000000000000", //required
        "skip_if_in_workspace": false,
        "skip_if_in_campaign": true,
        "leads": [
          {
            "email": "john@abc.com",
            "first_name": "John",
            "last_name": "Doe",
            "company_name": "Instantly",
            "personalization": "Loved your latest post",
            "phone": "123456789",
            "website": "instantly.ai",
            "custom_variables": {
              "favorite_restaurant": "Chipotle",
              "language": "English"
            }
          },
          {
            "email": "jane@abc.com",
            "first_name": "Jane",
            "last_name": "Smith",
            "company_name": "Instantly",
            "personalization": "Will you be attending the conference in New York?",
            "phone": "123456789",
            "website": "instantly.ai",
            "custom_variables": {
              "favorite_restaurant": "Chipotle",
              "language": "English"
            }
          }
        ]
      }) => { //Remove default param only for mock
        try {
            const response = await httpClient.post('/lead/add', {
                data: { body: leadData }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error adding lead');
        }
    },

    updateLeadStatus: async (leadData = {
        "api_key": api_key, //required
        "campaign_id": "00000000-0000-0000-0000-000000000000", //required
        "email": "abc@xyz.com",
        "new_status": "Unsubscribed"
      }) => { //Remove default param only for mock
        try {
            const response = await httpClient.post('/lead/update/status', {
                data: { body: leadData }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error updating lead');
        }
    },

    deleteLead: async (leadData = {
        "api_key": api_key, //required
        "campaign_id": "00000000-0000-0000-0000-000000000000", //required
        "delete_all_from_company": false,
        "delete_list": [
          "abc@xyz.com",
          "123@abc.com"
        ]
      }) => { //Remove default param only for mock
        try {
            const response = await httpClient.post('/lead/delete', {
                params: {
                    Lead_id: LeadId
                },
                data: { body: leadData }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error deleting Leads');
        }
    },
}

export default InstantlyLeadsService;