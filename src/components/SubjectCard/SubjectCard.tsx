import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";

type TProps = {
  id: string;
  name: string;
  description: string;
  image: string;
  to:string,
  deleteAction:any
};

const SubjectCard = ({ id, name, description, image,to,deleteAction }: TProps) => {
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.subjectSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/${to}/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteAction(id as string));
    if (!error) {
      toast.success("item deleted successfully");
    } else {
      toast.error("try again");
    }
  };
  return (
    <div
      className="relative bg-white rounded-xl shadow-card-shadow  flex flex-col justify-center items-center
             gap-[30px] xl:gap-[40px] 2xl:gap-[50px] mb-[30px] xl:mb-[40px] 2xl:mb-[50px] h-full"
    >
      <div className="flex z-10 absolute right-2 top-2 gap-2  ">
        <button
          className="text-4xl  text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"
          onClick={handleClickUpdate}
        >
          <MdEdit />
        </button>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="text-4xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      <div className="absolute bg-Orange_95 w-[25%] xs:h-[50%] md:h-[60%] top-0 border-2 border-Grey_15 rounded-b-xl z-0 "></div>
      <img src={image} className="z-10  items-center mb-20 relative top-20 md:h-64 xs:w-44 md:w-96  rounded-xl" alt={name} />
      <div className="text-center flex flex-col z-10 w-full p-4 ">
        <h5
          className="text-[22px]  
              xl:text-[24px] 2xl:text-[28px] font-[700] text-[#1A1A1A]"
        >
          {name}
        </h5>
        <p
          className="text-[20px] 
               xl:text-[16px] 2xl:text-[20px] font-[500] text-Grey_30 break-words "
        >
          {description}
        </p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete}/>
    </div>
  );
};

export default SubjectCard;
