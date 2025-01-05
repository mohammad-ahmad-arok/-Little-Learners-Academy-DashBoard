// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "./TestimonialForm.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import {
  addMissionVision,
  updateMssionVision,

} from "../../redux/slice/mission-vision/missionVisionSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../common/Loading/Loading";

// Types
type Inputs = {
  title: string;
  description: string;
};

const MissionVisionForm: React.FC = () => {

  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.missionVision
  );

  const navigate = useNavigate();

  const { Ptitle } = useParams();

  //  Set Values To Inputs From Testimonial
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof Ptitle === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const record = records.find((item) => item.title === Ptitle);
      if (record) {
        setTitle(record.title);
        setDescription(record.description);
      }
    }
  }, [Ptitle, records, isUpdateMode]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      title,
      description,
    },
  });

  // Function To Handle Submit
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const action = isUpdateMode
      ? updateMssionVision({ title: Ptitle, data: data })
      : addMissionVision(data);

    dispatch(action).then(() => {
      if (isLoading == "Fail") {
        toast.error("Please Try Again ");
      } else {
        toast.success("done");

        navigate("/mission-vision");
      }
    });
  };

  useEffect(() => {
    reset({ title, description });
  }, [ title, description, reset]);

  return (
    <Loading status={isLoading} error={error}>
      <form className="student-form-form" onSubmit={handleSubmit(onSubmit)}>
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="Name">Title</label>
          <input
            id="Title"
            type="text"
            placeholder="Enter title"
            {...register("title", {
              required: "The Title is Required",
              validate: (value) => {
                for (let i = 0; i < records.length; i++) {
                  if (records[i].title == value) {
                    return "Title Used Before Please Choose Another Title";
                  }
                }
                return true;
              },
            })}
          />
          {errors.title && (
            <span className="text-red-400">{errors.title.message}</span>
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
              required: "The Description is Required",
            })}
          ></textarea>
          {errors.description && (
            <span className="text-red-400">{errors.description.message}</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          {typeof Ptitle == "string" ? "UPDATE" : "ADD"}
        </button>
      </form>
    </Loading>
  );
};

export default MissionVisionForm;
