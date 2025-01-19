import { db } from "@/firebase";
import { svgs } from "@/assets/assets";
import { ArrowTopRightOnSquareIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Tooltip
} from "@material-tailwind/react";
import { arrayUnion, doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { CircleHelp, File, HistoryIcon, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { TooltipWithHelperIcon } from "../ToolTipWithHelperIcon";

const EMPTY_EMAIL = { id: "", subject: "", body: "" }
function EmailGenerationDialog({ uid, handleOpen, open }) {

  const [onboardingAnswers, setOnboardingAnswers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEmailGenLoading, setIsEmailGenLoading] = useState(false);
  const [isApprovalLoading, setIsApprovalLoading] = useState(false);
  const [emailTemplate, setEmailTemplate] = useState(EMPTY_EMAIL);
  const [emailHistory, setEmailHistory] = useState([]);
  const [prevEmail, setPrevEmail] = useState(EMPTY_EMAIL);

  const generateEmail = async (context, previousEmail) => {

    console.log(previousEmail);

    try {
      setIsEmailGenLoading(true);
      let body = {
        context: JSON.stringify(context),
        previousEmail: JSON.stringify(previousEmail)
      }

      console.log(body);

      const response = await fetch(`http://localhost:3000/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      })

      if (response.ok) {
        const { email } = await response.json();
        console.log(email)
        const parsedEmail = JSON.parse(email);
        setEmailTemplate({ id: uuidv4(), subject: parsedEmail.subject, body: parsedEmail.body });

      }
    } catch (error) {
      console.error("Something went wrong: ", error);
    } finally {
      setIsEmailGenLoading(false);
    }

  }


  const approveEmailTemplate = async () => {
    try {
      setIsApprovalLoading(true);
      const docRef = doc(db, "emailTemplates", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          updatedAt: Timestamp.now(),
          emails: arrayUnion(emailTemplate),
        })
      } else {
        await setDoc(docRef, {
          clientId: uid,
          emails: arrayUnion(emailTemplate),
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        })
      }
      console.log("Email template successfully approved!");
      toast.success("Email template successfully approved!")
    } catch (error) {
      console.error("Failed to approve email template: ", error)
    } finally {
      setIsApprovalLoading(false);
      cleanUp();
      handleOpen();
    }
  }

  const viewEmailHistory = async () => {
    try {
      const docRef = doc(db, "emailTemplates", uid);
      const response = await getDoc(docRef);

      if (response.exists()) {
        const data = response.data();
        setEmailHistory(data.emails);
        console.log(data)
      }
    } catch (error) {
      console.error("Failed to fetch email history: ", error);
    }
  }
  const cleanUp = () => {
    setOnboardingAnswers(null);
    setIsLoading(true);
    setIsEmailGenLoading(false);
    setIsApprovalLoading(false);
    setEmailTemplate({ id: "", subject: "", body: "" });
    setEmailHistory([]);
    setPrevEmail({ id: "", subject: "", body: "" })
  }

  useEffect(() => {
    if (open) {
      const fetchOnboardingAnswers = async () => {
        console.log(uid);
        try {
          const response = await getDoc(doc(db, "onboardingAnswers", uid));
          if (response.exists()) {
            const data = response.data();

            setOnboardingAnswers(data)
            setIsLoading(false);
            console.log(data);
          } else {
            console.log("No such document: ", uid);
          }
        } catch (error) {
          console.error("Failed to fetch onboarding answers: ", error);
        }
      }
      fetchOnboardingAnswers();
    }

  }, [uid, open]);

  return (<>

    <Dialog open={open} handler={handleOpen} className="">
      <DialogHeader className="pb-0 flex justify-between items-baseline"><h1 className="flex items-baseline">Generate Email<TooltipWithHelperIcon title={"Generate Email"} content={"Approved email templates will be stored for future use in campaigns"} /></h1>{onboardingAnswers && <div className="flex flex-row-reverse gap-4 mb-auto text-gray-800"> <Tooltip className="z-[10000]" content="View onboarding document"><a href={onboardingAnswers.pdfUrl} target="_blank"><File /></a></Tooltip> {!emailHistory.length && <Tooltip className="z-[10000]" content="Show email history"><HistoryIcon className="cursor-pointer" onClick={viewEmailHistory} /></Tooltip>}</div>}</DialogHeader>
      <DialogBody>
        {isLoading ?
          <img src={svgs.loadingSpinner} className="m-auto" />
          :
          <div className="flex flex-col relative">
            {emailHistory.length > 0 && <EmailHistory emailHistory={emailHistory} prevEmail={prevEmail} setPrevEmail={setPrevEmail} />}
            {isEmailGenLoading && <img src={svgs.loadingSpinner} className="m-auto" />}
            {!isEmailGenLoading && <EmailTemplate emailTemplate={emailTemplate} />}
          </div>}
      </DialogBody>
      <DialogFooter className="flex justify-between">
        <Button className="w-fit bg-black" onClick={() => generateEmail(onboardingAnswers.responses, prevEmail)} disabled={isApprovalLoading || isEmailGenLoading}>{isEmailGenLoading ? "Loading..." : "Generate"}</Button>
        <div>
          <Button
            variant="text"
            onClick={() => { cleanUp(); handleOpen() }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button className="bg-green-500/50 text-green-900" onClick={approveEmailTemplate} disabled={isApprovalLoading || isEmailGenLoading || !emailTemplate.subject}>
            <span >{isApprovalLoading ? "Loading..." : "Approve"}</span>
          </Button>
        </div>

      </DialogFooter>
    </Dialog>
  </>);
}

const EmailTemplate = ({ emailTemplate }) => {

  if (!emailTemplate.subject) return <div className="flex flex-col text-sm font-normal"><span>Generated email will appear here</span></div>
  return (
    <div className="flex flex-col">
      <span className="font-semibold text-black my-4">Template</span>
      <EmailDisplay subject={emailTemplate.subject} body={emailTemplate.body} />
    </div>
  )
}

const EmailHistory = ({ emailHistory, prevEmail, setPrevEmail }) => {
  const handleRadio = (index) => {
    if (prevEmail?.id === emailHistory[index].id) {
      setPrevEmail({ id: "", subject: "", body: "" });
    } else {
      setPrevEmail(emailHistory[index]);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="font-semibold text-black">History</h2>
      <div className="my-4 grid grid-cols-1 gap-4 max-h-[208px] overflow-y-auto">
        {
          emailHistory.map((emailItem, index) => (
            <div key={`${emailItem}${index}`} className="flex items-center gap-2">
              <Tooltip className="z-[10000]" content="Select to generate a follow-up"><input type="radio" name="isPreviousEmail" className="border-none cursor-pointer" checked={prevEmail.id === emailItem.id} onClick={() => handleRadio(index)} /></Tooltip> <EmailDisplay subject={emailItem.subject} body={emailItem.body} isExpandable />
            </div>

          ))
        }
      </div>
    </div>
  )
}

const EmailDisplay = ({ subject, body, isExpandable }) => {
  const [isExpanded, setIsExpanded] = useState(!isExpandable);

  return (
    <div className="flex flex-col text-black border border-gray-500 rounded-3xl p-2 w-full">
      <div className="flex justify-between">
        <p className="text-sm font-normal">Subject: {subject}</p>
        {isExpandable ? isExpanded ? <ChevronUpIcon className="w-5 h-5 hover:cursor-pointer text-gray-500" onClick={() => setIsExpanded(!isExpanded)} /> : <ChevronDownIcon className=" text-gray-500 w-5 h-5 hover:cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} /> : null}


      </div>

      {isExpanded && <><br /><p className="text-sm font-normal" dangerouslySetInnerHTML={{ __html: body.replace(/\n/g, '<br />') }} /></>}
    </div>
  )
}
export default EmailGenerationDialog;