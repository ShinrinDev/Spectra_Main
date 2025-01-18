import { images } from "@/assets/assets";
import { authorsTableData, projectsTableData } from "@/data";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Textarea,
  Tooltip,
  Typography
} from "@material-tailwind/react";
import { db } from "@/firebase";
import { jsPDF } from "jspdf";
import { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
//import Chart from "chart.js/auto";
import EmailGenerationDialog from "@/components/dialogs/EmailGenerationDialog";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { ArcElement, CategoryScale, Chart as ChartJS, DoughnutController, Legend, LinearScale, LineController, LineElement, PointElement, Title } from "chart.js";
import { collection, doc, getDoc, getDocs,setDoc, getFirestore, query, where,updateDoc } from "firebase/firestore";
import "leaflet/dist/leaflet.css";
import { Ellipsis } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement,LineController,DoughnutController, Title, Legend, ArcElement);

export function Tables() {
  const { user } = useAuth();
  const firestore = getFirestore();
  const [openModal, setOpenModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openFinanceModal, setOpenFinanceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ service: "", amount: "", dueDate: "" });
  const [selectedPerson, setSelectedPerson] = useState(null); // State for selected person
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [CurrentClient, setCurrentClient] = useState("");
  const [ShowStatsModal, setShowStatsModal] = useState(false);
  const [documents, setDocuments] = useState(selectedClient?.documents || []);
  const [selectedBank, setSelectedBank] = useState("");


  const [thirdParty, setThirdParty] = useState([
    { id: 1, link: selectedClient?.thirdParty?.[0] || "thirdParty link" },

  ]);
  const [showEmailsModal, setShowEmailsModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyContent, setReplyContent] = useState("");

  const [Role, setRole] = useState("")



  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(firestore, "suser", user.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            console.log("You fucked up!!!!!")
          }

        } catch (error) {
          console.error("Some Error fetching user data: ", error);
        }
      }
    }

    fetchUserData();
  }, [user]);

  console.log("User Role for invoice:", Role);
  // Dummy email data
  const emails = [
    {
      id: 1,
      sender: "john.doe@example.com",
      subject: "Meeting Follow-up",
      content: "Thank you for the meeting earlier. Looking forward to your response!",
      flagged: false,
    },
    {
      id: 2,
      sender: "team@newsletter.com",
      subject: "Weekly Update",
      content: "Here's our weekly update. We've added exciting new features!",
      flagged: false,
    },
    {
      id: 3,
      sender: "support@service.com",
      subject: "Password Reset",
      content: "Your password reset was successful. If this wasn't you, contact us immediately.",
      flagged: false,
    },
  ];
  const handleBankChange = (e) => {
    setSelectedBank(e.target.value);
  };

  const saveBankDetails = async () => {
    if (!selectedBank) {
      alert("Please select a bank before saving.");
      return;
    }

    try {
      const bankDetails = {
        bankName: selectedBank,
        accountNumber: "1234567890", // Replace with actual details
        routingNumber: "987654321", // Replace with actual details
      };

      const userDocRef = doc(firestore, "userBankDetails", selectedClient.id); // Adjust path
      await updateDoc(userDocRef, { bankDetails });

      alert("Bank details saved successfully!");
    } catch (error) {
      console.error("Error saving bank details: ", error);
    }
  };

  const handleReply = () => {
    if (replyContent.trim()) {
      alert(`Reply sent:\n\n${replyContent}`);
      setReplyContent("");
    }
  };

  const handleFlagAsPositive = (emailId) => {
    const emailIndex = emails.findIndex((email) => email.id === emailId);
    if (emailIndex !== -1 && !emails[emailIndex].flagged) {
      emails[emailIndex].flagged = true;
      CurrentClient.positiveResponses += 1; // Increment positive responses
    }
  };


  const [resources, setResources] = useState([]);

  // State for tracking the currently edited resource
  const [editingResource, setEditingResource] = useState(null);



  // Function to handle adding new resource
  // Function to handle changes in the resource name
  const handleResourceNameChange = (index, newName) => {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources[index].name = newName;
      return updatedResources;
    });
  };

  // Function to handle changes in the resource content
  const handleResourceContentChange = (index, newContent) => {
    setResources((prevResources) => {
      const updatedResources = [...prevResources];
      updatedResources[index].content = newContent;
      return updatedResources;
    });
  };

  // Function to handle adding a new resource
  const handleAddResource = () => {
    const newResource = {
      id: Date.now(), // Unique ID for the resource
      name: "", // Default empty name
      content: "", // Default empty content
    };
    setResources((prevResources) => [...prevResources, newResource]);
    setEditingResource(resources.length); // Automatically edit the newly added resource
  };

  // Function to handle adding new third-party link
  const handleAddThirdParty = () => {
    const newParty = { id: Date.now(), name: "", link: "" };
    setThirdParty([...thirdParty, newParty]);
  };

  // Function to handle document upload
  const handleDocumentUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newDocument = { id: Date.now(), name: file.name, file };
      setDocuments([...documents, newDocument]);
    }
  };

  // Function to handle editing resource
  const handleResourceEdit = (index, name, link) => {
    const updatedResources = [...resources];
    updatedResources[index] = { id: updatedResources[index].id, name, link };
    setResources(updatedResources);
  };

  // Function to handle editing third-party link
  const handleThirdPartyEdit = (index, name, link) => {
    const updatedThirdParty = [...thirdParty];
    updatedThirdParty[index] = { id: updatedThirdParty[index].id, name, link };
    setThirdParty(updatedThirdParty);
  };

  // Function to handle copying resource link to clipboard
  const handleCopy = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  // Function to handle removing resource
  const handleRemoveResource = (index) => {
    const updatedResources = resources.filter((_, i) => i !== index);
    setResources(updatedResources);
  };

  // Function to handle removing third-party link
  const handleRemoveThirdParty = (index) => {
    const updatedThirdParty = thirdParty.filter((_, i) => i !== index);
    setThirdParty(updatedThirdParty);
  };

  // Function to handle document deletion
  const handleDocumentDelete = (index) => {
    const updatedDocuments = documents.filter((_, i) => i !== index);
    setDocuments(updatedDocuments);
  };

  // Function to handle document viewing
  const handleDocumentView = (doc) => {
    const fileURL = URL.createObjectURL(doc.file);
    window.open(fileURL, "_blank");
  };



  const handleCloseEditDialog = () => {
    setSelectedPerson(null);
    setIsEditDialogOpen(false);
  };

  const handleCloseDialog = () => {
    setSelectedPerson(null);
    setIsDialogOpen(false);
  };

  // Handlers for modals
  const handleClientViewClick = (client) => {
    setSelectedClient(client);
    setOpenClientModal(true);
  };
  const closeClientModal = () => {
    setOpenModal(false);
    setSelectedClient(null);
  };

  
  const closeFinanceModal = () => {
    setOpenFinanceModal(false);
    setSelectedClient(null);
  };

  const logoUrl = images.logo;

  //Fecth invoice details...
  const [selectedID, setSelectedID] = useState(null);
  const [financialData,setFinancialData] = useState([]);
