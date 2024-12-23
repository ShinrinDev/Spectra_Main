import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext/AuthContext";

export function ProfileInfoCard({ title, description,data, action }) {

    const firestore = getFirestore();
    const { user } = useAuth();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editData, setEditData] = useState({ name: "", surname: "" , phone: "", position: ""});
    const [successMessage, setSuccessMessage] = useState("");
   useEffect(() => {
      const fetchUserData = async () => {
        if (user?.uid) {
          try {
            const userDoc = await getDoc(doc(firestore, "suser", user.uid));
            if (userDoc.exists()) {
              setUserData(userDoc.data());
              setEditData({ name: userDoc.data().name, role: userDoc.data().role });
              console.log("User Data 2:", userDoc.data())
            }
          } catch (error) {
            console.error("Error fetching user data: ", error);
          }
        }
        setLoading(false);
      };
  
      fetchUserData();
    }, [user]);
  
    console.log("Profile data->>>", userData);
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
        });
        setUserData({ ...userData, ...editData });
        setIsDialogOpen(false);
        setSuccessMessage("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    };
  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h6" color="blue-gray" className="dark:text-white">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0"> 
        <Typography className="font-normal text-blue-gray-500 dark:text-[#fad949]"><strong className=" text-blue-gray-900 dark:text-white">Phone:</strong> {data.phone || "No Phone Number"}</Typography>
        <Typography className="font-normal text-blue-gray-500 dark:text-[#fad949]"><strong className=" text-blue-gray-900 dark:text-white">Role:</strong> {data.role || "No Role"}</Typography>
        <Typography className="font-normal text-blue-gray-500 dark:text-[#fad949]"><strong className=" text-blue-gray-900 dark:text-white">Email:</strong> {data.email || "No Email"}</Typography>
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
