import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createFeeStructure, editFeeStructure, fetchFeeStructureById } from "../../redux/slice/feeStructureSlice";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { RootState } from "../../redux/store";

const AddEditFeeStructure: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams(); 

  const { loading, error, feeStructures } = useSelector((state: RootState) => state.feeStructures);
  
  const [program, setProgram] = useState<string>("");
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [annualTuition, setAnnualTuition] = useState<string>("");
  const [registrationFee, setRegistrationFee] = useState<string>("");
  const [activityFee, setActivityFee] = useState<string>("");


  useEffect(() => {
    if (id) {
      dispatch(fetchFeeStructureById(id));
    }
  }, [id, dispatch]);


  useEffect(() => {
    if (id && feeStructures.length > 0) {
      const feeStructure = feeStructures.find((fs) => fs._id === id);
      if (feeStructure) {
        setProgram(feeStructure.program);
        setAgeGroup(feeStructure.ageGroup);
        setAnnualTuition(feeStructure.annualTuition);
        setRegistrationFee(feeStructure.registrationFee);
        setActivityFee(feeStructure.activityFee);
      }
    }
  }, [id, feeStructures]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!program || !ageGroup || !annualTuition || !registrationFee || !activityFee) {
      return;
    }

    const formData = {
      program,
      ageGroup,
      annualTuition,
      registrationFee,
      activityFee,
    };

    if (id) {
      dispatch(editFeeStructure({ id, formData }));
    } else {
      dispatch(createFeeStructure(formData));
    }

    navigate("/fee-structure"); 
  };

  return (
    <div className="min-h-screen flex flex-col justify-start p-8">
      <h1 className="text-3xl font-bold mb-8 text-dimBlack text-center">
        {id ? "Edit Fee Structure" : "Add New Fee Structure"}
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-solid border-primary rounded-full" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mb-4">{error}</div> // Error message
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto w-full">
          <div>
            <label className="block text-dimBlack font-medium mb-2">Program:</label>
            <input
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Age Group:</label>
            <input
              type="text"
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Annual Tuition:</label>
            <input
              type="text"
              value={annualTuition}
              onChange={(e) => setAnnualTuition(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Registration Fee:</label>
            <input
              type="text"
              value={registrationFee}
              onChange={(e) => setRegistrationFee(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div>
            <label className="block text-dimBlack font-medium mb-2">Activity Fee:</label>
            <input
              type="text"
              value={activityFee}
              onChange={(e) => setActivityFee(e.target.value)}
              required
              className="w-full p-4 border border-Grey_30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
            />
          </div>
          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={() => navigate("/fee-structure")}
              className="px-5 py-2 bg-Grey_40 text-white font-medium rounded-lg hover:bg-Grey_60 transition-all mb-6"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all mb-6"
            >
              {id ? "Update Fee Structure" : "Add Fee Structure"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddEditFeeStructure;
