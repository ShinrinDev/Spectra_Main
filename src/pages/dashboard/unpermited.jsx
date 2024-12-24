import { Typography, Button } from "@material-tailwind/react";
import { useAuth } from "@/context/AuthContext/AuthContext";
import React, { useEffect, useState } from "react";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Unpermited() {
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
            setRole(userDoc.data().status);
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
    navigate("/auth/sign-in");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <Typography className="text-center text-red-600 font-semibold text-xl mb-4">
      You are not permited to pass to the dashboard, only "active" users can proceed to the dashboard. Your status is  : <span className="text-blue-500">{Role || "unknown"}</span>
      </Typography>
      <Typography className="text-center text-[#fad949] font-semibold text-xl mb-4">Please contact support if you believe this is a mistake.</Typography>
      <Button
        className="bg-[#fad949] text-white hover:bg-[#fab949] transition-colors"
        onClick={handleBack}
      >
        Back to Login
      </Button>
    </div>
  );
}
