import React, { useState, useEffect } from 'react';
import {httpClient, api_key} from './instantly-http-client';

const InstantlyCampaignsService = {

    //Intantly Public API Call
    fetchCampaigns: async () => { //Remove default param only for mock
        try {
            const response = await httpClient.get('/campaign/list', {
                params: {
                    api_key: api_key
                }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching campaigns');
        }
    },

    fetchCampaignById: async (campaignId = "00000000-0000-0000-0000-000000000000") => { //Remove default param only for mock
        try {
            const response = await httpClient.get('/campaigns/get/name', {
                params: {
                    api_key: api_key,
                    campaign_id: campaignId
                }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching campaign by ID');
        }
    },

    updateCampaignName: async (campaignId = "00000000-0000-0000-0000-000000000000", name = "New name") => { //Remove default param only for mock
        const campaignData = {
            "api_key": api_key,
            "campaign_id": campaignId,
            "name": name
        }
        try {
            const response = await httpClient.post('/campaigns/set/name', {
                data: { body: campaignData }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching campaigns by ID');
        }
    },
}

export default InstantlyCampaignsService;