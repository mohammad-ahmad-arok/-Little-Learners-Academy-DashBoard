import React, { useEffect } from "react";

// Components
import CardMissionVision from "../../components/CardMissionVision/CardMissionVision";

import ButtonSpinner from "../../components/buttonSpinner/ButtonSpinner";

// Thunks

import { getAllMissionVision } from "../../redux/slice/missionVisionSlice";

// Styles
import styles from "../../components/dashboardNav/header.module.css";



// Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";



const MissionVision: React.FC = () => {
  const navigate=useNavigate();
  const dispatch=useAppDispatch();

  // Info From Slice 
  const {records,isLoading,error}=useAppSelector(state=>state.missionVision)
  
  // Function To Navigate To Add Page
 const clickedHandler=()=>{
  navigate("/mission-vision/add")
 }

// For Fetching All Testimonials From Slice 
 useEffect(()=>{
    dispatch(getAllMissionVision());
 },[dispatch])
 
  
 // When isLoading is Pending Show ButtonSpinner Only
  if(isLoading==="Pending"){
    return (
      <div className="flex justify-center items-center h-screen">
        <ButtonSpinner/>
      </div>
    )
  }
  return (
    <>
    <div className="p-11">
    <button className={`${styles.btn} mb-4`} onClick={clickedHandler}>
      ADD NEW
    </button>
      {records.length>0? records?.map((record,index) => {
        return (
          <div className="mb-6" key={index}>
            <CardMissionVision
              id={record._id as string}
              description={record.description}
              title={record.title}
            />
          </div>
        );
      }):<h1 className="flex justify-center items-center flex-col mt-20 font-bold text-5xl text-red-500">Data Not Found <p> {error}</p></h1>}
    </div>
    

    </>
  );
};

export default MissionVision;
