import React, { useEffect } from "react";

// Thunks

import { getAllMembers } from "../../redux/slice/members/memberSlice";





// Redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

// Component
import MainContent from "../../components/common/MainContent/MainContent";
import GridList from "../../components/common/GridList/GridList";
import MemberCard from "../../components/MemberCard/MemberCard";

const Members: React.FC = () => {
  const dispatch = useAppDispatch();

  // Info From Slice
  const { records, isLoading, error } = useAppSelector(
    (state) => state.memberSlice
  );


  // For Fetching All Testimonials From Slice
  useEffect(() => {
    dispatch(getAllMembers());
  }, [dispatch]);

  return (
    <MainContent status={isLoading} error={error} to="team-members">
      <GridList
        records={records}
        renderItems={(record) => (
          <MemberCard
            id={record._id!}
            name={record.name}
            qualification={record.qualification!}
            description={record.description}
            photo={record.photo?.url!}
            email={record.email}
          />
        )}
        grid={true}
      />
    </MainContent>
  );
};

export default Members;
