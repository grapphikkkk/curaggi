import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { News } from "./pages/News";
import { Company } from "./pages/Company";
import { Contact } from "./pages/Contact";
import { ThankYou } from "./pages/ThankYou";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/service",
    Component: Service,
  },
  {
    path: "/news",
    Component: News,
  },
  {
    path: "/company",
    Component: Company,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/thank-you",
    Component: ThankYou,
  },
]);
