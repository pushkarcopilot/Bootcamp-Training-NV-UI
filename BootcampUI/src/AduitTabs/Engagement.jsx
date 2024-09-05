import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid";
import { getEngagements } from "../API/Engagement.api";
import moment from "moment";
import { auditTypeMap, statusMap } from "../const";

export default function Engagement() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getEngagementsList = async () => {
      try {
        const data = await getEngagements();
        setRows(data);
        console.log("data", data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch engagements", error);
        setLoading(false);
      }
    };

    getEngagementsList();
  }, []);

  const handleViewClick = (row) => {
    alert(`Viewing details for ${row.clientName}`);
  };

  const columns = [
    { field: "engagementId", headerName: "Engagement ID", width: 150 },
    { field: "clientName", headerName: "Client Name", width: 200 },
    {
      field: "auditTypeId",
      headerName: "Audit Type",
      width: 150,
      renderCell: (params) => auditTypeMap[params?.value] || " ",
    },
    {
      field: "statusId",
      headerName: "Status",
      width: 150,
      renderCell: (params) => statusMap[params?.value] || " ",
    },
    {
      field: "auditStartDate",
      headerName: "Start Date",
      width: 150,
      renderCell: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "auditEndDate",
      headerName: "End Date",
      width: 150,
      renderCell: (params) => moment(params?.value).format("DD/MM/YYYY"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleViewClick(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <Box sx={{ marginTop: 2 }}>
        <Button variant="contained" color="primary">
          Create Engagement
        </Button>
      </Box>

      <Box sx={{ height: 400, width: "100%", marginTop: 2 }}>
        <Typography variant="h6">Engagements:</Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row.engagementId}
          disableRowSelectionOnClick
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          autoHeight
        />
      </Box>
    </>
  );
}