const handleFinanceClick = (client) => {
  setSelectedID(client);
  setOpenFinanceModal(true);
  };
  useEffect(() => {
    const fetchInvoices = async () => {
      if (!selectedID) return;
  
      try {
        const invRef = collection(db, "invoices");
        const invQuery = query(invRef, where("uid", "==", selectedID));
        const invSnap = await getDocs(invQuery);
  
        // Iterate over documents in the snapshot
        const invoices = [];
        invSnap.forEach((doc) => {
          invoices.push({ id: doc.id, ...doc.data() });
        });
        
        setFinancialData(invoices)
        console.log("Invoices:", invoices); // Logs all invoices for the selected ID
      } catch (error) {
        console.error("Error fetching invoices:", error);
      }
    };
  
    fetchInvoices();
  }, [selectedID]);

  console.log("invoices map:",)
  

  // PDF Export function for invoices

  const exportInvoiceAsPDF = async (invoice, selectedClient) => {
    const doc = new jsPDF();

    // Add the logo (if available)
    /* if (logoUrl) {
       doc.addImage(images.logo, "PNG", 10, 10, 50, 30);
     }*/

    // Header: Company Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Spectra Acquisition", 30, 20, { align: "center" });

    doc.setFont("helvetica", "normal");

    // Invoice Number and Dates
    doc.setFontSize(12);
    doc.text(`Invoice: ${invoice.id}`, 150, 20);
    doc.text(`Issued on: ${invoice.issueDate}`, 150, 28);
    doc.text(`Due by: ${invoice.dueDate}`, 150, 36);


    doc.setFont("helvetica", "bold");
    doc.text("From:", 10, 50);
    doc.setFontSize(12);
    doc.setFont("helvetic", "normal");
    doc.text("Spectra Acquisition", 10, 58);
    doc.text("zane@spectraacquisition.com", 10, 66);
    doc.text("+447418355227", 10, 74);
    doc.text("spectraacquisition.com", 10, 82);

    // Recipient Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("To:", 120, 50);
    doc.setFont("helvetica", "normal");
    doc.text(selectedClient.name, 120, 58);
    doc.text(selectedClient.contactPerson, 120, 66)
    doc.text(selectedClient.email, 120, 74);
    doc.text(selectedClient.phone, 120, 82);
    doc.text(selectedClient.address, 120, 90);


    doc.setFont("helvetic", "bold");
    doc.text("Remarks", 10, 100);
    doc.setFont("helvetica", "normal");
    doc.text("Bank name:", 10, 108);
    doc.text("Barclays", 10, 116);
    doc.text("Sort code:", 10, 126);
    doc.text("231486", 10, 134);
    doc.text("Account number:", 10, 142);
    doc.text("15167151", 10, 150);
    doc.text("Beneficiary name:", 10, 158);
    doc.text("Zane Czepek", 10, 166);
    doc.text("067 718 3670", 10, 176);
    // Separator Line
    doc.setDrawColor(150);
    doc.line(10, 185, 200, 185);

    // Product Table Header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Product", 10, 195);
    doc.text("Quantity", 70, 195);
    doc.text("Unit Price", 100, 195);
    doc.text("Tax", 130, 195);
    doc.text("Total", 160, 195);


    // Product Table Content
    let y = 235;
    /*doc.setFont("helvetica", "normal");
    invoice.products.forEach((product) => {
      doc.text(product.name, 10, y);
      doc.text("10", 70, y);
      doc.text(`£ ${invoice.amount.toFixed(2)}`, 100, y);
      doc.text(`£ ${product.tax.toFixed(2)}`, 130, y);
      doc.text(`£ ${invoice.amount.toFixed(2)}`, 160, y);
      y += 10;
    });*/

    // Invoice Summary
    y += 10;
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Summary", 10, y);
    y += 10;
    doc.setFont("helvetica", "normal");
    doc.text(`Subtotal: £ ${invoice.amount.toFixed(2)}`, 10, y);
    doc.text(`Tax: £ ${invoice.tax.toFixed(2)}`, 10, y + 10);
    doc.text(`Total: £ ${invoice.amount.toFixed(2)}`, 10, y + 20);

    // Remarks Section
    y += 40;

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank you for choosing Spectra Acquisition!", 105, 280, { align: "center" });


    // Save the PDF
    doc.save(`Invoice_${invoice.id}.pdf`);
  };


  const exportWeeklySummaryAsPDF = async (client) => {
    const doc = new jsPDF();

    // Header: Company Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Spectra Acquisition", 30, 20, { align: "center" });

    doc.setFont("helvetica", "normal");
    // Weekly Summary Title
    doc.setFontSize(14);
    doc.text("Weekly Summary", 10, 35);

    let x = 50;
    let u = 10;
    doc.setFont("helvetica", "bold");
    doc.text("From:", u, x);
    doc.setFont("helvetica", "normal");
    doc.text("Spectra Acquisition", u, x + 8);
    doc.text("zane@spectraacquisition.com", u, x + 16);
    doc.text("+447418355227", u, x + 24);
    doc.text("spectraacquisition.com", u, x + 32);

    let k = 140;
    // Recipient Details
    doc.setFont("helvetica", "bold");
    doc.text("To:", k, x);
    doc.setFont("helvetica", "normal");
    doc.text(client.name, k, x + 8);
    doc.text(client.contactPerson || '', k, x + 16);
    doc.text(client.email || '', k, x + 24);
    doc.text(client.phone || '', k, x + 32);

    // Separator Line
    doc.setDrawColor(150);
    doc.line(10, 110, 200, 110);

    // Product Table Header
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Product", 10, 120);
    doc.text("Quantity", 115, 120);
    doc.text("Unit Price", 140, 120);
    doc.text("Tax", 160, 120);
    doc.text("Total", 185, 120);

    // Weekly Summary Data
    const totalInvoices = client.invoices.length;
    const totalAmount = client.invoices.reduce((sum, invoice) => sum + parseFloat(invoice.amount), 0);
    const tax = totalAmount * 0.15;
    const totalWithTax = totalAmount + tax;

    let y = 130;

    // Products Row
    doc.setFont("helvetica", "normal");
    doc.text(client.invoices.map((invoice) => invoice.service).join(", "), 10, y);
    doc.text(`${totalInvoices}`, 115, y, { align: "center" });
    doc.text("£ 600", 140, y);
    doc.text(`£ ${tax.toFixed(2)}`, 160, y);
    doc.text(`£ ${totalWithTax.toFixed(2)}`, 185, y);

    // Separator Line
    y += 10;
    doc.setDrawColor(150);
    doc.line(10, y, 200, y);

    // Footer Section
    y += 20;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank you for reviewing the weekly summary!", 105, 280, { align: "center" });

    // Save the PDF
    doc.save(`Weekly_Summary_${client.name}.pdf`);
  };

  // Handle new invoice creation
  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  const createNewInvoice = () => {
    if (selectedClient) {
      selectedClient.invoices.push({
        id: selectedClient.invoices.length + 1,
        service: newInvoice.service,
        amount: newInvoice.amount,
        status: "Unpaid",
        dueDate: newInvoice.dueDate,
      });
      setNewInvoice({ service: "", amount: "", dueDate: "" });
    }
  };
  const [selectedClientId, setSelectedClientId] = useState(null);

  const handleViewClick = (clientId) => {
    setSelectedClientId(clientId); // Store the selected client ID
    setOpenModal(true); // Open the modal
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedClient(null);
  };

  //Get clients data from firebase...
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const clientRef = collection(db, "users");
        const clientQuery = query(clientRef,
          where("isVerified","==", true)
        );
        const querySnapshot = await getDocs(clientQuery);
        const clientsData = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const clientData = docSnapshot.data();

            // Fetch leads for the client
            const leads = await Promise.all(
              (clientData.leads || []).map(async (leadId) => {
                const leadDoc = await getDoc(doc(db, "leads", leadId));
                return { id: leadId, ...leadDoc.data() };
              })
            );

            return {
              id: docSnapshot.id,
              ...clientData,
              leads,
            };
          })
        );

        setClients(clientsData);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchClients();
  }, []);

  const [responses, setResponses] = useState([]);
  const [selectedDetails,setSelectedDetails] = useState(null);

 useEffect(() => {
  const fetchClientDetails = async () => {
    if (!selectedClientId) return;

    try {
      // Fetch client details
      const clientDoc = await getDoc(doc(db, "users", selectedClientId));
      console.log("IS client??", clientDoc);
      if (clientDoc.exists()) {
        setSelectedDetails(clientDoc.data());


        console.log("Client data:>", clientDoc.data());
      }

      // Fetch onboarding answers
      const onboardingAnswersDoc = await getDoc(doc(db, "onboardingAnswers", selectedClientId));
      if (onboardingAnswersDoc.exists()) {
        setResponses(onboardingAnswersDoc.data().responses || []);

        console.log("Respondeddede daatatata===>>>>:", onboardingAnswersDoc.data())
      }
    } catch (error) {
      console.error("Error fetching client details:", error);
    }
  };

  fetchClientDetails();

  console.log("Responses:", responses);
  console.log("Client:", selectedDetails);

}, [selectedClientId]);




