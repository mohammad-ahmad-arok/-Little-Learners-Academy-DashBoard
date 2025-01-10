import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { fetchFeeStructures, removeFeeStructure } from "../../redux/slice/feeStructureSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading"; 

const FeeStructures: React.FC = () => {
  const { feeStructures, loading, error } = useSelector((state: RootState) => state.feeStructures);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchFeeStructures());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeFeeStructure(id));
  };

  return (
    <Loading status={loading ? "Pending" : "Idle"} error={error}>
      <div className="max-w-6xl mx-auto p-6 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6 text-center">Fee Structure Management</h1>

        <button
          onClick={() => navigate("/add-fee-structure")}
          className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
        >
          Add New Fee Structure
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {feeStructures.map((fee) => (
            <div
              key={fee._id}
              className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-lg font-semibold">{fee.program}</h3>
              <p>Age Group: {fee.ageGroup}</p>
              <p>Annual Tuition: {fee.annualTuition}</p>
              <p>Registration Fee: {fee.registrationFee}</p>
              <p>Activity Fee: {fee.activityFee}</p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => navigate(`/edit-fee-structure/${fee._id}`)}
                  className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(fee._id)}
                  className="px-5 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Loading>
  );
};

export default FeeStructures;
