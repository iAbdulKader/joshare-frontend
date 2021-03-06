import { useEffect, useContext, useRef } from "react";
import Header from "../components/Header";
import PinHolder from "../components/PinHolder";
import Files from "../components/Files";
import UtilityPalette from "../components/UtilityPalette";
import Upload from "../components/Upload";
import Footer from "../components/Footer";
import Meta from "../components/Meta";
import useUser from "../hooks/useUser";
import useGetFiles from "../hooks/useGetFiles";
import { useRouter } from "next/router";
import { GlobalContext } from "../contexts/GlobalContext";

export default function MyFiles(){
  const router = useRouter();
  const { pin, expire } = useUser();
  const { addFiles, clearFiles, setAddTimeNum, setEmailSendNum, setExpire } = useContext(GlobalContext);
  
  const { user } = useGetFiles(pin);
   
  const handleChange = useRef((data) => {
    setAddTimeNum(true, data.addTimeNum);
    setEmailSendNum(true, data.emailSendNum);
    if(data.files) {
      if(data.files.length === 0){
        addFiles("You Haven’t Uploaded Any Files Yet")
      } else {
        addFiles(data.files);
      }
    }
    setExpire(expire);
  })
  
  const clearFilesRef = useRef(() => {
    clearFiles()
  })
  
  useEffect(() => {
    if(!pin){
       router.push("/")
    }
  }, [pin, router])
  
  useEffect(() => {
    handleChange.current(user)
    
    const cleanup = clearFilesRef.current;
    return cleanup;
  }, [user])
  
  return (
    <>
      <Meta title="My Files | joShare - File Sharing" />
      <Header />
      <PinHolder pin={pin} />
      <Files />
      <UtilityPalette />
      <Upload />
      <Footer />
    </>
    )
}