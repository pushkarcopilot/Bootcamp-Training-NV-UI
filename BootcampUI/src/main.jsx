import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainAuditPage from "./AuditMainPage/MainAuditPage";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainAuditPage />
  </StrictMode>
);
