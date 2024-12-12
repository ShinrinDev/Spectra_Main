import React,{useState,useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { authorsTableData, projectsTableData } from "@/data";
import { jsPDF } from "jspdf";
import { images } from "@/assets/assets";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
//import Chart from "chart.js/auto";
import "leaflet/dist/leaflet.css";
import { Line, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Legend,ArcElement  } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Legend, ArcElement);

export function Tables() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openFinanceModal, setOpenFinanceModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState({ service: "", amount: "", dueDate: "" });
  const [selectedPerson, setSelectedPerson] = useState(null); // State for selected person
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); 
  const [CurrentClient,setCurrentClient] = useState("");
const [ShowStatsModal,setShowStatsModal] = useState(false);
const [documents, setDocuments] = useState(selectedClient?.documents || []);


const [thirdParty, setThirdParty] = useState([
  { id: 1, link: selectedClient?.thirdParty?.[0] || "thirdParty link" },
  
]);

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
  
  const lineChartRef = useRef(null);
const doughnutChartRef = useRef(null);
const handleStatsClick = (client) => {
  setCurrentClient(client);
  setShowStatsModal(true);
};
useEffect(() => {
  if (CurrentClient) {
    // Initialize Lead Response Performance Chart
    const ctxLine = lineChartRef.current.getContext('2d');
    new ChartJS(ctxLine, {
      type: 'line',
      data: {
        labels: CurrentClient.leadResponseDates,  // Use the dates from the client
        datasets: [{
          label: 'Lead Response Performance',
          data: CurrentClient.leadResponseValues,  // Use the response values from the client
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Lead Response Over Time'
          }
        }
      }
    });

    // Initialize Targeted Industries Doughnut Chart
    const ctxDoughnut = doughnutChartRef.current.getContext('2d');
    new ChartJS(ctxDoughnut, {
      type: 'doughnut',
      data: {
        labels: CurrentClient.targetedIndustries,  // Use the industries from the client
        datasets: [{
          label: 'Targeted Industries',
          data: CurrentClient.targetedIndustriesValues,  // Use the values from the client
          backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300', '#DAF7A6'], // Customize colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Targeted Industries'
          }
        }
      }
    });
  }
}, [CurrentClient]);

