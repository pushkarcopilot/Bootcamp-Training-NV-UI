import React, { useState } from "react";
import { Tabs, Tab, Box, Grid2, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Engagement from "./Engagement";
import Report from "./Report";
import Settings from "./Settings";
import { ENGAGEMENTS, REPORTS, SETTINGS } from "./const";

export default function MainAuditPage() {
  const [activeTab, setActiveTab] = useState(ENGAGEMENTS);

  const handleChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const changeTab = (selectedTab) => {
    if (selectedTab !== activeTab) setActiveTab(selectedTab);
  };

  const getTabs = () => {
    switch (activeTab) {
      case ENGAGEMENTS:
      default: {
        return <Engagement />;
      }

      case REPORTS: {
        return <Report />;
      }

      case SETTINGS: {
        return <Settings />;
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "35px",
          minHeight: "80vh",
        }}
      >
        <h1>Team BootCamp</h1>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Grid2 container alignItems="center" justifyContent="space-between">
              <Grid2 item>
                <Tabs value={activeTab} onChange={handleChange}>
                  <Tab
                    label="Engagements"
                    onClick={() => {
                      changeTab(ENGAGEMENTS);
                    }}
                    value={ENGAGEMENTS}
                  />
                  <Tab
                    label="Reports"
                    onClick={() => {
                      changeTab(REPORTS);
                    }}
                    value={REPORTS}
                  />
                  <Tab
                    label="Settings"
                    onClick={() => {
                      changeTab(SETTINGS);
                    }}
                    value={SETTINGS}
                  />
                </Tabs>
              </Grid2>
              <Grid2 item>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <NotificationsIcon sx={{ fontSize: 30 }} />
                  <Typography variant="caption" sx={{ marginTop: "4px" }}>
                    Notifications
                  </Typography>
                </Box>
              </Grid2>
            </Grid2>
            <Box sx={{ marginTop: 2 }}>{getTabs()}</Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
