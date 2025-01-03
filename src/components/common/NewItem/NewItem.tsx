// Router-Dom
import { useNavigate } from "react-router-dom"
// Styles
import styles from "../../dashboardNav/header.module.css"
import React from "react";

type TProps ={
  children:React.ReactNode
}


const NewItem:React.FC<TProps> = ({children}) => {
  const navigate=useNavigate();
  // Function To Handle Back Button
  const clickedHandler=()=>{
    navigate(-1); 
  }
  return (
    <div className="p-11">
      <button className={`${styles.btn} mb-4`} onClick={clickedHandler}>
         BACK
      </button>
       {children}

    </div>
  )
}

export default NewItem