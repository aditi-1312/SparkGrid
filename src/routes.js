
// Vision UI Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// Vision UI Dashboard React icons
import { IoCash, IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import MarketplacePage from "pages/MarketplacePage";
import Admin from "Admin";
import EthereumVis from "pages/EthereumVis";
import { FaEthereum } from "react-icons/fa";
import GenerateEnergyPage from "pages/GenerateEnergyPage";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Marketplace",
    key: "Marketplace",
    route: "/Marketplace",
    icon: <IoCash size="15px" color="inherit" />,
    component: MarketplacePage,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "GenerateEnergy",
    key: "GenerateEnergy",
    route: "/Generated",
    icon: <IoCash size="15px" color="inherit" />,
    component: GenerateEnergyPage,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Blockchain",
    key: "blockchain",
    route: "/blockchain",
    icon: <FaEthereum size="15px" color="inherit" />,
    component: EthereumVis,
    noCollapse: true,
  }
];

export default routes;
