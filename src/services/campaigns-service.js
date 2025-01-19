import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const CampaignsService = {

  //Go High Public API Call
  fetchCampaigns: async (locationId = "ve9EPM428h8vShlRW1KT") => { //Remove default param only for mock
    try {
      const response = await httpClient.get('/39582860/campaigns/', { //Todo: for the live server on "/campaigns/" required
        params: {
          locationId: locationId
        }
      });
      return response.data.campaigns;
    } catch (err) {
      throw new Error('Error fetching campaigns');
    }
  }
}

export default CampaignsService;