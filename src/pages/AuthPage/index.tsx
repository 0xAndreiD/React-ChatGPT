import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./Login";

export default function AuthPage() {
  return (
    <Routes>
      <Route index element={<Navigate to="/auth/login" />} />
      <Route path="login" element={<Login />} />
    </Routes>
  );
}
