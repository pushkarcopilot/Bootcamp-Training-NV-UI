//import View from './View'
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLogin from "./components/AuthLogin";
import LogoutPage from "./components/Logout";
import CreateEngagement from "./components/CreateEngagment/CreateEngagement";
import ViewEngagement from "./components/ViewEngagement/ViewEngagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthLogin />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/create-engagement" element={<CreateEngagement />} />
        <Route path="/view-engagement/:engagementId" element={<ViewEngagement/>} />
        {/* <Route path="/view-engagement/:engagementId" element={<GenerateReport/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
