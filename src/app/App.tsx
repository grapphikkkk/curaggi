import { RouterProvider } from "react-router";
import { router } from "./routes";
import "../styles/fonts.css";
import "../styles/design-system.css";
import "../styles/layout.css";
import "../styles/components.css";

export default function App() {
  return <RouterProvider router={router} />;
}
