import React, { useState, useEffect } from 'react';
import httpClient from './instantly-http-client';

const InstantlyAnalyticssService = {

    //Intantly Public API Call
    fetchCampaignSummary: async (campaignId = "00000000-0000-0000-0000-000000000000") => { //Remove default param only for mock
        try {
            const response = await httpClient.get('/analytics/campaign/summary', {
                params: {
                    campaign_id: campaignId // required
                }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching analytics');
        }
    },

    fetchCampaignCount: async (campaignId = "00000000-0000-0000-0000-000000000000", startDate = "01-01-2023", endDate = "01-31-2023") => { //Remove default param only for mock
        try {
            const response = await httpClient.get('/analytics/campaign/count', {
                params: {
                    campaign_id: campaignId,
                    tart_date: startDate,
                    end_date: endDate
                }
            });
            return response.data;
        } catch (err) {
            throw new Error('Error fetching analytics count');
        }
    },

}

export default InstantlyAnalyticssService;