import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import EditServices from "./EditServices";
import DeleteServicesModal from "./DeleteServicesModal";

export const RowofServices = ({ index, ele, services, setservices }: any) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [indexOfColumn, setindexOfColumn] = useState<number>(-1);
  const service = services[index];

  return (
    <tr
      onMouseEnter={() => setindexOfColumn(index)}
      onMouseLeave={() => setindexOfColumn(-1)}
      key={index}
      className={` bg-white shadow cursor-pointer hover:bg-slate-100  text-Grey_15 text-[20px]  font-medium`}
    >
      <td className=" p-4 border-r-2 border-b-2 border-Grey_15 text-left w-[600px]   h-20 ">
        {ele.service}
      </td>
      <td className="relative p-4 border-r-2 border-b-2 border-Grey_15 text-left  w-[600px]  h-20">
        {ele.price}$
        <div
          className={`
      ${indexOfColumn == index ? "right-0" : "-right-40"}
      absolute  ease-linear duration-300 indent-10 
       top-[15%] flex justify-center lg:justify-end  gap-3 me-8 mb-5`}
        >
          <button
            className="text-4xl  text-white hover:bg-red-400 bg-[#FF8D4C] p-2 rounded-lg"
            onClick={() => {
              setOpenEditModal(true);
            }}
          >
            <MdEdit />
          </button>
          <button
            onClick={() => {
              setOpenDeleteModal(true);
            }}
            className="text-4xl text-white hover:bg-red-400 bg-red-600 p-2 rounded-lg"
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </td>

      <>
        <EditServices
          index={index}
          isOpen={openEditModal}
          setIsopen={setOpenEditModal}
          service={service}
          services={services}
          setservices={setservices}
        />
        <DeleteServicesModal
          index={index}
          isOpen={openDeleteModal}
          setIsopen={setOpenDeleteModal}
          service={service}
          services={services}
          setservices={setservices}
        />
      </>
    </tr>
  );
};
