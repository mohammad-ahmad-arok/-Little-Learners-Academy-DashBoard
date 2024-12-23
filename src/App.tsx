import { Route, Routes } from "react-router-dom";
import DashBoardLayout from "./pages/Layout";
import { DashBoardLinks } from "./constants";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashBoardLayout />}>
          {DashBoardLinks.map((item) => {
            return <Route path={item.path} element={item.childComponente} />;
          })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
