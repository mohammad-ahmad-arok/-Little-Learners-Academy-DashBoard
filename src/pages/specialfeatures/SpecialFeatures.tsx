import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecialFeatures, removeSpecialFeature } from "../../redux/specialFeatureAct/specialFeatureAct";
import { RootState, AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/common/Loading/Loading";

const SpecialFeatures: React.FC = () => {
  const { specialFeatures, loading, error } = useSelector((state: RootState) => state.specialFeatures);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchSpecialFeatures());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(removeSpecialFeature(id));
  };

  if (loading) {
    return <Loading status="Pending" error={error || ""}>Loading Special Features...</Loading>;
  }

  if (error) {
    return <Loading status="Fail" error={error}>Failed to load special features.</Loading>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-dimBlack text-center">Special Features Management</h1>
      <button
        onClick={() => navigate("/add-edit-special-feature")}
        className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
      >
        Add New Special Feature
      </button>
      <div>
        <h2 className="text-2xl font-semibold text-dimBlack mb-4">All Special Features</h2>
        {specialFeatures.length === 0 ? (
          <p className="text-dimGray text-center">No special features found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialFeatures.map((feature) => (
              <div
                key={feature._id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
              >
                <h3 className="text-lg font-semibold text-dimBlack">{feature.name}</h3>
                <p className="text-primary font-medium italic">{feature.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => navigate("/add-edit-special-feature", { state: feature })}
                    className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(feature._id)}
                    className="px-5 py-2 bg-red-400 text-white font-medium rounded-lg hover:bg-red-500 transition-all"
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

export default SpecialFeatures;
