//Benefits
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBenefits, removeBenefit } from "../../redux/benefit/benefit";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";

const Benefits: React.FC = () => {
  const { benefits, loading, error } = useSelector((state: RootState) => state.benefits);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Fetch benefits
  useEffect(() => {
    dispatch(fetchBenefits());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeBenefit(id));
  };

  return (
    <Loading status={loading ? "Pending" : error ? "Fail" : "Success"} error={error}>
      <div className="max-w-6xl mx-auto p-6  rounded-lg ">
        {/* Page Header */}
        <h1 className="text-3xl font-semibold mb-6 text-dimBlack text-center">Benefits Management</h1>

        {/* Add Benefit Button */}
        <button
          onClick={() => navigate("/add-benefit")} // Navigate to Add Benefit page
          className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
        >
          Add New Benefit
        </button>

        {/* Benefits List Section */}
        <div>
          <h2 className="text-2xl font-semibold text-dimBlack mb-4">All Benefits</h2>
          {benefits.length === 0 ? (
            <p className="text-dimGray text-center">No benefits found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit) => (
                <div
                  key={benefit._id}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-dimBlack">{benefit.title}</h3>
                  {benefit.icon && <img src={benefit.icon} alt="Icon" className="w-12 h-12 mt-3" />}
                  <p className="text-dimBlack mt-2 text-sm">{benefit.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => navigate(`/edit-benefit/${benefit._id}`)} // Navigate to Edit Benefit page
                      className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(benefit._id)}
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
    </Loading>
  );
};

export default Benefits;
