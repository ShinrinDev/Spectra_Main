import React, { useState, useEffect } from 'react';
import { images } from "@/assets/assets";
import httpClient from "@/services/http-client";

const conversationsService = {

  //Go High Public API Call
  fetchConversations: async () => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582856/conversations/search`, { params: { locationId: 'ABCHkzuJQ8ZMd4Te84GK' } }); //Todo: for the live server on "/conversations/${conversationId}" required
      return response.data.conversations;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },

  fetchConversation: async (conversationId = "tDtDnQdgm2LXpyiqYvZ6") => { //Remove default param only for mock
    try {
      const response = await httpClient.get(`/39582856/conversations/${conversationId}`); //Todo: for the live server on "/conversations/${conversationId}" required
      return response.data;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },

  createConversation: async (conversationsData = { locationId: 'tDtDnQdgm2LXpyiqYvZ6', contactId: 'tDtDnQdgm2LXpyiqYvZ6' }) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582856/conversations/`, { data: conversationsData }); //Todo: for the live server only "/conversations/" required
      return response.data.conversation;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },

  updateConversation: async (conversationId = 'tDtDnQdgm2LXpyiqYvZ6', conversationData = {
    locationId: 'tDtDnQdgm2LXpyiqYvZ6',
    unreadCount: 1,
    starred: true,
    feedback: {}
  }) => { //Remove default param only for mock
    try {
      const response = await httpClient.put(`/39582856/conversations/${conversationId}`, { data: conversationData }); //Todo: for the live server only "/conversations/" required
      return response.data.conversation;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },

  deleteConversation: async (conversationId = "tDtDnQdgm2LXpyiqYvZ6") => { //Remove default param only for mock
    try {
      const response = await httpClient.delete(`/39582856/conversations/${conversationId}`); //Todo: for the live server only "/conversations/${conversationId}" required
      return response.data;
    } catch (err) {
      throw new Error('Error fetching conversations');
    }
  },

  fetchMessageByConversationId: async (conversationId = 'tDtDnQdgm2LXpyiqYvZ6'
  ) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582856/conversations/${conversationId}/messages`); //Todo: for the live server only "/conversations/messages" required
      return response.data;
    } catch (err) {
      throw new Error('Error sending a message');
    }
  },

  sendNewMessage: async (conversationId = 'tDtDnQdgm2LXpyiqYvZ6', messageData = {
    type: 'SMS', //required
    contactId: 'string', //required
    appointmentId: 'string',
    attachments: ['string'],
    emailFrom: 'string',
    emailCc: ['string'],
    emailBcc: ['string'],
    html: 'string',
    message: 'string',
    subject: 'string',
    replyMessageId: 'string',
    templateId: 'string',
    scheduledTimestamp: 1669287863,
    conversationProviderId: 'string',
    emailTo: 'string',
    emailReplyMode: 'reply',
    fromNumber: '+1499499299',
    toNumber: '+1439499299'
  }
  ) => { //Remove default param only for mock
    try {
      const response = await httpClient.post(`/39582856/conversations/messages`, { data: messageData }); //Todo: for the live server only "/conversations/messages" required
      return response.data;
    } catch (err) {
      throw new Error('Error sending a message');
    }
  },


  updateMessageStatus: async (messageId = 've9EPM428h8vShlRW1KT', messageData = {
    status: 'read',
    error: { code: '1', type: 'saas', message: 'There was an error from the provider' },
    emailMessageId: 've9EPM428h8vShlRW1KT',
    recipients: ['string']
  }
  ) => { //Remove default param only for mock
    try {
      const response = await httpClient.put(`/39582856/conversations/messages/${messageId}/status`, { data: messageData }); //Todo: for the live server only "/conversations/messages/${messageId}/status" required
      return response.data;
    } catch (err) {
      throw new Error('Error sending a message');
    }


  }
}

export default conversationsService;
