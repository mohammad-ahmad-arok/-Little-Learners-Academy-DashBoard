import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addAdmissionProcess, updateAdmissionProcess } from "../../../redux/slice/admissionProcess/admissionProcessSlice";
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";

// Types
type Inputs = {
  step: string;
  description: string;
};

const AdmissionProcessForm = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { admissionProcess, isLoading, error } = useAppSelector((state) => state.admissionProcessSlice);
  const navigate = useNavigate();

  const [step, setStep] = useState("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof id === "string";

  // Load the admission process data if in update mode
  useEffect(() => {
    if (isUpdateMode) {
      const admissionProces = admissionProcess.find((item) => item._id === id);
      if (admissionProces) {
        setStep(admissionProces.step);
        setDescription(admissionProces.description);
      }
    }
  }, [id, isUpdateMode, admissionProcess]);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: { step, description },
  });

  useEffect(() => {
    reset({ step, description });
  }, [step, description, reset]);

  // Handle Form Submission
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const action = isUpdateMode
      ? updateAdmissionProcess({ id: id!, data: { step: data.step, description: data.description } })
      : addAdmissionProcess({ step: data.step, description: data.description });

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please try again");
      } else {
        toast.success(isUpdateMode ? "Update Successful" : "Addition Successful");
        navigate("/admissionProcess");
      }
    });
  };

  // Handle Cancel Button Click
  const handleCancel = () => {
    navigate("/admissionProcess");
  };

  return (
    <Loading status={isLoading} error={error}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="form-group">
          <label htmlFor="step">Step</label>
          <input
            id="step"
            type="text"
            placeholder="Enter step"
            {...register("step", { required: "Step is required" })}
          />
          {errors.step && <span className="text-red-400">{errors.step.message}</span>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter Description"
            rows={4}
            {...register("description", { minLength: { value: 10, message: "Description is too short" } })}
          ></textarea>
          {errors.description && <span className="text-red-400">{errors.description.message}</span>}
        </div>

        <div className="flex gap-4">
          {/* Update Button (using original design) */}
          <button
            type="submit"
            className="px-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-orange-500 transition-all"
          >
            {isUpdateMode ? "Update" : "Add"}
          </button>

          {/* Cancel Button (using original design) */}
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </Loading>
  );
};

export default AdmissionProcessForm;
