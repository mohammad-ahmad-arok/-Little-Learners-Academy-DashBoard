import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditRoom({
  isOpen,
  setIsopen,
  rooms,
  setrooms,
  index,
}: any) {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: rooms[index].name,
    description: rooms[index].description,
    images: rooms[index].images,
  });

  const roomId = rooms[index]._id;

  const handleChange = (e: any) => {
    setisLoading(false);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  function onImageChange(e: any) {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: Array.from(files),
    }));
  }

  const EditRom = async () => {
    setisLoading(true);
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    formData.images.forEach((file) => {
      form.append("images", file);
    });

    try {
      const res = await axios.put(
        `https://little-learners-academy-back-end-j3iu.onrender.com/api/rooms/${roomId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setrooms(
        rooms.map((item, indexItem) => {
          if (indexItem == index) {
            return res.data.data;
          } else {
            return item;
          }
        })
      );

      toast.success("Room is updated");

      setisLoading(false);
      setFormData({ name: "", description: "", images: [] });
      setIsopen(false);
    } catch (error) {
      toast.error("Error updating room");
      setisLoading(false);
      console.error("Error updating item:", error);
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
                    Update this Room
                  </DialogTitle>
                  <div className="mt-2">
                    <label
                      htmlFor="name"
                      className="block text-dimBlack font-medium mb-2 mt-5"
                    >
                      Name:
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Add name of room"
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <label
                      htmlFor="description"
                      className="block text-dimBlack font-medium mb-2 mt-5"
                    >
                      Description:
                    </label>
                    <input
                      id="description"
                      type="text"
                      name="description"
                      value={formData.description}
                      placeholder="Add description"
                      onChange={handleChange}
                      required
                      className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <label
                      htmlFor="images"
                      className="block text-dimBlack font-medium mb-2 mt-5"
                    >
                      Images:
                    </label>
                    <input
                      type="file"
                      name="images"
                      onChange={onImageChange}
                      multiple // Allow multiple files to be selected
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
                onClick={() => EditRom()}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                <svg
                  className={` ${
                    isLoading ? "block" : "hidden"
                  }  animate-spin h-5 w-5 mr-3 rounded-full border-t-4 border-s-4 border-gray-100`}
                  viewBox="0 0 24 24"
                ></svg>
                Update Room
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
