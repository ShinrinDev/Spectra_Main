import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import React,{ useState } from "react";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";


export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState(""); // User's name
  const [surname,setSurname] = useState("");
  const [phone,setPhone] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const firestore = getFirestore();

  const platformSettingsData = [
    {
      title: "account",
      options: [
        { checked: true, label: "Email me when a client emails a lead" },
        { checked: false, label: "Email me weekly invoices" },
        { checked: true, label: "Email me when a lead responds" },
      ],
    },
    {
      title: "application",
      options: [
        { checked: false, label: "Client emails lead web notification" },
        { checked: true, label: "Weekly invoice web notification" },
        { checked: false, label: "Lead response web notification" },
      ],
    },
  ];
  
const savePlatformSettings = async (userId) => {
  try {
    const docRef = doc(firestore, "userSettings", userId);
    await setDoc(docRef, { platformSettings: platformSettingsData });
    console.log("Platform settings saved successfully!");
  } catch (error) {
    console.error("Error saving platform settings:", error);
  }
};

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save user details in Firestore
      await setDoc(doc(firestore, "suser", userCredential.user.uid), {
        uid: userCredential.user.uid,
        email,
        name,
        surname,
        phone,
        position,
        role: "Viewer", // Default role
        createdAt: new Date().toISOString(),
        status: "inactive", //Default status
      });

      savePlatformSettings(userCredential.user.uid);
      console.log("SignUp succesful")
      navigate("/auth/sign-in"); // Redirect after successful sign-up
    } catch (err) {
      setError(err.message);
      console.log("Sign Up Error", error.message);
    }
  };
  return (
    <section className="m-8 flex">
            <div className="w-2/5 h-full hidden lg:block">
        <img
          src="/img/pattern.png"
          className="h-full w-full object-cover rounded-3xl"
        />
      </div>
      <div className="w-full lg:w-3/5 flex flex-col items-center justify-center">
        <div className="text-center">
          <Typography variant="h2" className="font-bold mb-4 text-white">Join Us Today</Typography>
          <Typography variant="paragraph" color="blue-gray" className="text-lg font-normal text-[#fad949]">Enter your email and password to register.</Typography>
        </div>
        <form className="mt-8 mb-2 mx-auto w-80 max-w-screen-lg lg:w-1/2">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-white">
              Your email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-[#fad949]">
              Name
            </Typography>
            <Input
              size="lg"
              placeholder="John"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-[#fad949]">
              Surname
            </Typography>
            <Input
              size="lg"
              placeholder="Doe"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=>setSurname(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-white">
              Phone
            </Typography>
            <Input
              size="lg"
              placeholder="01234567890"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-white">
              Position
            </Typography>
            <Input
              size="lg"
              placeholder="Write position in full"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-[#fad949]">
              Your Password
            </Typography>
            <Input
              size="lg"
              placeholder="***************"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="small" color="blue-gray" className="-mb-3 font-medium text-[#fad949]">
              Confirm Password
            </Typography>
            <Input
              size="lg"
              placeholder="***************"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center justify-start font-medium"
              >
                I agree to&nbsp;
                <a
                  href="#"
                  className="font-normal text-[#fad949]  transition-colors hover:text-[#fab949] underline"
                >
                  Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
           {error && <p className="text-red-500">{error}</p>}
          <Button className="mt-6" fullWidth onClick={handleSignUp}>
            Register Now
          </Button>


          <div className="space-y-4 mt-8">
            <Button size="lg" color="white" className="flex items-center gap-2 justify-center shadow-md" fullWidth>
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_1156_824)">
                  <path d="M16.3442 8.18429C16.3442 7.64047 16.3001 7.09371 16.206 6.55872H8.66016V9.63937H12.9813C12.802 10.6329 12.2258 11.5119 11.3822 12.0704V14.0693H13.9602C15.4741 12.6759 16.3442 10.6182 16.3442 8.18429Z" fill="#4285F4" />
                  <path d="M8.65974 16.0006C10.8174 16.0006 12.637 15.2922 13.9627 14.0693L11.3847 12.0704C10.6675 12.5584 9.7415 12.8347 8.66268 12.8347C6.5756 12.8347 4.80598 11.4266 4.17104 9.53357H1.51074V11.5942C2.86882 14.2956 5.63494 16.0006 8.65974 16.0006Z" fill="#34A853" />
                  <path d="M4.16852 9.53356C3.83341 8.53999 3.83341 7.46411 4.16852 6.47054V4.40991H1.51116C0.376489 6.67043 0.376489 9.33367 1.51116 11.5942L4.16852 9.53356Z" fill="#FBBC04" />
                  <path d="M8.65974 3.16644C9.80029 3.1488 10.9026 3.57798 11.7286 4.36578L14.0127 2.08174C12.5664 0.72367 10.6469 -0.0229773 8.65974 0.000539111C5.63494 0.000539111 2.86882 1.70548 1.51074 4.40987L4.1681 6.4705C4.8001 4.57449 6.57266 3.16644 8.65974 3.16644Z" fill="#EA4335" />
                </g>
                <defs>
                  <clipPath id="clip0_1156_824">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                  </clipPath>
                </defs>
              </svg>
              <span>Sign in With Google</span>
            </Button>
           
          </div>
          <Typography variant="paragraph" className="text-center text-blue-gray-500 font-medium mt-4">
            Already have an account?
            <Link to="/auth/sign-in" className="text-[#fad949] ml-1">Sign in</Link>
          </Typography>
        </form>

      </div>
    </section>
  );
}

export default SignUp;
