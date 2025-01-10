import React, { useEffect } from "react";

// Thunks

import { getAllSubjects } from "../../redux/slice/subjects/subjectSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import SubjectCard from "../../components/SubjectCard/SubjectCard";

const Subjects: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.subjectSlice
  );


  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllSubjects());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="subjects">
      <GridList
        records={records}
        renderItems={(record) => (
          <SubjectCard
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Subjects;
