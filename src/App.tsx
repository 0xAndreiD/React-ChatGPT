import { BrowserRouter } from "react-router-dom";

import AppLayout from "./components/AppLayout";
import AppRoutes from "./routes";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <AppRoutes />
      </AppLayout>
    </BrowserRouter>
  );
}
