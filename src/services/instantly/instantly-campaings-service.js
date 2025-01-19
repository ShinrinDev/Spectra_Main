import React, { useState, useEffect } from 'react';
import httpClient from "@/services/http-client";

const InstantlyCampaignsService = {

  //Intantly Public API Call
  fetchCampaigns: async (locationId = "ve9EPM428h8vShlRW1KT") => { //Remove default param only for mock
    try {
      const response = await httpClient.get('/campaigns/', { 
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

export default InstantlyCampaignsService;