const [isBoarded, setIsBoarded] = useState(false);
const [instantlyKey, setInstantlyKey] = useState('');
const [industries, setIndustries] = useState([]);
const [industryName, setIndustryName] = useState('');
const [industryPercentage, setIndustryPercentage] = useState('');

const lineChartRef = useRef(null);
const doughnutChartRef = useRef(null);

const [clientUid,setClientUid] = useState("");
const [currentStats,setCurrentStats] = useState(null);


const handleOpenStats = (clientid) =>{
  setClientUid(clientid);
  setShowStatsModal(true);
}

const handleCloseStatsModal = () => {
  setShowStatsModal(false);
  setCurrentStats(null);
};

useEffect(() => {
  const fetchClientData = async () => {
    if (clientUid) {
      const userDocRef = doc(db, 'users', clientUid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsBoarded(userData.borded === true);

        if (userData.borded) {
          const statsDocRef = doc(db, 'stats', clientUid);
          const statsDoc = await getDoc(statsDocRef);

          if (statsDoc.exists()) {
            const statsData = statsDoc.data();

            // Ensure leads tracking is initialized
            if (!statsData.leadsByMonth) {
              const initialLeads = {
                leadsByMonth: Array(12).fill(0), // Initialize months with 0 leads
              };
              await updateDoc(statsDocRef, initialLeads);
              statsData.leadsByMonth = initialLeads.leadsByMonth;
            }

            setCurrentStats(statsData);
          } else {
            setCurrentStats(null);
          }
        }
      }
    }
  };

  fetchClientData();
}, [clientUid]);

