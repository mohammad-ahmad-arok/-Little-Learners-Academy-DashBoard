import React, { useEffect } from "react";

// Components
import CardMissionVision from "../../components/CardMissionVision/CardMissionVision";

// Thunks
import { getAllMissionVision } from "../../redux/slice/mission-vision/missionVisionSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import MainContent from "../../components/common/MainContent/MainContent";
import GridList from "../../components/common/GridList/GridList";

const MissionVision: React.FC = () => {
  const dispatch = useAppDispatch()

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.missionVision
  );

  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllMissionVision());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="mission-vision">
      <GridList
        records={records}
        renderItems={(record) => (
          <CardMissionVision
            id={record._id!}
            title={record.title}
            description={record.description}
          />
        )}
      />
    </MainContent>
  );
};

export default MissionVision;
