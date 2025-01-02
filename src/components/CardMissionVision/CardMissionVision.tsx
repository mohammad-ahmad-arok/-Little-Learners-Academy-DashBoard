
import React, { useState } from "react";
import styles2 from "../dashboardNav/header.module.css"
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Thunk
import { deleteMissionVision } from "../../redux/slice/missionVisionSlice"; 

// Component
import Modal from "../Modal/Modal";

//React-Hot-Toast
import toast from "react-hot-toast";



type TPropsCard={
    id:string,
    title:string,
    description:string
}

const CardMissionVision:React.FC<TPropsCard> = ({title,description,id}) => {

    // State For Modal To Open And Close
    const [open,setOpen]=useState(false)

    // Check Error From Slice  
    const {error}=useAppSelector(state=>state.missionVision)
  
  
    const dispatch=useAppDispatch()
    const navigate=useNavigate();
  
    // Function To Handle Navigation To Update Page
    const handleClickUpdate = ()=>{
      navigate(`/mission-vision/update/${title}`)
   
    }
  
    // Function To Handle Delete Item 
    const handleClickDelete=()=>{
        dispatch(deleteMissionVision(title as string));
        if(!error){
          toast.success("item deleted successfully")
        }
        else{
          toast.error("try again")
        }
    }

  return (
    <div className=" w-full bg-white rounded border-r-8 border-b-8 border-l-2 border-t-2 border-[#262626] p-12 ">
      <div className="flex justify-center items-center  gap-3 mb-2">
      <button className={styles2.btn} onClick={handleClickUpdate}>
          UPDATE
        </button>
        <button className={styles2.btn} onClick={()=>{setOpen(true)}}>
          DELETE
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-5xl">{title}</h2>
      </div>
      <p className="mt-12 3xl:text-lg">{description}</p>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-56">
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item?
            </p>
          </div>
          <div className="flex gap-4">
            <button className="btn bg-red-500 rounded-md text-white hover:bg-red-300  p-2 w-full" onClick={handleClickDelete}>Delete</button>
            <button
              className="btn btn-light w-full"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CardMissionVision;
