import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "1feaee5d-3ca7-4001-b776-ad2af3576e05", // Application (client) ID from Azure
    authority: "https://login.microsoftonline.com/ff00942c-81e2-4530-b90f-4e7d35c20644", // Directory (tenant) ID
    redirectUri: "http://localhost:3002", // URL to redirect back to after login
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            break;
          case LogLevel.Info:
            console.info(message);
            break;
          case LogLevel.Verbose:
            console.debug(message);
            break;
          case LogLevel.Warning:
            console.warn(message);
            break;
        }
      },
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
