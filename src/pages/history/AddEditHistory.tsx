import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createHistory, editHistory } from "../../redux/history/historyAct";
import { useNavigate, useLocation } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const AddEditHistory: React.FC = () => {
  const [year, setYear] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're editing an existing history
  useEffect(() => {
    if (location.state) {
      const { _id, year, title, description } = location.state;
      setIsEditing(true);
      setYear(year);
      setTitle(title);
      setDescription(description);
    }
  }, [location.state]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing && location.state) {
      // Editing existing history
      const { _id } = location.state;
      dispatch(editHistory({ id: _id, history: { year, title, description } }));
    } else {
      // Adding new history
      dispatch(createHistory({ year, title, description }));
    }

    // Reset form and navigate back to History list page
    setYear(0);
    setTitle("");
    setDescription("");
    navigate("/history");  // Redirect back to the history page after submission
  };

  return (
    <div className="max-w-6xl mx-auto p-8  rounded-lg ">
      <h1 className="text-3xl font-bold mb-8 text-dimBlack text-center">
        {isEditing ? "Edit History" : "Add New History"}
      </h1>

      <div className="bg-white p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Year Input */}
            <div>
              <label className="block text-dimBlack font-medium mb-2">Year:</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                className="w-full p-3 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

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
              className="px-5 py-2 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all mb-6"
            >
              {isEditing ? "Update History" : "Add History"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/history")}
              className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditHistory;
