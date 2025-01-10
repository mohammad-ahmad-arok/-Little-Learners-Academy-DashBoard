import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { deleteSubject } from "../../redux/slice/subjects/subjectSlice";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";

type TProps = {
  id: string;
  name: string;
  description: string;
  image: string;
};

const SubjectCard = ({ id, name, description, image }: TProps) => {
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.subjectSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/subjects/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteSubject(id as string));
    if (!error) {
      toast.success("item deleted successfully");
    } else {
      toast.error("try again");
    }
  };
  return (
    <div
      className="relative bg-white rounded-xl shadow-card-shadow w-full flex flex-col justify-center items-center h-full
             gap-[30px] xl:gap-[40px] 2xl:gap-[50px] mb-[30px] xl:mb-[40px] 2xl:mb-[50px]"
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
      <div className="absolute bg-Orange_95 w-[25%] h-[65%] 2xl:h-[70%] top-0 border-2 border-Grey_15 rounded-b-xl z-0 "></div>
      <img src={image} className="z-10 xs:w-56 md:w-80 xs:h-40 md:h-52 mt-14 rounded-xl" alt={name} />
      <div className="text-center flex flex-col ">
        <h5
          className="text-[22px]  
              xl:text-[24px] 2xl:text-[28px] font-[700] text-[#1A1A1A]"
        >
          {name}
        </h5>
        <p
          className="text-[20px] 
               xl:text-[16px] 2xl:text-[20px] font-[500] text-Grey_30"
        >
          {description}
        </p>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete}/>
    </div>
  );
};

export default SubjectCard;
