import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createBenefit, editBenefit } from "../../redux/benefit/benefit";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const AddEditBenefit: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the ID for editing (optional)

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setIcon(file);
      const reader = new FileReader();
      reader.onloadend = () => setIconPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (icon) formData.append("icon", icon);

    if (id) {
      dispatch(editBenefit({ id, formData }));
    } else {
      dispatch(createBenefit(formData));
    }

    navigate("/"); // Redirect back to the Benefits page
  };

  return (
    <div className="min-h-screen flex flex-col justify-start p-8">
      <h1 className="text-3xl font-bold mb-8 text-dimBlack text-center">
        {id ? "Edit Benefit" : "Add New Benefit"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto w-full">
        <div>
          <label className="block text-dimBlack font-medium mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
          />
        </div>
        <div>
          <label className="block text-dimBlack font-medium mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg h-40"
          ></textarea>
        </div>
        <div>
          <label className="block text-dimBlack font-medium mb-2">Icon:</label>
          <div className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary relative">
            {iconPreview ? (
              <img
                src={iconPreview}
                alt="Icon Preview"
                className="w-16 h-16 rounded-full object-cover mx-auto"
              />
            ) : (
              <p className="text-center text-dimGray">Choose an icon</p>
            )}
            <input
              type="file"
              onChange={handleIconChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all mb-6"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
          >
            {id ? "Update Benefit" : "Add Benefit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEditBenefit;
