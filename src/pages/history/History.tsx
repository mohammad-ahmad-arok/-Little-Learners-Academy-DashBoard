import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHistories, removeHistory } from "../../redux/history/historyAct";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";

const History: React.FC = () => {
  const { histories, loading, error } = useSelector((state: RootState) => state.histories);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Fetch histories on component load
  useEffect(() => {
    dispatch(fetchHistories());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeHistory(id));
  };

  // Conditional rendering based on loading and error
  if (loading) {
    return <Loading status="Pending" error={error || ""}>Loading Histories...</Loading>;
  }

  if (error) {
    return <Loading status="Fail" error={error}>Failed to load histories.</Loading>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg">
      {/* Page Header */}
      <h1 className="text-3xl font-semibold mb-6 text-dimBlack text-center">History Management</h1>

      {/* Add History Button */}
      <button
        onClick={() => navigate("/add-edit-history")} // Navigate to Add History page
        className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
      >
        Add New History
      </button>

      {/* History List Section */}
      <div>
        <h2 className="text-2xl font-semibold text-dimBlack mb-4">All History Entries</h2>
        {histories.length === 0 ? (
          <p className="text-dimGray text-center">No history entries found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {histories.map((history) => (
              <div
                key={history._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-lg font-semibold text-dimBlack">{history.year}</h3>
                <p className="text-primary font-medium italic">{history.title}</p>
                <p className="text-dimBlack mt-2 text-sm">{history.description}</p>
                <div className="flex justify-between items-center mt-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => navigate("/add-edit-history", { state: history })} // Navigate to Edit History page
                    className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
                  >
                    Edit
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(history._id)}
                    className="px-5 py-2 bg-red-400  text-white  font-medium rounded-lg hover:bg-red-500 transition-all mb-6"
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
