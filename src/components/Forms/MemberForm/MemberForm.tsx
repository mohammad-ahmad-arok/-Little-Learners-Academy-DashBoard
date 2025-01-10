// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "../Forms.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import {
  addMember,
  updateMember,
} from "../../../redux/slice/members/memberSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../../common/Loading/Loading";
import UploadImage from "../../common/uploadImage/UploadImage";

// Types
type Inputs = {
  name: string;
  photo: string;
  description: string;
  qualification: string;
  email: string;
};

const MemberForm: React.FC = () => {
  const dispatch = useAppDispatch();


  const { id } = useParams();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.memberSlice
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [qualification, setQualification] = useState<string | undefined>("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  



  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = records.find((item) => item._id === id);
      if (record) {
        setName(record.name);
        setDescription(record.description);
        setQualification(record.qualification);
        setEmail(record.email);
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
      qualification,
      description,
      email,
    },
  });

  useEffect(() => {
    reset({ name, qualification, description, email });
  }, [name, qualification, email, description, reset]);


  // Function To Handle Submit
  const form = new FormData();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("qualification", data.qualification);
    form.append("email", data.email);


    const action = isUpdateMode
      ? updateMember({ id: id, data: form })
      : addMember(form);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/team-members");
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
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            {...register("email", { required: "The email is Required" })}
          />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            id="qualification"
            type="text"
            placeholder="Enter qualification"
            {...register("qualification", {
              required: "The Evaluation is Required",
            })}
          />
          {errors.qualification && (
            <span className="text-red-400">{errors.qualification.message}</span>
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


        <UploadImage form={form} type="photo" records={records}/>

        <button type="submit" className="submit-button">
          {typeof id == "string" ? "UPDATE" : "ADD"}
        </button>
      </form>
    </Loading>
  );
};

export default MemberForm;
