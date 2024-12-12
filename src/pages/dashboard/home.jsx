import React,{ useState } from "react";
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
  Button
} from "@material-tailwind/react";
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

export function Home() {

  const [openModal, setOpenModal] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  const handleViewClick = (lead) => {
    setSelectedLead(lead);
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
    setSelectedLead(null);
  };
  return (
    <div className="mt-12">
    {/* Financial Stats*/}
      {/**<div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div> */}
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
              <Typography variant="h6" className="mb-1 text-blue-gray dark:text-white ">
                Leads/Client
              </Typography>
              <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
              >

              
              </Typography>
            </div>
           
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["clients", "leads", "Success Rate"].map(
                    (el) => (
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
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {projectsTableData.map(
                  ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                      <tr key={name}>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-bold dark:text-[#fad949]"
                            >
                              {name}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          {members.map(({ img, name }, key) => (
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
                          <div className="w-10/12">
                            <Typography
                              variant="small"
                              className="mb-1 block text-xs font-medium text-blue-gray-600 dark:text-[#fad949]"
                            >
                              {completion}%
                            </Typography>
                            <Progress
                              value={completion}
                              variant="gradient"
                              color={completion === 100 ? "green" : "blue"}
                              className="h-1"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
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
            {ordersOverviewData.map(
              (lead, key) => (
                <div key={lead.title} className="flex items-start gap-4 py-3">
                  <div
                    className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                      key === ordersOverviewData.length - 1
                        ? "after:h-0"
                        : "after:h-4/6"
                    }`}
                  >
                    <Avatar src={lead.img} alt={lead.title} size="sm" />
                  </div>
                  <div>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="block font-medium dark: text-white"
                    >
                      {lead.title}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500 dark:text-[#fad949]"
                    >
                      {lead.description}
                    </Typography>
                    <Typography
                      as="span"
                      variant="small"
                      className="text-xs font-medium text-blue-gray-500 dark:text-[#fad949]"
                    >
                      {lead.email}
                    </Typography>
                  </div>
                  <Button variant="text" size="sm" onClick={() => handleViewClick(lead)} className=" dark:bg-gray-400">
                        view
                      </Button>
                </div>
              )
            )}
          </CardBody>
        </Card>
      </div>

   {/* Modal for Lead Details */}
<Dialog open={openModal} handler={closeModal}>
  <DialogHeader>Lead Details</DialogHeader>
  <DialogBody divider>
    {selectedLead && (
      <div>
        <Typography variant="h6">{selectedLead.title}</Typography>
        
        <Typography variant="small" className="text-blue-gray-500">
          Contact Person: {selectedLead.person}
        </Typography>
        
        <Typography variant="small" className="text-blue-gray-500">
          Email: {selectedLead.email}
        </Typography>
        
        <Typography variant="small" className="text-blue-gray-500">
          Address: {selectedLead.address}
        </Typography>
        
        <Typography variant="small" className="text-blue-gray-500">
          Rating: {selectedLead.rate}
        </Typography>
        
        <Typography variant="small" className="text-blue-gray-500">
          Description: {selectedLead.description}
        </Typography>
        
        <Typography variant="small" className="text-blue-gray-500">
          Status: {selectedLead.status}
        </Typography>

        {/* History Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">History</Typography>
          {selectedLead.history.map((entry, index) => (
            <div key={index} className="mt-1">
              <Typography variant="small" className="text-blue-gray-500">
                Company: {entry.company} | Industry: {entry.industry} | Date: {entry.date}
              </Typography>
            </div>
          ))}
        </div>

        {/* Notes Section */}
        <div className="mt-4">
          <Typography variant="h6" className="text-blue-gray-700">Notes</Typography>
          {selectedLead.notes.map((note, index) => (
            <div key={index} className="mt-1">
              <Typography variant="small" className="text-blue-gray-500">
                {note.date}: {note.note}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    )}
  </DialogBody>
  <div className="p-4 flex justify-end">
    <Button color="blue-gray" onClick={closeModal}>
      Close
    </Button>
  </div>
</Dialog>

    </div>
  );
}

export default Home;
