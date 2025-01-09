
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Thunk
import { deleteMissionVision } from "../../redux/slice/mission-vision/missionVisionSlice"; 

// Component
import Modal from "../Modal/Modal";

//React-Hot-Toast
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";



type TPropsCard={
    id:string,
    title:string,
    description:string
}

const CardMissionVision:React.FC<TPropsCard> = ({title,description}) => {

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
      <div className="flex justify-end  items-center  gap-3 ">
       <button className="text-4xl  text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"  onClick={handleClickUpdate}>
          <MdEdit/>
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-4xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
        >
          <RiDeleteBin6Line/>
        </button>
      </div>
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-5xl">{title}</h2>
      </div>
      <p className="mt-12 3xl:text-lg">{description}</p>
      <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete}/>
    </div>
  );
};

export default CardMissionVision;
