import React, { useEffect } from "react";

// Thunks

import { getAllAwards } from "../../redux/slice/awards/awardSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {deleteAward} from "../../redux/slice/awards/awardSlice"

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import ActivityCard from "../../components/ActivityCard/ActivityCard";

const Awards: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.activitySlice
  );


  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllAwards());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="awards">
      <GridList
        records={records}
        renderItems={(record) => (
          <ActivityCard
            to="awards"
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            handleDelete={deleteAward}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Awards;
