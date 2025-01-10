import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "./pages/Layout";
import { DashBoardLinks } from "./constants";

// To Set BaseUrl To Any axios Request   
import "./services/axios-global";
import NewItem from "./components/common/NewItem/NewItem";
import TestimonialForm from "./components/Forms/TestimonialForm/TestimonialForm";
import MissionVisionForm from "./components/Forms/MissionVisionForm/MissionVisionForm";
import MemberForm from "./components/Forms/MemberForm/MemberForm";
import Benefits from "./pages/benefits/Benefits";
import AddEditBenefit from "./pages/benefits/AddEditBenefit";
import AddEditHistory from "./pages/history/AddEditHistory";
import SpecialFeatures from "./pages/specialfeatures/SpecialFeatures";
import AddEditSpecialFeature from "./pages/specialfeatures/AddEditSpecialFeature";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoardLayout />}>
          {DashBoardLinks.map((item) => {
            return (
              <Route path={item.path} element={item.childComponente}/>
            );
          })}
              <Route path="testimonials/add" element={<NewItem><TestimonialForm/></NewItem>} />
              <Route path="testimonials/update/:id" element={<NewItem><TestimonialForm/></NewItem>}  />  
              <Route path="team-members/add" element={<NewItem><MemberForm/></NewItem>} />
              <Route path="team-members/update/:id" element={<NewItem><MemberForm/></NewItem>}  />  
              <Route path="mission-vision/add" element={<NewItem><MissionVisionForm/></NewItem>} />
              <Route path="mission-vision/update/:Ptitle" element={<NewItem><MissionVisionForm/></NewItem>}  />  
              <Route path="/" element={<Benefits/>} />
              <Route path="/add-benefit" element={<AddEditBenefit />} />
              <Route path="/edit-benefit/:id" element={<AddEditBenefit />} />
              <Route path="/add-edit-history" element={<AddEditHistory />} />
              <Route path="/special-features" element={<SpecialFeatures />} />
              <Route path="/add-edit-special-feature" element={<AddEditSpecialFeature />} />
   
        </Route>
      </Routes>
    </>
  );
}

export default App;
