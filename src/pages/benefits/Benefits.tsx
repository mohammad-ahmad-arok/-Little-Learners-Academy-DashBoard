import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBenefits, createBenefit, editBenefit, removeBenefit } from "../../redux/benefit/benefit";
import { RootState, AppDispatch } from "../../redux/store";

const Benefits: React.FC = () => {
  const { benefits, loading, error } = useSelector((state: RootState) => state.benefits);
  const dispatch = useDispatch<AppDispatch>();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [icon, setIcon] = useState<File | null>(null);
  const [editingBenefit, setEditingBenefit] = useState<{ _id: string; title: string; description: string; icon?: string } | null>(null);

  // Fetch benefits
  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (icon) formData.append("icon", icon);

    if (editingBenefit) {
      dispatch(editBenefit({ id: editingBenefit._id, formData }));
    } else {
      dispatch(createBenefit(formData));
    }

    setTitle("");
    setDescription("");
    setIcon(null);
    setEditingBenefit(null);
  };

  const handleEdit = (benefit: { _id: string; title: string; description: string; icon?: string }) => {
    setEditingBenefit(benefit);
    setTitle(benefit.title);
    setDescription(benefit.description);
  };

  const handleDelete = (id: string) => {
    dispatch(removeBenefit(id));
  };

  if (loading) return <p>Loading benefits...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-dimWhite rounded-lg shadow-xl">
      {/* Page Header */}
      <h1 className="text-4xl font-bold mb-8 text-dimBlack text-center">Benefits Management</h1>

      {/* Form Section */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          {editingBenefit ? "Edit Benefit" : "Add New Benefit"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Title Input */}
            <div>
              <label className="block text-dimBlack font-medium mb-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Icon Input */}
            <div>
              <label className="block text-dimBlack font-medium mb-2">Icon:</label>
              <input
                type="file"
                onChange={(e) => setIcon(e.target.files ? e.target.files[0] : null)}
                className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-dimBlack font-medium mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-28"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
            >
              {editingBenefit ? "Update Benefit" : "Add Benefit"}
            </button>
            {editingBenefit && (
              <button
                type="button"
                onClick={() => setEditingBenefit(null)}
                className="px-6 py-3 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Benefits List Section */}
      <div className="mt-12">
        <h2 className="text-3xl font-semibold text-dimBlack mb-6">All Benefits</h2>
        {benefits.length === 0 ? (
          <p className="text-dimGray text-center">No benefits found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-xl font-bold text-dimBlack">{benefit.title}</h3>
                {benefit.icon && <img src={benefit.icon} alt="Icon" className="w-16 h-16 mt-4" />}
                <p className="text-dimBlack mt-2">{benefit.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleEdit(benefit)}
                    className="px-4 py-2 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(benefit._id)}
                    className="px-4 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Benefits;
