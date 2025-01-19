import React, { useState, useEffect } from 'react';
import { images } from "@/assets/assets";
import httpClient from "@/services/http-client";

const conversationsService = {

  //Go High Public API Call
  fetchConversations: async (conversationId = "tDtDnQdgm2LXpyiqYvZ6") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582856/conversations/${conversationId}`); //Todo: for the live server on "/conversations/${conversationId}" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  }
}

export default conversationsService;
