import React, { useEffect, useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import RequestAccessPage from './RequestAccessPage';
import CreateEngagement from './CreateEngagement';
import '../Css/AuthLogin.css'; 
import MainAuditPage from './MainAuditPage'

const AuthLogin = () => {
  const { instance } = useMsal();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await instance.handleRedirectPromise();
        setIsInitialized(true);
      } catch (error) {
        console.error("Error during redirect promise handling:", error);
      }
    };

    initializeAuth();
  }, [instance]);

  useEffect(() => {
    if (isInitialized) {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        // Check if the user is authorized
        const account = accounts[0];
        const roles = account?.idTokenClaims?.roles || [];
        const authorized = roles.includes("Engagement Owner") || roles.includes("Auditor");
        setIsAuthorized(true);
      } else {
        instance.loginRedirect(loginRequest);
      }
    }
  }, [isInitialized, instance]);

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3002/logout",
    });
  };

  return (
    <>
      <AuthenticatedTemplate>

      <div className="container">
        <div>
      <button onClick={handleLogout} className="logout-button btn btn-danger">Logout</button>
      </div>
      <div style={{ marginTop: '48px' }}>
  <MainAuditPage />
</div>
    </div>

      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
      
      </UnauthenticatedTemplate>
    </>
  );
};

export default AuthLogin;
