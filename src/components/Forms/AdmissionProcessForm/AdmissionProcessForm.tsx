import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  addAdmissionProcess,
  updateAdmissionProcess,
} from "../../../redux/slice/admissionProcess/admissionProcessSlice";
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

  // Info From Slice
  const { admissionProcess, isLoading, error } = useAppSelector(
    (state) => state.admissionProcessSlice
  );

  const navigate = useNavigate();

  const [step, setStep] = useState("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const admissionProces = admissionProcess.find((item) => item._id === id);
      if (admissionProces) {
        setStep(admissionProces.step);
        setDescription(admissionProces.description);
      }
    }
  }, [id, isUpdateMode, admissionProcess]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      step,
      description,
    },
  });

  useEffect(() => {
    reset({ step, description });
  }, [step, description, reset]);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("step", data.step);
    form.append("description", data.description);

    const action = isUpdateMode
      ? updateAdmissionProcess({ id: id, data: form })
      : addAdmissionProcess({ step: data.step, description: data.description });

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/admissionProcess");
      }
    });
  };

  return (
    <Loading status={isLoading} error={error}>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Name">step</label>
          <input
            id="step"
            type="text"
            placeholder="Enter step"
            {...register("step", { required: "The Name is Required" })}
          />
          {errors.step && (
            <span className="text-red-400">{errors.step.message}</span>
          )}
        </div>

        <div className="form-group full-width">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Enter Description"
            rows={4}
            {...register("description", {
              minLength: { value: 10, message: "Too Short Description" },
            })}
          ></textarea>
          {errors.description && (
            <span className="text-red-400">{errors.description.message}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          {typeof id == "string" ? "UPDATE" : "ADD"}
        </button>
      </form>
    </Loading>
  );
};

export default AdmissionProcessForm;
