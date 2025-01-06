import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";

import styles2 from "../dashboardNav/header.module.css";

import { deleteMember } from "../../redux/slice/members/memberSlice";
import toast from "react-hot-toast";
import Modal from "../Modal/Modal";

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
    <div className="w-full  bg-white border-r-8 border-b-8 border-l-2 border-t-2 border-[#262626] rounded p-10">
      <div className="flex justify-between items-center  gap-3 mb-2">
       <div className="flex  gap-2">
       <button className={styles2.btn} onClick={handleClickUpdate}>
          UPDATE
        </button>
        <button
          className={styles2.btn}
          onClick={() => {
            setOpen(true);
          }}
        >
          DELETE
        </button>
       </div>
      <div className="w-20">
      <img src={photo} className="border-2 border-black rounded" alt="photo" />
      </div>

      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <h2 className="font-extrabold text-2xl ml-3">{name}</h2>
        </div>
      </div>

      <div className="w-full xs:h-[256px] lg:h-[220px] bg-[#FFF5F0] mt-5 border-2 border-black">
        <p className="font-semibold text-xl text-left xs:p-2 p-6">
          {qualification}
        </p>
        <p className="font-medium">{description}</p>
        <p className="text-Grey_30 text-center mt-20">{email}</p>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete}/>
    </div>
  );
};

export default MemberCard;
