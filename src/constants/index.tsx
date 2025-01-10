import Benefits from "../pages/benefits/Benefits";
import Testimonials from "../pages/testimonials/Testimonials";
import Faq from "../pages/FAQ/Faq";
import Login from "../pages/login/Login";
import { SiBentobox } from "react-icons/si";
import { SiLibreofficewriter } from "react-icons/si";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa6";
import { FaBook } from "react-icons/fa6";
import MissionVision from "../pages/mission-vision/MissionVision";
import Members from "../pages/Member/Members";
import History from "../pages/history/History";
import Subjects from "../pages/subjects/Subjects";
export const DashBoardLinks = [
  {
    path: "benefits",
    label: "Benefits",
    icon: <SiBentobox />,
    childComponente: <Benefits />,
  },
  {
    path: "testimonials",
    label: "Testimonials",
    icon: <SiLibreofficewriter />,
    childComponente: <Testimonials />,
  },
  {
    path: "faq",
    label: "FAQ",
    icon: <FaPersonCircleQuestion />,
    childComponente: <Faq />,
  },
  {
    path: "history",
    label: "history",
    icon: <SiBentobox />,
    childComponente: <History />,
  },
  {
    path: "mission-vision",
    label: "MissionVision",
    icon: <GrOverview />,
    childComponente: <MissionVision/>,
  },
  {
    path: "team-members",
    label: "TeamMember",
    icon: <FaUserTie />,
    childComponente: <Members/>,
  },
  {
    path: "subjects",
    label: "Subjects",
    icon: <FaBook />,
    childComponente: <Subjects/>,
  },
  {
    path: "login",
    childComponente: <Login />,
  },
];


