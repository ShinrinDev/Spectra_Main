import { images } from "@/assets/assets";

export const projectsTableData = [
  {
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
      leadLocations: [
        { lat: 40.7128, lng: -74.006 }, // New York
        { lat: 48.8566, lng: 2.3522 }, // Paris
        { lat: 35.6895, lng: 139.6917 }, // Tokyo
      ],  leadResponseDates: [
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
      ], // Example industries
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
  {
    img: images.client5,
    name: "Reach",
    members: [
      { img: images.lead6, name: "Digital Marketing Expert" },
      { img: images.lead7, name: "5Star Nation" },
    ],
    budget: "R3,000",
    completion: 10,
    phone: "+27 234 567 890",
    contactPerson: "Ryan Tompson",
    email: "reach@samplemail.com",
    plan: 60,
    active: false,
    description: "Digital marketing consultancy.",
    address: "456 Marketing Avenue, Johannesburg, South Africa",
    historyTransactions: [
      { date: "2023-09-15", amount: "R1,000" },
      { date: "2023-10-10", amount: "R2,000" },
    ],
    leadsHistory: [
      { name: "Digital Marketing Expert", date: "2023-07-10", note: "Provided SEO strategy review." },
      { name: "5Star Nation", date: "2023-08-25", note: "Social media engagement proposal." },
    ],
    notes: [
      { date: "2023-07-15", note: "Currently evaluating contract renewal based on performance." },
      { date: "2023-08-20", note: "Exploring partnership opportunities in influencer marketing." },
      { date: "2023-09-05", note: "Needs assistance with SEO to improve online visibility." },
    ],
    
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" },
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10" },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01" },
    ],
  },
  {
    img: images.client7,
    name: "Sale Sutopia",
    members: [
      { img: images.lead8, name: "BizTech" },
      { img: images.lead4, name: "FinTech Innovator" },
    ],
    budget: "R55,000",
    completion: 100,
    plan: 150,
    phone: "+27 345 678 901",
    contactPerson: "Jessica Doe",
    email: "salesutopia@samplemail.com",
    active: true,
    description: "Retail tech solutions provider.",
    address: "789 Commerce St, Durban, South Africa",
    historyTransactions: [
      { date: "2023-08-22", amount: "R25,000" },
      { date: "2023-09-30", amount: "R30,000" },
    ],
    leadsHistory: [
      { name: "BizTech", date: "2023-07-05", note: "Introduced new retail software." },
      { name: "FinTech Innovator", date: "2023-07-20", note: "Demoed fintech solutions." },
    ],
    notes: [
      { date: "2023-07-15", note: "High-performing client, noted for innovative solutions." },
      { date: "2023-08-10", note: "Recently expanded to include e-commerce solutions for retailers." },
      { date: "2023-09-18", note: "Focus on integrating AI for personalized shopping experiences." },
    ],
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" },
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10" },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01" },
    ],
  },
  {
    img: images.client4,
    name: "Vision AI",
    members: [
      { img: images.lead7, name: "5Star Nation" },
      { img: images.lead4, name: "FinTech Innovator" },
      { img: images.lead2, name: "Pharma Lead" },
      { img: images.lead5, name: "Retail Sales Lead" },
    ],
    budget: "R20,500",
    completion: 100,
    phone: "+27 456 789 012",
    contactPerson: "Alexander Smith",
    email: "visionai@samplemail.com",
    active: true,
    plan: 100,
    description: "Innovative AI-driven solutions.",
    address: "101 AI Lane, Pretoria, South Africa",
    completion: 80,
    totalLeads: 150,
    contacted: 120,
    positiveResponses: 90,
    historyTransactions: [
      { date: "2023-09-05", amount: "R10,000" },
      { date: "2023-10-15", amount: "R10,500" },
    ],
    leadsHistory: [
      { name: "5Star Nation", date: "2023-08-05", note: "Explored partnership on AI projects." },
      { name: "Retail Sales Lead", date: "2023-08-18", note: "AI sales automation review." },
    ],
    notes: [
      { date: "2023-07-25", note: "Exploring AI applications in healthcare; potential for future collaborations." },
      { date: "2023-08-12", note: "Testing new AI models for predictive analytics in retail." },
      { date: "2023-09-20", note: "Considering partnerships in sectors like education and finance." },
    ],
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" },
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10" },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01" },
    ],
    leadLocations: [
      { lat: 37.7749, lng: -122.4194 }, // San Francisco
      { lat: 51.5074, lng: -0.1278 }, // London
      { lat: -33.8688, lng: 151.2093 }, // Sydney
    ],
    leadResponseDates: [
      "2024-11-01",
      "2024-11-02",
      "2024-11-03",
      "2024-11-04",
      "2024-11-05",
      "2024-11-06",
      "2024-11-07",
    ],
    leadResponseValues: [30, 45, 50, 55, 65, 70, 80], // Example values representing lead responses
  
    targetedIndustries: [
      "Technology",
      "Healthcare",
      "Finance",
      "Manufacturing",
      "Retail",
    ], // Example industries
    targetedIndustriesValues: [40, 20, 10, 15, 15],
  },
  {
    img: images.client3,
    name: "Harris",
    members: [{ img: images.lead6, name: "Digital Marketing Expert" }],
    budget: "R5,000",
    completion: 25,
    phone: "+27 567 890 123",
    contactPerson: "Alexander Smith",
    email: "harris@samplemail.com",
    plan: 200,
    active: false,
    description: "Healthcare equipment distributor.",
    address: "202 Medical Drive, Bloemfontein, South Africa",
    historyTransactions: [
      { date: "2023-07-12", amount: "R2,500" },
      { date: "2023-08-18", amount: "R2,500" },
    ],
    leadsHistory: [
      { name: "Digital Marketing Expert", date: "2023-06-15", note: "Discussed healthcare ad campaign." },
    ],
    notes: [
      { date: "2023-06-20", note: "Paused due to regulatory reviews; awaiting approvals for continued engagement." },
      { date: "2023-07-15", note: "Recently developed partnerships with hospitals for specialized equipment." },
      { date: "2023-08-05", note: "Interested in expanding into telehealth equipment distribution." },
    ],
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" },
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10" },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01" },
    ],
  },
  {
    img: images.client1,
    name: "Chiro Launch",
    members: [
      { img: images.lead3, name: "AgriTech Lead" },
      { img: images.lead2, name: "Pharma Lead" },
    ],
    budget: "R2,000",
    completion: 40,
    phone: "+27 678 901 234",
    plan: 50,
    contactPerson: "Romina Hadid",
    email: "chirolaunch@samplemail.com",
    active: true,
    description: "Startup incubator for chiropractors.",
    address: "303 Wellness Ave, Cape Town, South Africa",
    historyTransactions: [
      { date: "2023-06-30", amount: "R500" },
      { date: "2023-07-31", amount: "R1,500" },
    ],
    leadsHistory: [
      { name: "AgriTech Lead", date: "2023-05-20", note: "Presented startup package options." },
      { name: "Pharma Lead", date: "2023-06-25", note: "Workshop on medical product distribution." },
    ],
    notes: [
      { date: "2023-06-15", note: "Upcoming initiative for health-tech investment; high growth potential." },
      { date: "2023-07-01", note: "Preparing for a new funding round aimed at startup support." },
      { date: "2023-08-10", note: "Launching workshops to attract chiropractic innovators." },
    ],
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" },
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10" },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01" },
    ],
  },
  {
    img: images.client5,
    name: "Red 2 Green",
    members: [
      { img: images.lead4, name: "FinTech Innovator" },
      { img: images.lead8, name: "BizTech" },
      { img: images.lead1, name: "Logistics Lead" },
      { img: images.lead5, name: "Retail Sales Lead" },
    ],
    budget: "R25,000",
    completion: 60,
    phone: "+27 789 012 345",
    contactPerson: "Jessica Doe",
    email: "red2green@samplemail.com",
    active: false,
    plan: 150,
    description: "Environmental impact consultancy.",
    address: "404 Eco Park, Johannesburg, South Africa",
    historyTransactions: [
      { date: "2023-08-25", amount: "R10,000" },
      { date: "2023-09-20", amount: "R15,000" },
    ],
    leadsHistory: [
      { name: "FinTech Innovator", date: "2023-07-10", note: "Proposed eco-friendly financing options." },
      { name: "BizTech", date: "2023-08-01", note: "Discussed green tech solutions." },
    ],
    notes: [
      { date: "2023-07-05", note: "Developing sustainable partnerships; in talks with eco-friendly brands." },
      { date: "2023-08-15", note: "Focused on expanding environmental consulting services in renewable energy." },
      { date: "2023-09-25", note: "Recently initiated a program to educate businesses on sustainability practices." },
    ],
    invoices: [
      { id: 1, service: "Poultry delivery", amount: 2000, status: "Paid", dueDate: "2023-11-01" },
      { id: 2, service: "Supply contract", amount: 12000, status: "Overdue", dueDate: "2023-11-10" },
      { id: 3, service: "Additional supplies", amount: 5000, status: "Unpaid", dueDate: "2023-12-01" },
    ],
  },
];

export default projectsTableData;
