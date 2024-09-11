import React, { useEffect, useState } from "react";
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import { loginRequest } from "../components/authConfig";
import RequestAccessPage from '../components/RequestAccessPage';
import '../Css/AuthLogin.css';
import MainAuditPage from '../components/AuditMainPage/MainAuditPage';
 
const AuthLogin = () => {
  const { instance } = useMsal();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authuserData, setAuthUserData] = useState(null); // Store API response
  const [userData, setUserData] = useState(null); // Corrected state setter name
 
  // Initialize MSAL authentication
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
 
  // Fetch weather data without a token
  useEffect(() => {
    const fetchAuthUserData = async () => {
      try {
        const response = await fetch("http://localhost:5239/api/AuthUser/GetAuthUsers");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Weather data:", data); // Log the data to inspect its structure
        setAuthUserData(data);
      } catch (error) {
        console.error("Error fetching weather data:", error.message);
      }
    };
 
    fetchAuthUserData();
  }, []);
 
 
  // Check authorization after initialization and weather data fetch
  useEffect(() => {
    if (isInitialized && authuserData) {
      const accounts = instance.getAllAccounts();
      if (accounts.length > 0) {
        const account = accounts[0];
        const filteredUserData = authuserData.filter((user) => user.username === account.username);
       
        if (filteredUserData.length > 0) {
          setIsAuthorized(true);
          setUserData(filteredUserData[0]); // Set userData only when authorized
        } else {
          setIsAuthorized(false);
        }
      } else {
        instance.loginRedirect(loginRequest);
      }
    }
  }, [isInitialized, authuserData, instance]);
 
  // Logout handler
  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3002/logout",
    });
  };
 
  return (
    <>
      {isAuthorized ? (
        <AuthenticatedTemplate>
          <div className="container">
            <div>
              {/* Display user data conditionally */}
              {userData ? (
                <>
                 <p><strong>Username:</strong> {userData.username}</p>
                  <p><strong>Role:</strong> {userData.role}</p>
                 
                </>
              ) : (
                <p>Loading user data...</p>
              )}
            </div>
            <div>
              <button onClick={handleLogout} className="logout-button btn btn-danger">Logout</button>
            </div>
            <div style={{ marginTop: '48px' }}>
              {/* Pass role to MainAuditPage */}
              <MainAuditPage role={userData?.role} />
            </div>
          </div>
        </AuthenticatedTemplate>
      ) : (
        <div>
          <h3><RequestAccessPage /></h3>
        </div>
      )}
      <UnauthenticatedTemplate>
       
      </UnauthenticatedTemplate>
    </>
  );
};
 
export default AuthLogin;