// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import {
  addStudentSupport,
  updateStudentSupport,
} from "../../../redux/slice/studentSupport/studentSupportSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";
import UploadImage from "../../common/uploadImage/UploadImage";

// Types
type Inputs = {
  name: string;
  image: string;
  description: string;
};

const StudentSupportForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.StudentSupport
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = records.find((item) => item._id === id);
      if (record) {
        setName(record.name);
        setDescription(record.description);
      }
    }
  }, [id, isUpdateMode, records]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name,
      description,
    },
  });

  useEffect(() => {
    reset({ name, description });
  }, [name, description, reset]);

  // Function To Handle Submit
  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("name", data.name);
    form.append("description", data.description);

    const action = isUpdateMode
      ? updateStudentSupport({ id: id, data: form })
      : addStudentSupport(form);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/student-support");
      }
    });
  };

  return (
    <Loading status={isLoading} error={error}>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            id="Name"
            type="text"
            placeholder="Enter Name"
            {...register("name", { required: "The Name is Required" })}
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
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

        <UploadImage form={form} type="image" records={records}/>
        <button type="submit" className="submit-button">
          {typeof id == "string" ? "UPDATE" : "ADD"}
        </button>
      </form>
    </Loading>
  );
};

export default StudentSupportForm;
