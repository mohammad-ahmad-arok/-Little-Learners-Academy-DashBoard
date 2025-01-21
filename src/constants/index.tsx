import Benefits from "../pages/benefits/Benefits";
import Testimonials from "../pages/testimonials/Testimonials";
import Faq from "../pages/FAQ/Faq";
import Login from "../pages/login/Login";
import { SiBentobox, SiContactlesspayment } from "react-icons/si";
import { SiLibreofficewriter } from "react-icons/si";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { GrOverview } from "react-icons/gr";
import { FaUserTie } from "react-icons/fa6";
import MissionVision from "../pages/mission-vision/MissionVision";
import Members from "../pages/Member/Members";
import History from "../pages/history/History";
import SpecialFeatures from "../pages/specialfeatures/AddEditSpecialFeature";
import AdmissionProcess from "../pages/AdmissionProcess/AdmissionProcess";
import { LuBookOpenCheck } from "react-icons/lu";
import { BsFillHouseGearFill } from "react-icons/bs";
import { GrServices } from "react-icons/gr";
import Rooms from "../pages/rooms/Rooms";

import Subjects from "../pages/subjects/Subjects";
import Activities from "../pages/Activities/Activities";
import { FaBook } from "react-icons/fa";

import FeeStructures from "../pages/FeeStructures/FeeStructures";
import Contact from "../pages/Contact/Contact";
import { AdditionalServices } from "../pages/additionalServices/AdditionalServices";
import StudentSupports from "../pages/StudentSupports/StudentSupports";
import Events from "../pages/events/Events";

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
    icon: <SiLibreofficewriter />,
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
    icon: <SiBentobox />,
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
    icon: <FaBook />,
    childComponente: <Subjects />,
  },
  {
    path: "activities",
    label: "Activities",
    icon: <FaBook />,
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
    path: "/additionalservices",
    label: "Additional Services",
    icon: <GrServices />,
    childComponente: <AdditionalServices />,
  },
  {
    path: "/events",
    label: "Events",
    icon: <GrServices />,
    childComponente: <Events />,
  },

];

// SiContactlesspayment
