import { Routes, Route, Navigate } from "react-router-dom";

import { AuthPage, MainPage } from "~/pages";
import { useStoreSelector } from "~/store";

function AppRoutes() {
  const isAuthenticated = !!useStoreSelector(({ auth }) => auth.apiKey);
  return (
    <Routes>
      <Route
        index
        element={<Navigate to={isAuthenticated ? "/main" : "/auth"} />}
      />
      <Route
        path="/auth/*"
        element={!isAuthenticated ? <AuthPage /> : <Navigate to={"/"} />}
      />
      <Route
        path="/main/*"
        element={isAuthenticated ? <MainPage /> : <Navigate to={"/"} />}
      />
    </Routes>
  );
}

export default AppRoutes;