const handleCloseStatsModal = () => {
  setShowStatsModal(false);
};


  const handleEditDetails = (person) => {
    setSelectedPerson(person);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setSelectedPerson(null);
    setIsEditDialogOpen(false);
  };

  const handleSaveDetails = () => {
    // Save edited details to the table
    if (selectedPerson) {
      setAuthorsTableData((prevData) =>
        prevData.map((person) =>
          person.name === selectedPerson.name ? selectedPerson : person
        )
      );
    }
    setIsEditDialogOpen(false);
  };

  const handleChange = (field, value) => {
    setSelectedPerson((prev) => ({ ...prev, [field]: value }));
  };


  const handleViewDetails = (person) => {
    setSelectedPerson(person);
    setIsDialogOpen(true);
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

  const handleFinanceClick = (client) => {
    setSelectedClient(client);
    setOpenFinanceModal(true);
  };
  const closeFinanceModal = () => {
    setOpenFinanceModal(false);
    setSelectedClient(null);
  };

  const logoUrl = images.logo;

  // PDF Export function for invoices

  const exportInvoiceAsPDF = async (invoice,selectedClient) => {
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
    doc.text("From:", 10,50);
    doc.setFontSize(12);
    doc.setFont("helvetic","normal");
    doc.text("Spectra Acquisition", 10, 58);
    doc.text("zane@spectraacquisition.com", 10, 66);
    doc.text("+447418355227",10,74);
    doc.text("spectraacquisition.com",10, 82);
  
    // Recipient Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("To:", 120, 50);
    doc.setFont("helvetica", "normal");
    doc.text(selectedClient.name, 120, 58);
    doc.text(selectedClient.contactPerson, 120,66)
    doc.text(selectedClient.email, 120, 74);
    doc.text(selectedClient.phone, 120, 82);
    doc.text(selectedClient.address, 120, 90);


    doc.setFont("helvetic", "bold");
    doc.text("Remarks",10,100);
    doc.setFont("helvetica", "normal");
    doc.text("Bank name:",10,108);
    doc.text("Barclays",10,116);
    doc.text("Sort code:",10,126);
    doc.text("231486",10,134);
    doc.text("Account number:",10,142);
    doc.text("15167151",10,150);
    doc.text("Beneficiary name:",10,158);
    doc.text("Zane Czepek",10,166);
    doc.text("067 718 3670",10,176);
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
    doc.text("Spectra Acquisition", u, x +8);
    doc.text("zane@spectraacquisition.com", u, x+16);
    doc.text("+447418355227",u,x+24);
    doc.text("spectraacquisition.com",u, x+32);

    let k = 140;
    // Recipient Details
    doc.setFont("helvetica", "bold");
    doc.text("To:", k, x);
    doc.setFont("helvetica", "normal");
    doc.text(client.name, k, x + 8);
    doc.text(client.contactPerson || '', k, x+16);
    doc.text(client.email || '', k, x+24);
    doc.text(client.phone || '', k, x+32);

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
    doc.text(`${totalInvoices}`, 115, y,{ align: "center" });
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

  const handleViewClick = (client) => {
    setSelectedClient(client);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedClient(null);
  };

  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
     <Card className="dark:bg-gray-900">
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            Clients Contact Person
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead>
              <tr>
                {["Person", "Company", "Edit", "Actions"].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left "
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
              {authorsTableData.map((person, key) => {
                const className = `py-3 px-5 ${
                  key === authorsTableData.length - 1
                    ? ""
                    : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={person.name}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar src={person.img} alt={person.name} size="sm" variant="rounded" />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold dark:text-white"
                          >
                            {person.name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500 dark:text-[#fad949]">
                            {person.email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600 dark:text-white">
                        {person.job[0]}
                      </Typography>
                      <Typography className="text-xs font-normal text-blue-gray-500 dark:text-[#fad949]">
                        {person.job[1]}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Button
                        size="sm"
                        variant="text"
                        color="blue"
                        onClick={() => handleEditDetails(person)}
                      >
                        Edit
                      </Button>
                    </td>
                    <td className={className}>
                      <Button
                        size="sm"
                        variant="text"
                        color="blue-gray"
                        onClick={() => alert("View details not implemented")}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
      </Card>
      <Card className="dark:bg-gray-900">
  <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
    <Typography variant="h6" color="white">
      Client's Leads
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
        {projectsTableData.map((clients, key) => {
          const className = `py-3 px-5 ${
            key === projectsTableData.length - 1
              ? ""
              : "border-b border-blue-gray-50"
          }`;

          return (
            <tr key={clients.name}>
              <td className={className}>
                <div className="flex items-center gap-4">
                  <Avatar src={clients.img} alt={clients.name} size="sm" />
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-bold dark:text-[#fad949]"
                  >
                    {clients.name}
                  </Typography>
                </div>
              </td>
              <td className={className}>
                {clients.members.map(({ img, name }, key) => (
                  <Tooltip key={name} content={name}>
                    <Avatar
                      src={img}
                      alt={name}
                      size="xs"
                      variant="circular"
                      className={`cursor-pointer border-2 border-white ${
                        key === 0 ? "" : "-ml-2.5"
                      }`}
                    />
                  </Tooltip>
                ))}
              </td>
           
                    <td className={className}>
                      <Button
                        size="sm"
                        variant="gradient"
                        color="#fad949"
                        onClick={() => handleStatsClick(clients)}
                      >
                        View Stats
                      </Button>
                    </td>
              <td className={className}>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="gradient"
                    color="#fad949"
                    onClick={() => handleFinanceClick(clients)}
                  >
                    Invoice
                  </Button>
                  <Button
                    size="sm"
                    variant="text"
                    color="blue-gray"
                    onClick={() => handleViewClick(clients)}
                    className="dark:text-[#fad949]"
                  >
                    Details
                  </Button>
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
       <div className="p-6" style={{ overflowY: "auto" }}>
        {CurrentClient && (
          <>
            <Typography variant="h5" className="mb-4">
              {CurrentClient.name} - Stats
            </Typography>

            {/* Line Chart for Lead Response Performance */}
            <div className="mb-6">
              <canvas ref={lineChartRef} width="400" height="200"></canvas> {/* Ref for the line chart */}
            </div>

            {/* Doughnut Chart for Targeted Industries */}
            <div className="mb-6">
              <canvas ref={doughnutChartRef} width="300" height="300"></canvas> {/* Ref for the doughnut chart */}
            </div>

            {/* Stats Summary */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm">
                <strong>Total Leads:</strong> {CurrentClient.totalLeads}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Contacted:</strong> {CurrentClient.contacted}
              </p>
              <p className="text-gray-700 text-sm">
                <strong>Positive Responses:</strong>{" "}
                {CurrentClient.positiveResponses}
              </p>
            </div>

            {/* Map */}
            <div className="h-64 w-full mb-4">
              <MapContainer center={[0, 0]} zoom={2} className="h-full w-full rounded-lg">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {CurrentClient.leadLocations.map((loc, index) => (
                  <Marker position={[loc.lat, loc.lng]} key={index} />
                ))}
              </MapContainer>
            </div>
          </>
        )}
      </div>  
      </DialogBody>
      <DialogFooter>
      <Button size="sm" variant="gradient" color="red" onClick={handleCloseStatsModal}>
                Close
              </Button>
        </DialogFooter>
    </Dialog>


         {/* Client Details Modal */}
         <Dialog open={openModal} handler={closeClientModal}>
  <DialogHeader>Client Details</DialogHeader>
  <DialogBody divider className="max-h-[400px] overflow-y-scroll">
    {selectedClient && (
      <div>
        <Typography variant="h6">{selectedClient.name}</Typography>
        <Typography><strong>Contact Person:</strong> {selectedClient.contactPerson}</Typography>
        <Typography><strong>Email:</strong> {selectedClient.email}</Typography>
        <Typography><strong>Phone:</strong> {selectedClient.phone}</Typography>
        <Typography><strong>Address:</strong> {selectedClient.address}</Typography>
        <Typography><strong>Description:</strong> {selectedClient.description}</Typography>
        <Typography><strong>Package:</strong> ${selectedClient.plan}</Typography>

        {/* Resources Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">Resources</Typography>
          {resources.length > 0 ? (
            resources.map((resource, index) => (
              <div key={resource.id} className="mt-2 flex flex-col gap-2">
                <div className="flex items-start justify-between">
                  <Typography variant="small" className="text-blue-gray-500">
                    <strong>{resource.name}</strong>
                  </Typography>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none" 
                      onClick={() => setEditingResource(index)}
                    >
                      Edit
                    </Button>
                    <Button size="sm" color="black" onClick={() => handleCopy(resource.content)}>
                      Copy
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none" 
                      onClick={() => handleRemoveResource(index)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <Typography variant="small" className="text-blue-gray-500 whitespace-pre-wrap">
                  {resource.content}
                </Typography>
              </div>
            ))
          ) : (
            <Typography variant="small" className="text-blue-gray-500">
              No resources added.
            </Typography>
          )}
          {editingResource !== null && (
            <div className="mt-2">
              <Input 
                value={resources[editingResource].name} 
                onChange={(e) => handleResourceNameChange(editingResource, e.target.value)}
                placeholder="Resource Title" 
                className="mb-2" 
              />
              <Textarea 
                value={resources[editingResource].content} 
                onChange={(e) => handleResourceContentChange(editingResource, e.target.value)}
                placeholder="Enter details in paragraph or point form" 
              />
              <Button 
                size="sm" 
                color="blue" 
                onClick={() => setEditingResource(null)} 
                className="mt-2"
              >
                Save
              </Button>
            </div>
          )}
          <Button size="sm" color="black" onClick={handleAddResource}>Add More</Button>
        </div>

        {/* Third Party Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">Third Party</Typography>
          {thirdParty.length > 0 ? (
            thirdParty.map((party, index) => (
              <div key={party.id} className="mt-2 flex items-center justify-between">
                <div>
                  <Typography variant="small" className="text-blue-gray-500">
                    <strong>{party.name}</strong>: {party.link}
                  </Typography>
                </div>
                <div>
                  <Button size="sm" className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none" onClick={() => handleThirdPartyEdit(index, prompt('Enter new name:', party.name), prompt('Enter new link:', party.link))}>Edit</Button>
                  <Button size="sm" color="black" onClick={() => handleCopy(party.link)}>Copy</Button>
                  <Button size="sm" className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none" onClick={() => handleRemoveThirdParty(index)}>Remove</Button>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="small" className="text-blue-gray-500">
              No third-party links added.
            </Typography>
          )}
          <Button size="sm" color="black" onClick={handleAddThirdParty}>Add More</Button>
        </div>

        {/* Documents Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">Documents</Typography>
          {documents.length > 0 ? (
            documents.map((doc, index) => (
              <div key={index} className="mt-2 flex items-center justify-between">
                <div>
                  <Typography variant="small" className="text-blue-gray-500">
                    <a href={URL.createObjectURL(doc.file)} target="_blank" rel="noopener noreferrer">
                      {doc.name}
                    </a>
                  </Typography>
                </div>
                <div>
                  <Button size="sm" color="black" onClick={() => handleDocumentView(doc)}>View</Button>
                  <Button size="sm" className="bg-[#fad949] text-white hover:bg-[#f4c235] border-none" onClick={() => handleDocumentDelete(index)}>Delete</Button>
                </div>
              </div>
            ))
          ) : (
            <Typography variant="small" className="text-blue-gray-500">
              No documents uploaded.
            </Typography>
          )}
          <div className="mt-2">
            <Input type="file" onChange={handleDocumentUpload} />
          </div>
        </div>

        {/* History Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">History</Typography>
          {selectedClient.leadsHistory.map((entry, index) => (
            <div key={index} className="mt-1">
              <Typography variant="small" className="text-blue-gray-500">
                <strong>Company:</strong> {entry.name} <strong>| Note:</strong> {entry.note} <strong>| Date:</strong> {entry.date}
              </Typography>
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">Notes</Typography>
          {selectedClient.notes.map((note, index) => (
            <div key={index} className="mt-1">
              <Typography variant="small" className="text-blue-gray-500">
                {note.date} -> {note.note}
              </Typography>
            </div>
          ))}
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
        {selectedClient && (
          <div>
            <Typography variant="h6">Invoices for {selectedClient.name}</Typography>
            {selectedClient.invoices.map((invoice) => (
              <div key={invoice.id} className="border p-2 mb-2 rounded">
                <Typography><strong>Service:</strong> {invoice.service}</Typography>
                <Typography><strong>Amount:</strong> {invoice.amount}</Typography>
                <Typography><strong>Status:</strong> {invoice.status}</Typography>
                <Typography><strong>Due Date:</strong> {invoice.dueDate}</Typography>
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
              <Typography><strong>Total Invoices:</strong> {selectedClient.invoices.length}</Typography>
              <Typography>
                <strong>Total Amount:</strong> £
                {selectedClient.invoices.reduce((total, invoice) => total + parseFloat(invoice.amount), 0).toFixed(2)}
              </Typography>
              <Typography>
                <strong>Invoice Names:</strong> {selectedClient.invoices.map((invoice) => invoice.service).join(", ")}
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

            {/* New Invoice Form */}
            <div className="mt-4">
              <Typography variant="h6">Create New Invoice</Typography>
              <div className="grid gap-4">
                <Input
                  label="Service"
                  name="service"
                  value={newInvoice.service}
                  onChange={handleNewInvoiceChange}
                />
                <Input
                  label="Amount"
                  name="amount"
                  value={newInvoice.amount}
                  onChange={handleNewInvoiceChange}
                />
                <Input
                  label="Due Date"
                  name="dueDate"
                  type="date"
                  value={newInvoice.dueDate}
                  onChange={handleNewInvoiceChange}
                />
                <Button onClick={createNewInvoice}>Add Invoice</Button>
              </div>
            </div>
          </div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button color="blue-gray" onClick={closeFinanceModal}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>

           {/* Dialog for showing person details */}
           <Dialog open={isDialogOpen} handler={handleCloseDialog}>
        {selectedPerson && (
          <div className="p-6">
            <Typography variant="h5" className="mb-4">
              {selectedPerson.name}'s Details
            </Typography>
            <Typography className="mb-2">
              <strong>Email:</strong> {selectedPerson.email}
            </Typography>
            <Typography className="mb-2">
              <strong>Job Title:</strong> {selectedPerson.job[0]}
            </Typography>
            <Typography className="mb-2">
              <strong>Company:</strong> {selectedPerson.job[1]}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedPerson.online ? "Online" : "Offline"}
            </Typography>
          </div>
        )}
        <Button
          size="sm"
          variant="gradient"
          color="red"
          onClick={handleCloseDialog}
          className="mt-4"
        >
          Close
        </Button>
      </Dialog>
        {/* Dialog for editing person details */}
        <Dialog open={isEditDialogOpen} handler={handleCloseEditDialog}>
        {selectedPerson && (
          <div className="p-6">
            <Typography variant="h5" className="mb-4">
              Edit {selectedPerson.name}'s Details
            </Typography>
            <div className="mb-4">
              <Input
                label="Name"
                value={selectedPerson.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Email"
                value={selectedPerson.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Job Title"
                value={selectedPerson.job[0]}
                onChange={(e) => handleChange("job", [e.target.value, selectedPerson.job[1]])}
              />
            </div>
            <div className="mb-4">
              <Input
                label="Company"
                value={selectedPerson.job[1]}
                onChange={(e) => handleChange("job", [selectedPerson.job[0], e.target.value])}
              />
            </div>
            <Button
              size="sm"
              variant="gradient"
              color="green"
              onClick={handleSaveDetails}
              className="mt-4"
            >
              Save
            </Button>
            <Button
              size="sm"
              variant="gradient"
              color="red"
              onClick={handleCloseEditDialog}
              className="mt-4 ml-2"
            >
              Cancel
            </Button>
          </div>
        )}
      </Dialog>

    </div>
  );
}

export default Tables;
