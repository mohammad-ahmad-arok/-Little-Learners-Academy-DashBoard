import React, { useState } from "react";
import styles from "../../styles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { deleteActivity } from "../../redux/slice/activities/activitySlice";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import Modal from "../Modal/Modal";

interface IProps {
  id: string;
  name: string;
  description: string;
  image: string;
}

const ActivityCard: React.FC<IProps> = ({ id, image, name, description }) => {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false); 
  const { error } = useAppSelector((state) => state.activitySlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleClickUpdate = () => {
    navigate(`/activities/update/${id}`);
  };

  // Function To Handle Delete Item
  const handleClickDelete = async () => {
    setDeleting(true); 
    try {
      await dispatch(deleteActivity(id));
      toast.success("Item deleted successfully");
    } catch (error) {
      toast.error("Try again");
    } finally {
      setDeleting(false); 
    }
  };

  return (
    <div
      className={`BenefitCard ${styles.cardStyle} relative md:px-12 px-6 pt-20 pb-12 w-full mt-10 h-full`}
    >
      <div className="flex z-10 absolute right-4 top-4 gap-2">
        <button
          className="text-4xl text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"
          onClick={handleClickUpdate}
        >
          <MdEdit />
        </button>
        <button
          onClick={() => setOpen(true)}
          className="text-4xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
        >
          <RiDeleteBin6Line />
        </button>
      </div>

      <div className="header">
        <div className="icon-box bg-Orange_90 border-2 border-black rounded-lg absolute -top-8 left-5">
          <div className="p-5">
            <img src={image || "/default-image.png"} className="w-10" alt={name} />
          </div>
        </div>
        <div className="body">
          <h4 className="md:text-[28px] text-[22px] font-[700]">{name || "Untitled Activity"}</h4>
          <p className="md:text-[20px] text-[16px] font-[500] text-Grey_30 mt-4">
            {description || "No description available"}
          </p>
        </div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)} handleClickDelete={handleClickDelete} />
    </div>
  );
};

export default ActivityCard;
