import Benefits from "../pages/benefits/Benefits";
import Testimonials from "../pages/testimonials/Testimonials";
import Faq from "../pages/FAQ/Faq";
import Subjects from "../pages/subjects/Subjects";
import Activities from "../pages/Activities/Activities";
import FeeStructures from "../pages/FeeStructures/FeeStructures";
import Contact from "../pages/Contact/Contact";
import StudentSupports from "../pages/StudentSupports/StudentSupports";
import Events from "../pages/events/Events";
import MissionVision from "../pages/mission-vision/MissionVision";
import Members from "../pages/Member/Members";
import History from "../pages/history/History";
import SpecialFeatures from "../pages/specialfeatures/AddEditSpecialFeature";
import AdmissionProcess from "../pages/AdmissionProcess/AdmissionProcess";
import Rooms from "../pages/rooms/Rooms";


// Icons
import { SiBentobox, SiContactlesspayment } from "react-icons/si";
import { SiLibreofficewriter } from "react-icons/si";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa6";
import { LuBookOpenCheck } from "react-icons/lu";
import { BsClockHistory, BsFillHouseGearFill } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import { AdditionalServices } from "../pages/additionalServices/AdditionalServices";
import { MdOutlineContactSupport, MdOutlineEvent, MdOutlineSportsEsports } from "react-icons/md";
import { FaAward, FaBook } from "react-icons/fa";
import Awards from "../pages/Awards/Awards";

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
    path: "student-support",
    label: "StudentSupports",
    icon: <MdOutlineContactSupport />,
    childComponente: <StudentSupports />,
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
    icon: <BsClockHistory />,
    childComponente: <History />,
  },
  {
    path: "mission-vision",
    label: "MissionVision",
    icon: <GrOverview />,
    childComponente: <MissionVision />,
  },
  {
    path: "team-members",
    label: "TeamMember",
    icon: <FaUserTie />,
    childComponente: <Members />,
  },
  {
    path: "Specialfeatures",
    label: "Specialfeatures",
    icon: <SiBentobox />,
    childComponente: <SpecialFeatures />,
  },
  {
    path: "admissionProcess",
    label: "Admission Process",
    icon: <LuBookOpenCheck />,
    childComponente: <AdmissionProcess />,
  },
  {
    path: "FeeStructures",
    label: "FeeStructures",
    icon: <SiBentobox />,
    childComponente: <FeeStructures />,
  },
  {
    path: "subjects",
    label: "Subjects",
    icon: <FaBook/>,
    childComponente: <Subjects />,
  },
  {
    path: "activities",
    label: "Activities",
    icon: <MdOutlineSportsEsports />,
    childComponente: <Activities />,
  },
  {
    path: "Contact",
    label: "Contact",
    icon: <SiContactlesspayment />,
    childComponente: <Contact />,
  },
  {
    path: "/rooms",
    label: "Rooms",
    icon: <BsFillHouseGearFill />,
    childComponente: <Rooms />,
  },
  {
    path: "/awards",
    label: "Awards",
    icon: <FaAward />,
    childComponente: <Awards />,
  },
  {
    path: "/additionalservices",
    label: "Additional Services",
    icon: <GrServices />,
    childComponente: <AdditionalServices />,
  },
  {
    path: "/events",
    label: "Events",
    icon: <MdOutlineEvent />,
    childComponente: <Events />,
  },

];

// SiContactlesspayment
