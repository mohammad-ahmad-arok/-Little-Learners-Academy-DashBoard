import { useEffect, useState } from "react";
import AddServicesModal from "../../components/additionalServicesModal/AddServicesModal";
import styles from "../../components/dashboardNav/header.module.css";
import { RowofServices } from "../../components/additionalServicesModal/RowofServices";

type service = {
  service: string;
  price: string;
};

export const AdditionalServices = () => {
  const [services, setservices] = useState<service[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(
      "https://little-learners-academy-back-end-j3iu.onrender.com/api/additional-services"
    )
      .then((response) => response.json())
      .then((data) => setservices(data.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <button
        className={`${styles.btn} mt-4 ms-10 w-fit`}
        onClick={() => {
          setOpen((pre) => !pre);
        }}
      >
        New Service
      </button>
      <div className="p-6 xl:me-20 mx-10 bg-white   shadow-md border border-black mt-24 md:shadow-custom-lg shadow-black overflow-x-auto ">
        <AddServicesModal
          isOpen={open}
          setIsopen={setOpen}
          services={services}
          setservices={setservices}
        />
        <table className=" border-separate border border-Grey_15 w-full   overflow-hidden  border-spacing-0 mb-4 rounded-xl">
          <thead>
            <tr className="bg-Orange_95   shadow  text-Grey_15 text-[30px] ">
              <th className=" p-4  text-left font-bold h-20 " colSpan={2}>
                Additional Services
              </th>
            </tr>
          </thead>
        </table>

        <table className=" border-separate border border-Grey_15 w-full   overflow-hidden  border-spacing-0 rounded-xl">
          <tbody>
            {services.map((item, index) => (
              <RowofServices
                key={index}
                index={index}
                ele={item}
                services={services}
                setservices={setservices}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