useEffect(() => {
  if (currentStats) {
    // Initialize Line Chart for Leads Over Time
    const ctxLine = lineChartRef.current.getContext('2d');
    new ChartJS(ctxLine, {
      type: 'line',
      data: {
        labels: Array.from({ length: 12 }, (_, i) => new Date(0, i).toLocaleString('default', { month: 'short' })),
        datasets: [
          {
            label: 'Leads Over Time',
            data: currentStats.leadsByMonth || Array(12).fill(0),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Leads Over Time (Monthly)',
          },
        },
      },
    });

    // Initialize Doughnut Chart for Industries
    const ctxDoughnut = doughnutChartRef.current.getContext('2d');
    new ChartJS(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: Object.keys(currentStats.industries || {}),
        datasets: [
          {
            label: 'Targeted Industries',
            data: Object.values(currentStats.industries || {}),
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6'],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Industries Breakdown',
          },
        },
      },
    });
  }
}, [currentStats]);

const handleBoardClient = async () => {
  if (!instantlyKey || industries.length === 0) {
    alert('Please provide all required inputs.');
    return;
  }

  const statsData = {
    instantKey: instantlyKey,
    industries: industries.reduce((acc, { name, percentage }) => {
      acc[name] = percentage;
      return acc;
    }, {}),
    campaignKeys: [],
    leadsByMonth: Array(12).fill(0), // Initialize monthly leads with 0
  };

  await setDoc(doc(db, 'stats', clientUid), statsData);
  setCurrentClient(statsData);
  setIsBoarded(true);

  // Update the user's `borded` status
  await setDoc(doc(db, 'users', clientUid), { borded: true }, { merge: true });
};

