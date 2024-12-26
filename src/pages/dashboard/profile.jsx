import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import {  conversationsData, projectsData } from "@/data";
import { images } from "@/assets/assets";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext/AuthContext";

export function Profile() {
  const firestore = getFirestore();
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editData, setEditData] = useState({ name: "", surname: "" , phone: "", position: ""});
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    surname: "",
  });
  const [avatarSrc,setAvatarSrc] = useState(images.S);
   const roleAvatars = {
    Admin: images.A,
    Editor: images.E,
    Viewer: images.V,
  };


  const [platformSettings, setPlatformSettings] = useState([]);


const fetchPlatformSettings = async (userId) => {
  try {
    const docRef = doc(firestore, "userSettings", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Platform Settings:", docSnap.data().platformSettings);
      return docSnap.data().platformSettings;
    } else {
      console.log("No platform settings found!");
      return [];
    }
  } catch (error) {
    console.error("Error fetching platform settings:", error);
  }
};

// Call the function with a user ID
;


  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(firestore, "suser", user.uid));
          const data = await fetchPlatformSettings(user.uid);
          setPlatformSettings(data);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            setEditData({ name: userDoc.data().name, role: userDoc.data().role });
            setAvatarSrc(roleAvatars[userDoc.data().role])

          } else{
            console.log("USER DOES NOT EXIST!!!!!")
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
      setLoading(false);

    };

    fetchUserData();
  }, [user]);

  console.log("User Data data->", userData)
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setSuccessMessage("");
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    try {
      const userRef = doc(firestore, "suser", user.uid);
      await updateDoc(userRef, {
        name: editData.name,
        surname: editData.role,
        phone: editData.phone,
      });
      setUserData({ ...userData, ...editData });
      setIsDialogOpen(false);
      setSuccessMessage("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleToggle = async (title, optionIndex) => {
    const updatedSettings = platformSettings.map((setting) =>
      setting.title === title
        ? {
            ...setting,
            options: setting.options.map((option, index) =>
              index === optionIndex
                ? { ...option, checked: !option.checked }
                : option
            ),
          }
        : setting
    );

    setPlatformSettings(updatedSettings);

    // Update Firestore
    try {
      const docRef = doc(firestore, "userSettings", user.uid);
      await updateDoc(docRef, { platformSettings: updatedSettings });
      console.log("Platform settings updated successfully");
    } catch (error) {
      console.error("Error updating platform settings:", error);
    }
  };

  const updateUserDetails = async (uid, updatedFields) => {
    try {
      // Filter out empty fields
      const fieldsToUpdate = Object.entries(updatedFields).reduce((acc, [key, value]) => {
        if (value !== "" && value !== undefined && value !== null) {
          acc[key] = value;
        }
        return acc;
      }, {});
  
      if (Object.keys(fieldsToUpdate).length === 0) {
        console.log("No fields to update.");
        return;
      }
  
      const userDocRef = doc(firestore, "suser", uid);
      await updateDoc(userDocRef, fieldsToUpdate);
  
      console.log("User details updated successfully.");
    } catch (error) {
      console.error("Error updating user details: ", error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.uid) {
      await updateUserDetails(user.uid, formData);
      alert("Profile updated successfully!");
    }
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }


  return (
    <>
      <div className="relative mt-8 h-72 w-full overflow-hidden rounded-xl bg-[url('/img/background-image.png')] bg-cover	bg-center">
        <div className="absolute inset-0 h-full w-full bg-gray-900/75" />
      </div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100 dark:bg-gray-900">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
            <div className="flex items-center gap-6">
              <Avatar
                src={avatarSrc}
                alt="bruce-mars"
                size="xl"
                variant="rounded"
                className="rounded-lg shadow-lg shadow-blue-gray-500/40"
              />
              <div>
                <Typography variant="h5" color="blue-gray" className="mb-1 dark:text-white">
                  {userData.name} {userData.surname}
                </Typography>
                <Typography
                  variant="small"
                  className="font-normal text-blue-gray-600 dark:text-[#fad949]"
                >
                  {userData.position}
                </Typography>
              </div>
            </div>
            <div className="w-96">
        {/**      <Tabs value="app">
                <TabsHeader>
                  <Tab value="app">
                    <HomeIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    App
                  </Tab>
                  <Tab value="message">
                    <ChatBubbleLeftEllipsisIcon className="-mt-0.5 mr-2 inline-block h-5 w-5" />
                    Message
                  </Tab>
                  <Tab value="settings">
                    <Cog6ToothIcon className="-mt-1 mr-2 inline-block h-5 w-5" />
                    Settings
                  </Tab>
                </TabsHeader>
              </Tabs> */}
            </div>
          </div>
          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3 dark:text-white">
                Platform Settings
              </Typography>
              <div className="flex flex-col gap-12">
              {platformSettings.map(({ title, options }) => (
        <div key={title} className="mb-6">
          <Typography className="mb-4 block text-xs font-semibold uppercase text-blue-gray-500 dark:text-white">
            {title}
          </Typography>
          <div className="flex flex-col gap-6">
            {options.map(({ checked, label }, optionIndex) => (
              <Switch
                key={label}
                id={label}
                label={label}
                defaultChecked={checked}
                onChange={() => handleToggle(title, optionIndex)}
                classes={{
                  root: "text-sm font-normal text-blue-gray-500 dark:text-[#fad949]",
                }}
              />
            ))}
          </div>
        </div>
      ))}
              </div>
            </div>
            <ProfileInfoCard
              title="Profile Information"
              data={userData}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500 dark:text-[#fad949]"  onClick={handleOpenDialog}/>
                </Tooltip>
              }
            />
           {/** <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Clients
              </Typography>
              <ul className="flex flex-col gap-6">
                {conversationsData.map((props) => (
                  <MessageCard
                    key={props.name}
                    {...props}
                    action={
                      <Button variant="text" size="sm">
                        reply
                      </Button>
                    }
                  />
                ))}
              </ul>
            </div> */}
          </div>
         {/** <div className="px-4 pb-4">
            <Typography variant="h6" color="blue-gray" className="mb-2">
              Clients Projects
            </Typography>
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              Details on my current clients and details about their leads.
            </Typography>
            <div className="mt-6 grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
              {projectsData.map(
                ({ img, title, description, tag, route, members }) => (
                  <Card key={title} color="transparent" shadow={false}>
                    <CardHeader
                      floated={false}
                      color="gray"
                      className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                    >
                      <img
                        src={img}
                        alt={title}
                        className="h-full w-full object-cover"
                      />
                    </CardHeader>
                    <CardBody className="py-0 px-1">
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {tag}
                      </Typography>
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="mt-1 mb-2"
                      >
                        {title}
                      </Typography>
                      <Typography
                        variant="small"
                        className="font-normal text-blue-gray-500"
                      >
                        {description}
                      </Typography>
                    </CardBody>
                    <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                      <Link to={route}>
                        <Button variant="outlined" size="sm">
                          view project
                        </Button>
                      </Link>
                      <div>
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
                      </div>
                    </CardFooter>
                  </Card>
                )
              )}
            </div>
          </div> */}
        </CardBody>
      </Card>

         {/* Edit Profile Dialog */}
         <Dialog open={isDialogOpen} handler={handleCloseDialog}>
  <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
    <div className="mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Edit Profile Details</h2>
    </div>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-[#fad949]">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          name="name"
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 dark:text-white dark:bg-blue-gray-800 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-[#fad949]">Surname:</label>
        <input
          type="text"
          placeholder="Surname"
          value={formData.surname}
          name="surname"
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 dark:bg-blue-gray-900 dark:text-white border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-[#fad949]">Phone:</label>
        <input
          type="text"
          placeholder="0123456790"
          value={formData.phone}
          name="phone"
          onChange={handleChange}
          className="w-full px-3 py-2 mt-1 dark:bg-blue-gray-900 dark:text-white border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
    </div>
    <div className="mt-6 flex justify-end space-x-3">
      <button
        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 dark:bg-[#fad949] rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleSubmit}
      >
        Save
      </button>
      <button
        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
        onClick={handleCloseDialog}
      >
        Close
      </button>
    </div>
  </div>
</Dialog>

    </>
  );
}

export default Profile;
