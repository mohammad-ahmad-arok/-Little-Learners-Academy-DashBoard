import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddServicesModal({
  isOpen,
  setIsopen,
  services,
  setservices,
}: any) {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    service: "",
    price: "",
  });

  const handleChange = (e: any) => {
    setisLoading(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addService = async () => {
    setisLoading(true);

    try {
      const res = await axios.post(
        "https://little-learners-academy-back-end-j3iu.onrender.com/api/additional-services",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Item added:", res.data.data);
      setservices([...services, res.data.data]);
      toast.success("Service is added");

      setisLoading(false);
      setFormData({ service: "", price: "" });
      setIsopen(false);
    } catch (error) {
      toast.error("Error adding service");
      setisLoading(false);
      console.error("Error adding item:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={setIsopen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-[80%] lg:min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle
                    as="h3"
                    className="text-2xl lg:text-3xl font-bold text-gray-900"
                  >
                    Add New Service
                  </DialogTitle>
                  <div className="mt-2">
                    <label
                      htmlFor="service"
                      className="block text-dimBlack font-medium mb-2 mt-5"
                    >
                      Service Name:
                    </label>
                    <input
                      id="service"
                      type="text"
                      name="service"
                      value={formData.service}
                      placeholder="Add name of service"
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <label
                      htmlFor="price"
                      className="block text-dimBlack font-medium mb-2 mt-5"
                    >
                      Price[$]:
                    </label>
                    <input
                      id="price"
                      type="text"
                      name="price"
                      value={formData.price}
                      placeholder="Add price"
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => addService()}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                <svg
                  className={` ${
                    isLoading ? "block" : "hidden"
                  }  animate-spin h-5 w-5 mr-3 rounded-full border-t-4 border-s-4 border-gray-100`}
                  viewBox="0 0 24 24"
                ></svg>
                Add Service
              </button>
              <button
                type="button"
                data-autofocus
                onClick={() => {
                  setIsopen(false);
                  setisLoading(false);
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}
