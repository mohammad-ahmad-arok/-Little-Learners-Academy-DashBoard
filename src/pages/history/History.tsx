import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHistories, createHistory, editHistory, removeHistory } from "../../redux/history/historyAct";
import { RootState, AppDispatch } from "../../redux/store";


const History: React.FC = () => {
  const { histories, loading, error } = useSelector((state: RootState) => state.histories);
  const dispatch = useDispatch<AppDispatch>();


  const [year, setYear] = useState<number>(0);
    const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingHistory, setEditingHistory] = useState<{
    _id: string;
    year: number;
    title: string;
    description: string;
  } | null>(null);

  // Fetch histories on component load
  useEffect(() => {
    dispatch(fetchHistories());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHistory) {
      dispatch(
        editHistory({ id: editingHistory._id, history: { year, title, description } })
      );
    } else {
      dispatch(createHistory({ year, title, description }));
    }

    // Reset form
    setYear(0);
    setTitle("");
    setDescription("");
    setEditingHistory(null);
  };

  const handleEdit = (history: { _id: string; year: number; title: string; description: string }) => {
    setEditingHistory(history);
    setYear(history.year);
    setTitle(history.title);
    setDescription(history.description);
  };

  const handleDelete = (id: string) => {
    dispatch(removeHistory(id));
  };

  if (loading) return <p>Loading histories...</p>;
  if (error) return <p>{error}</p>;

  return (
<div className="max-w-6xl mx-auto p-8 bg-dimWhite rounded-lg shadow-xl">
  {/* Page Header */}
  <h1 className="text-4xl font-bold mb-8 text-dimBlack text-center">History Management</h1>

  {/* Form Section */}
  <div className="bg-white p-8 rounded-lg shadow-lg">
    <h2 className="text-2xl font-semibold text-primary mb-6">
      {editingHistory ? "Edit History" : "Add New History"}
    </h2>
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
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
          className="px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
        >
          {editingHistory ? "Update History" : "Add History"}
        </button>
        {editingHistory && (
          <button
            type="button"
            onClick={() => setEditingHistory(null)}
            className="px-6 py-3 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  </div>

  {/* History List Section */}
  <div className="mt-12">
    <h2 className="text-3xl font-semibold text-dimBlack mb-6">All Histories</h2>
    {histories.length === 0 ? (
      <p className="text-dimGray text-center">No history entries found.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {histories.map((history) => (
          <div
            key={history._id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-xl font-bold text-dimBlack">{history.year}</h3>
            <p className="text-lg text-primary font-medium italic">{history.title}</p>
            <p className="text-dimBlack mt-2">{history.description}</p>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => handleEdit(history)}
                className="px-4 py-2 bg-orange-400 text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(history._id)}
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

export default History;
