import { Routes, Route, Navigate } from "react-router-dom";

import WelcomePage from "./WelcomePage";
import ChatPanel from "./ChatPanel";
import ImageGenerator from "./ImageGenerator";
import CodeExplanator from "./CodeExplanator";

export default function MainPage() {
  return (
    <Routes>
      <Route index element={<WelcomePage />} />
      <Route path="chat" element={<ChatPanel />} />
      <Route path="img-gen" element={<ImageGenerator />} />
      <Route path="code-exp" element={<CodeExplanator />} />
      <Route path="*" element={<Navigate to="/main" />} />
    </Routes>
  );
}
