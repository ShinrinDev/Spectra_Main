import { images } from "@/assets/assets";

import React,{useState,useEffect} from "react";

export const projectsTableData = [
  {
    uid: "nJ5gkjbRHpecpJKbP28PmUXCrgJ3",
    img: images.client5,
    name: "The Coopetto",
    members: [
      { img: images.lead1, name: "Logistics Lead" },
      { img: images.lead2, name: "Pharma Lead" },
      { img: images.lead3, name: "AgriTech Lead" },
      { img: images.lead5, name: "Retail Sales Lead" },
    ],
    budget: "R14,000",
    completion: 100,
    phone: "+27 123 456 789",
    contactPerson: "Romina Hadid",
    email: "coopetto@samplemail.com",
    active: true,
    description: "Leading poultry supply chain.",
    address: "123 Farm Lane, Cape Town, South Africa",
    plan: 50,
    completion: 95,
      totalLeads: 200,
      contacted: 180,
      positiveResponses: 160,
      leadResponseDates: [
        "2024-10-15",
        "2024-10-16",
        "2024-10-17",
        "2024-10-18",
        "2024-10-19",
        "2024-10-20",
        "2024-10-21",
      ],
      leadResponseValues: [25, 40, 55, 60, 75, 85, 90], // Another set of example values representing lead responses
    
      targetedIndustries: [
        "Education",
        "Technology",
        "Automotive",
        "Energy",
        "Agriculture",
      ],
      targetedIndustriesValues: [35, 45, 5, 10, 5],
    historyTransactions: [
      { date: "2023-10-01", amount: "R2,000" },
      { date: "2023-11-01", amount: "R12,000" },
    ],
    leadsHistory: [
      { name: "Logistics Lead", date: "2023-08-01", note: "Discussed new delivery routes." },
      { name: "Pharma Lead", date: "2023-09-15", note: "Reviewed safety regulations." },
    ],
    notes: [
      { date: "2023-09-10", note: "Consistent supplier with potential for expansion into new markets." },
      { date: "2023-10-12", note: "Recently streamlined logistics to improve delivery times." },
      { date: "2023-11-05", note: "Considering adding organic product lines to appeal to health-conscious consumers." },
    ],
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" , tax: 200},
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10", tax: 700 },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01", tax: 300 },
    ],
  },
  
];

export default projectsTableData;
