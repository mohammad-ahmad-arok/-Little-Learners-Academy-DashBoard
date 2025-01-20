import React, { useEffect } from "react";

// Thunks

import { getAllStudentSupports } from "../../redux/slice/studentSupport/studentSupportSlice";

import {deleteStudentSupport} from "../../redux/slice/studentSupport/studentSupportSlice"

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
const StudentSupports: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.StudentSupport
  );


  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllStudentSupports());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="student-support">
      <GridList
        records={records}
        renderItems={(record) => (
          <ActivityCard
            to="student-support"
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            handleDelete={deleteStudentSupport}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default StudentSupports;
