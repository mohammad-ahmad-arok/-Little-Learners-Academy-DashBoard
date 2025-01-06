// Router-Dom
import { useNavigate, useParams } from "react-router-dom"
// Styles
import styles from "../../components/dashboardNav/header.module.css"
// Component
import MissionVisionForm from "../../components/MissionVisionForm/MissionVisionForm";


const NewMissionVision:React.FC = () => {
  const navigate=useNavigate();
  // Function To Handle Back Button
  const clickedHandler=()=>{
    navigate(-1); 
  }
  return (
    <div className="p-11">
      <button className={`${styles.btn} mb-4`} onClick={clickedHandler}>
         BACK
      </button>
       <MissionVisionForm/>

    </div>
  )
}

export default NewMissionVision