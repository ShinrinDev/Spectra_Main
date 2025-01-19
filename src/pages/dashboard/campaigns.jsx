import CampaignsService from '@/services/campaigns-service';
import { useState, useEffect } from 'react';
import * as react from "@material-tailwind/react";

const CampaignsComponent = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const locationId = "ve9EPM428h8vShlRW1KT"; // Campaings requires locationID

    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const campaignsData = await CampaignsService.fetchCampaigns(locationId);
                setCampaigns(campaignsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getCampaigns();
    }, []);

    return (
        <div className="mt-12 mb-8 flex flex-col gap-12">
            {loading && <p>Loading campaigns...</p>}
            {error && <p>{error}</p>}
            <react.Card className="dark:bg-gray-900">
                <react.CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                    <react.Typography variant="h6" color="white">
                        Campaigns
                    </react.Typography>
                </react.CardHeader>
                <react.CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                    <table className="w-full min-w-[640px] table-auto">
                        <thead>
                            <tr>
                                {["Name", "Published", "Edit", "Actions"].map((el) => (
                                    <th
                                        key={el}
                                        className="border-b border-blue-gray-50 py-3 px-5 text-left "
                                    >
                                        <react.Typography
                                            variant="small"
                                            className="text-[11px] font-bold uppercase text-blue-gray-400 dark:text-white"
                                        >
                                            {el}
                                        </react.Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.length > 0 ? (
                                campaigns.map((campaign, key) => {
                                    const className = `py-3 px-5 ${key === campaign.length - 1
                                        ? ""
                                        : "border-b border-blue-gray-50"
                                        }`;
                                    return (
                                        <tr key={campaign.name}>
                                            <td className={className}>
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <react.Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-semibold dark:text-white"
                                                        >
                                                            {campaign.name}
                                                        </react.Typography>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={className}>
                                                <react.Typography className="text-xs font-semibold text-blue-gray-600 dark:text-white">
                                                    {campaign.status}
                                                </react.Typography>
                                            </td>
                                            <td className={className}>
                                                <react.Button
                                                    size="sm"
                                                    variant="text"
                                                    color="blue"
                                                    onClick={() => handleEditDetails(campaign)}
                                                >
                                                    Edit
                                                </react.Button>
                                            </td>
                                            <td className={className}>
                                                <react.Button
                                                    size="sm"
                                                    variant="text"
                                                    color="blue-gray"
                                                    onClick={() => alert("View details not implemented")}
                                                >
                                                    View
                                                </react.Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                !loading && <p>No campaigns found.</p>
                            )}
                        </tbody>
                    </table>
                </react.CardBody>
            </react.Card>
        </div>
    )
};

export default CampaignsComponent;
