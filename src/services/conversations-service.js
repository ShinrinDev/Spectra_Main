import React, { useState, useEffect } from 'react';
import { images } from "@/assets/assets";
import httpClient from "@/services/http-client";

const conversationsService = {

  //Go High Public API Call
  fetchConversations: async () => { 
    try {
      const response = await httpClient.get(`/39582856/conversations/`); //Todo: for the live server on "/conversations/${conversationId}" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },
  
  fetchConversationById: async (conversationId = "tDtDnQdgm2LXpyiqYvZ6") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582856/conversations/${conversationId}`); //Todo: for the live server on "/conversations/${conversationId}" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },
  
  createConversation: async (conversationsData = {locationId: 'tDtDnQdgm2LXpyiqYvZ6', contactId: 'tDtDnQdgm2LXpyiqYvZ6'}) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582856/conversations/`, {data: conversationsData}); //Todo: for the live server only "/conversations/" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },
  
  updateConversation: async (conversationData = {
    locationId: 'tDtDnQdgm2LXpyiqYvZ6',
    unreadCount: 1,
    starred: true,
    feedback: {}
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.put(`/39582856/conversations/${conversationId}`, {data : conversationData}); //Todo: for the live server only "/conversations/" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },
  
  deleteConversation: async (conversationId = "tDtDnQdgm2LXpyiqYvZ6") => { //Remove default param only for mock
    try {
      const response = await httpClient.delete(`/39582856/conversations/${conversationId}`); //Todo: for the live server only "/conversations/${conversationId}" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  }
}

export default conversationsService;
