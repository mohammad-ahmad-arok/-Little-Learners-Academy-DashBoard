import React, { useEffect } from "react";

// Thunks

import { getAllActivities } from "../../redux/slice/activities/activitySlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import ActivityCard from "../../components/ActivityCard/ActivityCard";

const Activities: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.activitySlice
  );


  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllActivities());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="activities">
      <GridList
        records={records}
        renderItems={(record) => (
          <ActivityCard
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

export default Activities;