const addIndustry = () => {
  if (!industryName || !industryPercentage) {
    alert('Please enter a valid industry and percentage.');
    return;
  }

  setIndustries((prev) => [...prev, { name: industryName, percentage: industryPercentage }]);
  setIndustryName('');
  setIndustryPercentage('');
};

const [isEmailGenDialogOpen,setIsEmailGenDialogOpen] = useState(false)
const handleEmailGenDialogOpen = () => setIsEmailGenDialogOpen(!isEmailGenDialogOpen);
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      
      <Card className="dark:bg-gray-900">
      <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
        <Typography variant="h6" color="white">
          Clients
        </Typography>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Companies", "Leads", "Stats", "Actions"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase text-blue-gray-400 dark:text-white"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((client, key) => {
              const className = `py-3 px-5 ${
                key === clients.length - 1 ? "" : "border-b border-blue-gray-50"
              }`;

              return (
                <tr key={client.id}>
                  <td className={className}>
                    <div className="flex items-center gap-4">
                      {/* Replace Avatar with a div that mimics the avatar */}
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
                        {client.name[0].toUpperCase()}
                      </div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold dark:text-[#fad949]"
                      >
                        {client.name}
                      </Typography>
                    </div>
                  </td>
                  <td className={className}>
                    <div className="flex gap-2">
                      {client.leads.map((lead) => (
                        <Tooltip key={lead.id} content={lead.name}>
                          {/* Mimic avatar with a div */}
                          <div
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-gray-500 text-white"
                            title={lead.name}
                          >
                            {lead.name[0].toUpperCase()}
                          </div>
                        </Tooltip>
                      ))}
                    </div>
                  </td>
                  <td className={className}>
                    <Button
                      size="sm"
                      variant="gradient"
                      color="#fad949"
                      onClick={() => handleOpenStats(client.uid)}
                    >
                      View Stats
                    </Button>
                  </td>
                  <td className={className}>
                    <div className="flex gap-2">
                      {Role === "Admin" && (
                        <Button
                          size="sm"
                          variant="gradient"
                          color="#fad949"
                          onClick={() => handleFinanceClick(client.uid)}
                        >
                          Invoice
                        </Button>
                      )}
                      <Menu>
                        <MenuHandler>
                          <Ellipsis className="cursor-pointer" />
                        </MenuHandler>
                        <MenuList>
                          <MenuItem onClick={() => handleViewClick(client.uid)}>
                            View details
                          </MenuItem>
                          <MenuItem onClick={() => setIsEmailGenDialogOpen(true)}>
                            <span variant="gradient">Generate email</span>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    <EmailGenerationDialog uid={client.uid} handleOpen={handleEmailGenDialogOpen} open={isEmailGenDialogOpen}/>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>


      {/* Stats Details Modal */}
      <Dialog open={ShowStatsModal} onClose={handleCloseStatsModal} maxWidth="md" fullWidth scroll="paper">
      <DialogHeader>Client Stats</DialogHeader>
      <DialogBody divider className="max-h-[400px] overflow-y-scroll">
        <div className="p-6" style={{ overflowY: 'auto' }}>
          {!isBoarded ? (
            <div>
              <Typography variant="h5" className="mb-4">
                Board Client
              </Typography>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Instantly Key</label>
                <input
                  type="text"
                  className="w-full border rounded-lg px-3 py-2"
                  value={instantlyKey}
                  onChange={(e) => setInstantlyKey(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Industries</label>
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    placeholder="Industry Name"
                    className="flex-1 border rounded-l-lg px-3 py-2"
                    value={industryName}
                    onChange={(e) => setIndustryName(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Percentage"
                    className="w-24 border rounded-r-lg px-3 py-2"
                    value={industryPercentage}
                    onChange={(e) => setIndustryPercentage(e.target.value)}
                  />
                  <Button size="sm" variant="gradient" color="blue" className="ml-2" onClick={addIndustry}>
                    Add
                  </Button>
                </div>
                <div>
                  {industries.map((ind, index) => (
                    <p key={index} className="text-gray-700">
                      {ind.name}: {ind.percentage}%
                    </p>
                  ))}
                </div>
              </div>
              <Button size="sm" variant="gradient" color="green" onClick={handleBoardClient}>
                Board Client
              </Button>
            </div>
          ) : (
            currentStats && (
              <>
                <Typography variant="h5" className="mb-4">
                  {currentStats.instantKey} - Stats
                </Typography>
                <div className="mb-4">
                  <p className="text-gray-700">
                    <strong>Instantly Key:</strong> {currentStats.instantKey}
                  </p>
                </div>
                <div className="mb-6">
                  <canvas ref={lineChartRef} width="400" height="200"></canvas>
                </div>
                <div className="mb-6">
                  <canvas ref={doughnutChartRef} width="300" height="300"></canvas>
                </div>
              </>
            )
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button size="sm" variant="gradient" color="red" onClick={handleCloseStatsModal}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>

      {/* Emails Popup */}
      <Dialog open={showEmailsModal} onClose={() => setShowEmailsModal(false)} maxWidth="md" fullWidth>
        <DialogHeader>Emails</DialogHeader>
        <DialogBody divider>
          <div className="overflow-y-auto max-h-[400px]">
            <ul>
              {emails.map((email) => (
                <li
                  key={email.id}
                  className="p-3 rounded-lg bg-gray-100 mb-3 cursor-pointer hover:bg-gray-200"
                  onClick={() => setSelectedEmail(email)}
                >
                  <div className="font-medium text-gray-700">{email.sender}</div>
                  <div className="text-sm text-gray-600 truncate">{email.subject}</div>
                </li>
              ))}
            </ul>
          </div>

          {selectedEmail && (
            <div className="mt-4 border-t pt-4">
              <h2 className="text-lg font-semibold">{selectedEmail.subject}</h2>
              <p className="text-gray-700">{selectedEmail.content}</p>

              {/* Reply Section */}
              <Textarea
                className="mt-4"
                rows={4}
                placeholder="Type your reply..."
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
              />
              <div className="flex space-x-2 mt-3">
                <Button variant="gradient" color="green" onClick={handleReply}>
                  Send Reply
                </Button>
                <Button
                  variant="outlined"
                  color="blue"
                  onClick={() => handleFlagAsPositive(selectedEmail.id)}
                >
                  Flag as Positive
                </Button>
              </div>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button size="sm" variant="gradient" color="red" onClick={() => setShowEmailsModal(false)}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>



      {/* Client Details Modal */}
      <Dialog open={openModal} handler={closeClientModal}>
      <DialogHeader>Client Details</DialogHeader>
      <DialogBody divider className="max-h-[400px] overflow-y-scroll">
        {selectedDetails && (
          <div>
            <Typography variant="h6">{selectedDetails.name}</Typography>
            <Typography><strong>Contact Person:</strong> {selectedDetails.person}</Typography>
            <Typography><strong>Email:</strong> {selectedDetails.email}</Typography>
            <Typography><strong>Phone:</strong> {selectedDetails.phone}</Typography>
            <Typography><strong>Address:</strong> {selectedDetails.address}</Typography>

            {/* Onboarding Answers Section */}
            <div className="mt-4">
              <Typography variant="h6" className="text-blue-gray-700">Onboarding Answers</Typography>
              {responses.length > 0 ? (
                responses.map((response, index) => (
                  <div key={index} className="mt-2">
                    <Typography variant="small" className="text-blue-gray-500">
                      <strong>Question:</strong> {response.q}
                    </Typography>
                    <Typography variant="small" className="text-blue-gray-500">
                      <strong>Answer:</strong> {response.a}
                    </Typography>
                  </div>
                ))
              ) : (
                <Typography variant="small" className="text-blue-gray-500">
                  No onboarding answers available.
                </Typography>
              )}
            </div>
          </div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button color="blue-gray" onClick={closeClientModal}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>

      {/* Financial History Modal */}
      <Dialog open={openFinanceModal} handler={closeFinanceModal}>
        <DialogHeader>Financial History</DialogHeader>
        <DialogBody divider className="max-h-[400px] overflow-y-scroll">
            <div>
              <Typography variant="h6">Invoices</Typography>
              {/* Bank Selection */}
              <div className="mt-4">
                <Typography variant="h6">Select Bank</Typography>
                <select
                  className="w-full p-2 border rounded"
                  value={selectedBank}
                  onChange={handleBankChange}
                >
                  <option value="" disabled>
                    -- Select Bank --
                  </option>
                  <option value="Bank A">Barclays</option>
                  <option value="Bank B">Bank Circle S.A</option>
                </select>
                <Button className="mt-4" onClick={saveBankDetails}>
                  Save Bank Details
                </Button>
              </div>
              {/* Existing Invoices */}
              {financialData.map((invoice) => (
                <div key={invoice.id} className="border p-2 mb-2 rounded">
                  <Typography>
                    <strong>Service:</strong> {invoice.product}
                  </Typography>
                  <Typography>
                    <strong>Amount:</strong> {invoice.unit}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong> {invoice.status}
                  </Typography>
                  <Typography>
                    <strong>Due Date:</strong> {invoice.due.toDate().toLocaleDateString()}
                  </Typography>
                  <Button
                    size="sm"
                    color="blue-gray"
                    onClick={() => exportInvoiceAsPDF(invoice, selectedClient)}
                    className="mt-2"
                  >
                    Export as PDF
                  </Button>
                </div>
              ))}

              {/* Weekly Summary */}
              <div className="mt-6 border-t pt-4">
                <Typography variant="h6">Weekly Summary</Typography>
                <Typography>
                  <strong>Total Invoices:</strong> {financialData.length}
                </Typography>
                <Typography>
                  <strong>Total Amount:</strong>
                  {financialData.reduce(
                    (total, invoice) => total + parseFloat(invoice.unit),
                    0
                  ).toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Invoice Names:</strong>{" "}
                  {financialData.map((invoice) => invoice.product).join(", ")}
                </Typography>
                <Button
                  size="sm"
                  color="blue-gray"
                  onClick={() => exportWeeklySummaryAsPDF(selectedClient)}
                  className="mt-4"
                >
                  Export Weekly Summary as PDF
                </Button>
              </div>
            </div>
        </DialogBody>
        <DialogFooter>
          <Button color="blue-gray" onClick={closeFinanceModal}>
            Close
          </Button>
        </DialogFooter>
      </Dialog>

    </div >
  );
}

export default Tables;
