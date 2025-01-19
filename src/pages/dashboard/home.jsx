import React,{ useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
  Dialog,
  DialogHeader,
  DialogBody,
  Button,
  TextField
} from "@material-tailwind/react";
import { getDocs } from "firebase/firestore";
import {
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import { db } from "@/firebase";
import { collection } from "firebase/firestore";

export function Home() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

 


    // State to store the values for revenue, expenses, and profit
    const [revenue, setRevenue] = useState(150000);
    const [monthlyRevenue, setMonthlyRevenue] = useState(12500);
    const [expenses, setExpenses] = useState(80000);
    const [monthlyExpenses, setMonthlyExpenses] = useState(6500);
    const [profit, setProfit] = useState(70000);
    const [monthlyProfit, setMonthlyProfit] = useState(6000);
  
    // Handle change functions
    const handleRevenueChange = (e) => setRevenue(Number(e.target.value));
    const handleMonthlyRevenueChange = (e) => setMonthlyRevenue(Number(e.target.value));
    const handleExpensesChange = (e) => setExpenses(Number(e.target.value));
    const handleMonthlyExpensesChange = (e) => setMonthlyExpenses(Number(e.target.value));
    const handleProfitChange = (e) => setProfit(Number(e.target.value));
    const handleMonthlyProfitChange = (e) => setMonthlyProfit(Number(e.target.value));

  const handleViewClick = (lead) => {
    setSelectedLead(lead);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedLead(null);
  };

  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const leadDocRef = doc(db, "leads", selectedLead.id); // Assuming `id` is available in selectedLead
      await updateDoc(leadDocRef, leadDetails); // Update the lead in Firestore
      setIsEditing(false); // Exit edit mode after saving
    } catch (error) {
      console.error("Error updating lead:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeadDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };


  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        // Reference to the leads collection
        const leadsCollectionRef = collection(db, "leads");
        
        // Fetch all leads from the collection
        const leadsSnapshot = await getDocs(leadsCollectionRef);
        
        // Map the leads data to a usable format
        const leadsList = leadsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Update the state with fetched leads

        console.log("Leads data ==>>>>",leadsList);
        setLeads(leadsList);
      } catch (error) {
        console.error("Error fetching leads: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, []);


  return (
    <div className="mt-12">
    {/* Financial Stats*/}
   
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
      <Card className="overflow-hidden xl:col-span-2 border border-blue-gray-100 shadow-sm bg-white dark:bg-gray-900">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 flex items-center justify-between p-6"
      >
        <div>
          <Typography variant="h6" className="mb-1 text-blue-gray dark:text-white">
            Financial Overview
          </Typography>
          <Typography
            variant="small"
            className="flex items-center gap-1 font-normal text-blue-gray-600"
          >
            Total and Monthly Data
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
        <table className="w-full min-w-[640px] table-auto">
          <thead>
            <tr>
              {["Type", "Total", "Monthly"].map((el) => (
                <th
                  key={el}
                  className="border-b border-blue-gray-50 py-3 px-6 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-medium uppercase text-blue-gray-400 dark:text-white"
                  >
                    {el}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Revenue Row */}
            <tr>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold dark:text-[#fad949]"
                >
                  Revenue
                </Typography>
              </td>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <input
                  type="number"
                  value={revenue}
                  onChange={handleRevenueChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </td>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <input
                  type="number"
                  value={monthlyRevenue}
                  onChange={handleMonthlyRevenueChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </td>
            </tr>
            {/* Expenses Row */}
            <tr>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold dark:text-[#fad949]"
                >
                  Expenses
                </Typography>
              </td>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <input
                  type="number"
                  value={expenses}
                  onChange={handleExpensesChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </td>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <input
                  type="number"
                  value={monthlyExpenses}
                  onChange={handleMonthlyExpensesChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </td>
            </tr>
            {/* Profit Row */}
            <tr>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold dark:text-[#fad949]"
                >
                  Profit
                </Typography>
              </td>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <input
                  type="number"
                  value={profit}
                  onChange={handleProfitChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </td>
              <td className="py-3 px-5 border-b border-blue-gray-50">
                <input
                  type="number"
                  value={monthlyProfit}
                  onChange={handleMonthlyProfitChange}
                  className="w-full px-3 py-2 border rounded-lg text-black"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </CardBody>
    </Card>

        {/*All leads card*/}
        <Card className="border border-blue-gray-100 shadow-sm dark:bg-gray-900">
  <CardHeader
    floated={false}
    shadow={false}
    color="transparent"
    className="m-0 p-6"
  >
    <Typography variant="h6" color="blue-gray" className="mb-2 dark:text-white">
      All Leads
    </Typography>
  </CardHeader>
  <CardBody className="pt-0">
    {loading ? (
      <div>Loading...</div>
    ) : leads.length === 0 ? (
      <div>No leads available</div>
    ) : (
      leads.map((lead) => (
        <div key={lead.id} className="flex items-start gap-4 py-3">
          <div
            className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-['']`}
          >
            {lead.name[0].toUpperCase()}
          </div>
          <div>
            <Typography
              variant="small"
              color="blue-gray"
              className="block font-medium dark:text-white"
            >
              {lead.name}
            </Typography>
            <Typography
              as="span"
              variant="small"
              className="text-xs font-medium text-blue-gray-500 dark:text-[#fad949]"
            >
              something
            </Typography>
            <Typography
              as="span"
              variant="small"
              className="text-xs font-medium text-blue-gray-500 dark:text-[#fad949]"
            >
              {lead.email}
            </Typography>
          </div>
          <Button
            variant="text"
            size="sm"
            onClick={() => handleViewClick(lead)}
            className="dark:bg-gray-400"
          >
            view
          </Button>
        </div>
      ))
    )}
  </CardBody>
</Card>

      </div>

   {/* Modal for Lead Details */}
   <Dialog open={openModal} handler={closeModal}>
      <DialogHeader>
        {isEditing ? "Edit Lead Details" : "Lead Details"}
      </DialogHeader>
      <DialogBody divider>
        {selectedLead && (
          <div>
            <Typography variant="h6">
              {isEditing ? (
                <TextField
                  label="Title"
                  name="title"
                  value={selectedLead.name}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.name
              )}
            </Typography>

            <Typography variant="small" className="text-blue-gray-500">
              Contact Person:{" "}
              {isEditing ? (
                <TextField
                  label="Contact Person"
                  name="person"
                  value={selectedLead.person}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.person
              )}
            </Typography>

            <Typography variant="small" className="text-blue-gray-500">
              Email:{" "}
              {isEditing ? (
                <TextField
                  label="Email"
                  name="email"
                  value={selectedLead.email}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.email
              )}
            </Typography>

            <Typography variant="small" className="text-blue-gray-500">
              Address:{" "}
              {isEditing ? (
                <TextField
                  label="Address"
                  name="address"
                  value={selectedLead.address}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.address
              )}
            </Typography>

            <Typography variant="small" className="text-blue-gray-500">
              Rating:{" "}
              {isEditing ? (
                <TextField
                  label="Rating"
                  name="rate"
                  value={selectedLead.Rating}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.Rating
              )}
            </Typography>

            <Typography variant="small" className="text-blue-gray-500">
              Description:{" "}
              {isEditing ? (
                <TextField
                  label="Description"
                  name="description"
                  value={selectedLead.description}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.description
              )}
            </Typography>

            <Typography variant="small" className="text-blue-gray-500">
              Status:{" "}
              {isEditing ? (
                <TextField
                  label="Status"
                  name="status"
                  value={selectedLead.Status}
                  onChange={handleChange}
                  fullWidth
                />
              ) : (
                selectedLead.Status
              )}
            </Typography>

            {/* History Section *}
            <div className="mt-4">
              <Typography variant="h6" className="text-blue-gray-700">
                History
              </Typography>
             {/** {selectedLead.history.map((entry, index) => (
                <div key={index} className="mt-1">
                  <Typography variant="small" className="text-blue-gray-500">
                    Company: {entry.company} | Industry: {entry.industry} | Date: {entry.date}
                  </Typography>
                </div>
              ))} *}
            </div>

            {/* Notes Section *}
            <div className="mt-4">
              <Typography variant="h6" className="text-blue-gray-700">
                Notes
              </Typography>
              {/**{selectedLead.notes.map((note, index) => (
                <div key={index} className="mt-1">
                  <Typography variant="small" className="text-blue-gray-500">
                    {note.date}: {note.note}
                  </Typography>
                </div>
              ))} *}
            </div>*/}
          </div>
        )}
      </DialogBody>
      <div className="p-4 flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button color="green" onClick={handleSaveClick}>
              Save
            </Button>
            <Button color="red" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button color="blue-gray" onClick={handleEditClick}>
            Edit
          </Button>
        )}
        <Button color="blue-gray" onClick={closeModal}>
          Close
        </Button>
      </div>
    </Dialog>

    </div>
  );
}

export default Home;
