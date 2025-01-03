import React, { useEffect } from "react";

// Components
import TestimonialsCard from "../../components/TestimonialsCard/TestimonialsCard";

// Thunks

import { getAllTestimonials } from "../../redux/slice/testimonialSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";

const Testimonials: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { testimonials, isLoading, error } = useAppSelector(
    (state) => state.testimonialSlice
  );

  console.log(testimonials);

  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllTestimonials());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="testimonials">
      <GridList
        records={testimonials}
        renderItems={(record) => (
          <TestimonialsCard
            id={record._id}
            name={record.name}
            evaluation={record.evaluation!}
            image={record.image?.url}
          />
        )}
      />
    </MainContent>
  );
};

export default Testimonials;
