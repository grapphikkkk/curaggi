import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Service } from "./pages/Service";
import { News } from "./pages/News";
import { NewsArticle } from "./pages/NewsArticle";
import { Company } from "./pages/Company";
import { Contact } from "./pages/Contact";
import { ThankYou } from "./pages/ThankYou";
import { RootLayout } from "./components/RootLayout";

export const router = createBrowserRouter([
  {
    Component: RootLayout,
    children: [
      { path: "/", Component: Home },
      { path: "/service", Component: Service },
      { path: "/news", Component: News },
      { path: "/news/:slug", Component: NewsArticle },
      { path: "/company", Component: Company },
      { path: "/contact", Component: Contact },
      { path: "/thank-you", Component: ThankYou },
    ],
  },
], {
  basename: "/curaggi",
});
