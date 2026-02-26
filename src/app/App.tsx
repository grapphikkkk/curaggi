import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/fonts.css";
import "../styles/design-system.css";
import "../styles/layout.css";
import "../styles/components.css";
import "../styles/article.css";

export default function App() {
  return <RouterProvider router={router} />;
}
