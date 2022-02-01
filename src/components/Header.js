import { useState } from "react"
import styles from "../styles/Header.module.css";
import Logo from "./Logo";
import Modal from "./Modal";
import SharePage from "./SharePage";
import CountDown from "./CountDown";
import ShareButton from "./ShareButton";
import UploadButton from "./UploadButton";
import { Link } from "react-router-dom";

export default function Header({ showUpload = false }) {
  const [show, setShow] = useState(false)
  
  const toggle = () => {
    console.log("hey")
    setShow(!show)
  }
  return(
    <>
      <Modal 
        show={show} 
        toggle={toggle}
        background="#fff"
      >
        <SharePage />
      </Modal>
    
      <div className={styles.header}>
        <div style={{marginLeft: "5%"}}>
          <Link to="/">
            <Logo fontSize=".7rem" />
          </Link>
        </div>
        
        <div className={styles.buttonContainer}>
          {!showUpload ? 
          (<>
            <CountDown />
            <ShareButton toggle={toggle} />
            </>):
            (
            <Link to="/myfiles">
              <UploadButton />
            </Link>
            )}
        </div>
        
      </div>
    </>
    )
}