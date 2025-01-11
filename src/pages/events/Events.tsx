import React, { useEffect } from "react";

// Thunks

import { getAllEvents,deleteEvent } from "../../redux/slice/events/eventSlice";

// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import GridList from "../../components/common/GridList/GridList";
import MainContent from "../../components/common/MainContent/MainContent";
import SubjectCard from "../../components/SubjectCard/SubjectCard";

const Events: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.eventSlice
  );


  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllEvents());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="events">
      <GridList
        records={records}
        renderItems={(record) => (
          <SubjectCard
            id={record._id!}
            name={record.name}
            image={record.image?.url!}
            description={record.description}
            to="events"
            deleteAction={deleteEvent}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Events;
