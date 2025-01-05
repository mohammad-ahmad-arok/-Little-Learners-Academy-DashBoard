import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "./pages/Layout";
import { DashBoardLinks } from "./constants";

// To Set BaseUrl To Any axios Request   
import "./services/axios-global";
import NewItem from "./components/common/NewItem/NewItem";
import TestimonialForm from "./components/TestimonialForm/TestimonialForm";
import MissionVisionForm from "./components/MissionVisionForm/MissionVisionForm";

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
              <Route path="mission-vision/add" element={<NewItem><MissionVisionForm/></NewItem>} />
              <Route path="mission-vision/update/:Ptitle" element={<NewItem><MissionVisionForm/></NewItem>}  />  
              
        </Route>
      </Routes>
    </>
  );
}

export default App;
