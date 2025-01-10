
// AddEditSpecialFeature.tsx
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addSpecialFeature, editSpecialFeature } from "../../redux/specialFeatureAct/specialFeatureAct";
import { useNavigate, useLocation } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const AddEditSpecialFeature: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
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
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const { _id, name, description } = location.state;
      setIsEditing(true);
      setName(name);
      setDescription(description);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    if (isEditing && location.state) {
      const { _id } = location.state;
      await dispatch(editSpecialFeature({ id: _id, specialFeature: formData }));
    } else {
      await dispatch(addSpecialFeature(formData));
    }

    setName("");
    setDescription("");
    setImage(null);
    navigate("/special-features");
  };

  return (
    <div className="max-w-6xl mx-auto p-8 rounded-lg">
      <h1 className="text-3xl font-bold mb-8 text-dimBlack text-center">
        {isEditing ? "Edit Special Feature" : "Add New Special Feature"}
      </h1>
      <div className="bg-white p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-dimBlack font-medium mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 border border-Grey_30 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-Grey_30 rounded-lg h-28"
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
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white font-medium rounded-lg"
            >
              {isEditing ? "Update Special Feature" : "Add Special Feature"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/special-features")}
              className="px-5 py-2 bg-gray-400 text-white font-medium rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditSpecialFeature;
