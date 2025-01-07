// Icons
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

// Styles
import styles from "../../styles"

// Router-Dom
import { useNavigate } from "react-router-dom";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Thunk
import { deleteTestimonial } from "../../redux/slice/testimonials/testimonialSlice"; 

// Component
import Modal from "../Modal/Modal";

// Hooks
import { useState } from "react";

//React-Hot-Toast
import toast from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";


// Types
interface TestimonialsCardProps {
  image?: string;
  name?: string;
  evaluation: number;
  description?: string;
  id?:string
}

// For Renderign Stars In Component
const renderStars = (evaluation: number) => {
  const fullStars = Math.floor(evaluation);
  const halfStar = evaluation % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="stars w-full  flex items-center justify-center gap-1">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} size={20} color="#FF8D4C" />
      ))}
      {halfStar === 1 && <FaStarHalfAlt size={20} color="#FF8D4C" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} size={20} color="#FF8D4C" />
      ))}
    </div>
  );
};

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({
  image,
  description,
  name,
  evaluation,
  id
}) => {

  // State For Modal To Open And Close
  const [open,setOpen]=useState(false)

  // Check Error From Slice  
  const {error}=useAppSelector(state=>state.testimonialSlice)


  const dispatch=useAppDispatch()
  const navigate=useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = ()=>{
    navigate(`/testimonials/update/${id}`)
 
  }

  // Function To Handle Delete Item 
  const handleClickDelete=()=>{
      dispatch(deleteTestimonial(id as string));
      if(!error){
        toast.success("item deleted successfully")
      }
      else{
        toast.error("try again")
      }
  }

  return (
    <div className={`TestimonialsCard ${styles.cardStyle} md:p-12 p-7 max-w-5xl mx-auto`}>
      <div className="flex justify-end items-center  gap-3 mb-2">
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
      <div className="profile text-center">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full mx-auto md:mb-3 mb-2 bg-Orange_97 border border-black"
        />
        <span className="text-Grey_15 font-semibold md:text-[24px] text-[20px]">
          {name}
        </span>
      </div>
      <div className="reate w-full md:py-7 py-5">{renderStars(evaluation)}</div>
      <div className="">
        <p className="text-Grey_20 text-center font-medium md:text-[20px] text-[16px]">
          {description}
        </p>
      </div>


       {/* Modal Component To Show When Click On Delete Button */}
       <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete}/>
    </div>
  );
};

export default TestimonialsCard;
