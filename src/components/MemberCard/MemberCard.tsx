import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";


import { deleteMember } from "../../redux/slice/members/memberSlice";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";


import { MdEdit } from "react-icons/md";

import { RiDeleteBin6Line } from "react-icons/ri";


type TProps = {
  id: string;
  name: string;
  photo: string;
  description: string;
  qualification: string;
  email?: string;
};

const MemberCard: React.FC<TProps> = ({
  id,
  name,
  photo,
  description,
  qualification,
  email,
}) => {
  const [open, setOpen] = useState(false);

  // Check Error From Slice
  const { error } = useAppSelector((state) => state.memberSlice);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Function To Handle Navigation To Update Page
  const handleClickUpdate = () => {
    navigate(`/team-members/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = () => {
    dispatch(deleteMember(id as string));
    if (!error) {
      toast.success("item deleted successfully");
    } else {
      toast.error("try again");
    }
  };
  return (
    <div className="max-w-4xl h-full   bg-white border-r-8 border-b-8 border-l-2 border-t-2 border-[#262626] rounded p-10 mx-auto">
      <div className="flex justify-between items-center flex-row-reverse  gap-3 mb-2">
       <div className="flex  gap-3">
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
      <div className="w-36">
      <img src={photo} className="border-2 border-black rounded mb-4 w-auto" alt="photo" />
      </div>

      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <h2 className="font-extrabold text-2xl ml-3">{name}</h2>
        </div>
      </div>

      <div className="w-full  bg-[#FFF5F0] mt-5 border-2 border-black p-10 break-words">
        <p className="font-semibold text-xl text-left xs:p-2 p-6">
          {qualification}
        </p>
        <p className="font-medium break-words">{description}</p>
        <p className="text-Grey_30 text-center mt-20">{email}</p>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete}/>
    </div>
  );
};

export default MemberCard;
