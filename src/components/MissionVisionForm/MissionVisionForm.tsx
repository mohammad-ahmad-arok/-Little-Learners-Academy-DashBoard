// React And Hooks
import React, { useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "./TestimonialForm.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import { addMissionVision,updateMssionVision,TMissionVision } from "../../redux/slice/mission-vision/missionVisionSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
// Button For Loading
import ButtonSpinner from "../buttonSpinner/ButtonSpinner";
// React-Hot-Toast
import toast from "react-hot-toast";

// Types
type Inputs = {
  title: string;
  description: string;
};

type TarrayRecord=TMissionVision

const MissionVisionForm: React.FC = () => {

  const dispatch=useAppDispatch();

  // Info From Slice 
  const {records,isLoading,error}=useAppSelector(state=>state.missionVision)


  const navigate=useNavigate();

  const { Ptitle } = useParams();


  // Array For Saving Data About One Testimonial By Id
  let dataDetail:TarrayRecord[]=[{
    _id:"",
    title:"",
    description:"",
   }];
 
  
  if (typeof Ptitle === "string") {
    const One= records.filter((item)=>{
      return item.title==Ptitle;
    })
    dataDetail.pop();
    dataDetail.push(One[0])
  }

  //  Set Values To Inputs From Testimonial
    const [title]=useState(dataDetail[0].title);
    const [description] = useState(dataDetail[0].description);
  
    // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    
  } = useForm<Inputs>();

  // Function To Handle Submit  
  const onSubmit: SubmitHandler<Inputs> = (data) =>{
    // Check If Mode Is Update With Handling Error
    if(typeof Ptitle === "string"){
     dispatch(updateMssionVision({title:Ptitle,data:data}))
     if(isLoading=="Fail"){
      toast.error("Please Try Again ")
     }
     else{
       toast.success("done")
       navigate("/mission-vision")
     }
   }

  //  Or Mode Add With Handling Error
   else{
     dispatch(addMissionVision(data))
     if(isLoading=="Fail"){
       toast.error("Please Try Again ")
     }
     else{
       toast.success("done")
       
       navigate("/mission-vision")
     }
   }
  }



  




  
  // When isLoading is Pending Show ButtonSpinner Only
  if(isLoading==="Pending"){
    return (
      <div className="flex justify-center items-center h-screen">
        <ButtonSpinner/>
      </div>
    )
  }

  return (
    <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
      {/* Form Fields */}
      <div className="form-group">
        <label htmlFor="Name">Title</label>
        <input
          id="Title"
          type="text"
          placeholder="Enter title"
          defaultValue={title}
          {...register("title",{required:"The Title is Required",validate:(value)=>{
             for(let i=0;i<records.length;i++){
              if(records[i].title==value){
                return "Title Used Before Please Choose Another Title"
              }
             }
            return true;
          }
        })
      }
        />
        {errors.title && <span className="text-red-400">{errors.title.message}</span>}
      </div>
      <div className="form-group full-width">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter Description"
          rows={4}
          defaultValue={description}
          {...register("description",{minLength:{value:10,message:"Too Short Description"},required:"The Description is Required"})}
          ></textarea>
          {errors.description && <span className="text-red-400">{errors.description.message}</span>}
      </div>
      <button type="submit" className="submit-button">
        {typeof Ptitle=="string" ?"UPDATE":"ADD"}
      </button>
    </form>
  );
};

export default MissionVisionForm;
