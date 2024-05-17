import Admin from "./pages/Admin";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  DEVICE_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  SHOP_ROUTE,
  DEVICE_EDIT_ROUTE,
  ABOUTUS_ROUTE,
  SUPPORT_ROUTE
} from "./utils/consts";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import DevicePage from "./pages/DevicePage";
import Basket from "./pages/Basket";
import DevicePageEdit from "./pages/DevicePageEdit";
import AboutUs from "./components/AboutUs";
import Support from "./components/Support";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  
];

export const publicRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: SHOP_ROUTE,
    Component: Shop,
  },
  {
    path: ABOUTUS_ROUTE,
    Component: AboutUs,
  },
  {
    path: SUPPORT_ROUTE,
    Component: Support,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: DEVICE_ROUTE + "/:id",
    Component: DevicePage,
  },
  {
    path: DEVICE_EDIT_ROUTE + "/:id",
    Component: DevicePageEdit,
  },
];
