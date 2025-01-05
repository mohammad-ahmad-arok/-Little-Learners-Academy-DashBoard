// React And Hooks
import React, { useEffect, useState } from "react";

//Hook-Form
import { useForm, SubmitHandler } from "react-hook-form";

// Styles
import "./TestimonialForm.css";
import { useNavigate, useParams } from "react-router-dom";

// Thunks
import {
  addTestimonail,
  updateTestimonial,
} from "../../redux/slice/testimonials/testimonialSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// React-Hot-Toast
import toast from "react-hot-toast";
import Loading from "../common/Loading/Loading";

// Types
type Inputs = {
  name: string;
  image: string;
  description: string;
  evaluation: string;
};

const TestimonialForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  // Info From Slice
  const { testimonials, isLoading, error } = useAppSelector(
    (state) => state.testimonialSlice
  );

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [evaluation, setEvaluation] = useState<string | undefined>("");
  const [description, setDescription] = useState("");

  const isUpdateMode = typeof id === "string";

  useEffect(() => {
    if (isUpdateMode) {
      const testimonial = testimonials.find((item) => item._id === id);
      if (testimonial) {
        setName(testimonial.name);
        setEvaluation(testimonial.evaluation);
        setDescription(testimonial.description);
      }
    }
  }, [id, isUpdateMode, testimonials]);

  // Hook-Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      name,
      evaluation,
      description,
    },
  });

  useEffect(() => {
    reset({ name, evaluation, description });
  }, [name, evaluation, description, reset]);

  // Function To Handle Submit
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const form = new FormData();
    if (watch("image").length > 0) {
      form.append("image", data.image[0]);
    }
    form.append("name", data.name);
    form.append("description", data.description);
    form.append("evaluation", data.evaluation);

    const action = isUpdateMode
      ? updateTestimonial({ id: id, data: form })
      : addTestimonail(form);

    dispatch(action).then(() => {
      if (error) {
        toast.error("Please Try Again");
      } else {
        toast.success(
          isUpdateMode ? "Update Successful" : "Addition Successful"
        );
        navigate("/testimonials");
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
          <label htmlFor="image">Image</label>
          <input
            id="image"
            type="file"
            placeholder="Add Image"
            {...register("image")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="evaluation">Evaluation</label>
          <input
            id="evaluation"
            type="text"
            placeholder="Enter Evaluation"
            {...register("evaluation", {
              required: "The Evaluation is Required",
              validate: (value) => {
                if (+value > 5) {
                  return "you should evaluate between 0 and 5";
                }
                return true;
              },
            })}
          />
          {errors.evaluation && (
            <span className="text-red-400">{errors.evaluation.message}</span>
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
          {isUpdateMode? "UPDATE" : "ADD"}
        </button>
      </form>
    </Loading>
  );
};

export default TestimonialForm;
