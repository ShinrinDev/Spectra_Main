import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "@/context/AuthContext/AuthContext";
import React, { useEffect, useState } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Unauthorized() {
  const { user } = useAuth();
  const firestore = getFirestore();
  const [Role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (user?.uid) {
        try {
          const userDoc = await getDoc(doc(firestore, "suser", user.uid));
          if (userDoc.exists()) {
            setRole(userDoc.data().role);
          } else {
            console.log("USER DOES NOT EXIST!!!!!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleBack = () => {
    navigate("/dashboard/profile");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Typography className="text-center text-red-600 font-semibold text-xl mb-4">
        You are unauthorized to access this page. The page can only be accessed by Admins. Your role is: <span className="text-blue-500">{Role || "unknown"}</span>
      </Typography>
      <Button
        className="bg-[#fad949] text-white hover:bg-[#fab949] transition-colors"
        onClick={handleBack}
      >
        Back to Profile
      </Button>
    </div>
  );
}
