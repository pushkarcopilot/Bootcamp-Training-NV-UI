import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { auditTypeMap, statusMap } from '../const';
import { getEngagements } from '../../API/Engagement.api';
 
const Engagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [auditTypeId, setAuditTypeId] = useState('');
  const [auditorsId, setAuditorsId] = useState('');
  const [engagements, setEngagements] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [auditTypes, setAuditTypes] = useState([]);
  const [auditors, setAuditors] = useState([]);
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
 
  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const auditType =[  {    "auditTypeId": 2,    "name": "Financial",    "engagements": null  },  {    "auditTypeId": 3,    "name": "Compliance",    "engagements": null  },  {    "auditTypeId": 1,    "name": "Operational",    "engagements": null  }
      ];
      const auditors =[  {    "auditorsId": 25,    "auditorsName": "Gaurav",    "isActive": 1  },
        {    "auditorsId": 26,    "auditorsName": "Tarun",    "isActive": 1  },
        {    "auditorsId": 27,    "auditorsName": "Pushkar",    "isActive": 1  },
        {    "auditorsId": 28,    "auditorsName": "Shubham",    "isActive": 1  },
        {    "auditorsId": 29,    "auditorsName": "Susheel",    "isActive": 1  }
      ]
        setAuditTypes(auditType);
 
        setAuditors(auditors);
      } catch (error) {
        console.error('Error fetching dropdown options', error);
      }
    };
 
    fetchDropdownOptions();
  }, []);
 
  useEffect(() => {
    const getEngagementsList = async () => {
      try {
        const data = await getEngagements();
        setRows(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch engagements', error);
        setLoading(false);
      }
    };
 
    getEngagementsList();
  }, []);
 
  const validateSearch = () => {
    if (!searchTerm.trim() && !startDate && !endDate && !auditTypeId && !auditorsId) {
      setError('Please provide at least one search criterion.');
      return false;
    }
 
    if (auditTypeId && !auditTypes.some(type => type.auditTypeId === parseInt(auditTypeId))) {
      setError('Invalid Audit Type selected.');
      return false;
    }
 
    if (auditorsId && !auditors.some(auditor => auditor.auditorsId === parseInt(auditorsId))) {
      setError('Invalid Auditor selected.');
      return false;
    }
 
    setError('');
    return true;
  };
 
  const handleSearch = async () => {
    if (!validateSearch()) return;
 
    const data = await getEngagements();
    const filteredData = data.filter(x =>
      (!searchTerm || x.clientName.includes(searchTerm)) &&
      (!auditTypeId || x.auditTypeId === parseInt(auditTypeId)) &&
   
      (!startDate || moment(x.auditStartDate).isSameOrAfter(moment(startDate))) &&
      (!endDate || moment(x.auditEndDate).isSameOrBefore(moment(endDate)))
    );
    setRows(filteredData);
    setEngagements(filteredData);
  };
 
  const handleCreateEngagementClick = () => {
    navigate('/create-engagement');
  };
 
  const handleViewClick = (row) => {
    navigate(`/view-engagement/${row.engagementId}`);
  };
 
  const columns = [
    { field: 'engagementId', headerName: 'Engagement ID', width: 150 },
    { field: 'clientName', headerName: 'Client Name', width: 200 },
    {
      field: 'auditTypeId',
      headerName: 'Audit Type',
      width: 150,
      renderCell: (params) => auditTypeMap[params.value] || ' ',
    },
    {
      field: 'statusId',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => statusMap[params.value] || ' ',
    },
    {
      field: 'auditStartDate',
      headerName: 'Start Date',
      width: 150,
      renderCell: (params) => moment(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'auditEndDate',
      headerName: 'End Date',
      width: 150,
      renderCell: (params) => moment(params.value).format('DD/MM/YYYY'),
    },
    {
      field: 'actions',
      headerName: 'Actions',
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
 
  // Inline styles
  const containerStyle = {
    width: '100%',
    padding: '10px'
  };
 
  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '4px'
  };
 
  const inputStyle = {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: '1',
    minWidth: '150px'
  };
 
  const buttonStyle = {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  };
 
  const buttonHoverStyle = {
    backgroundColor: '#0056b3'
  };
 
  return (
    <div style={containerStyle}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div style={rowStyle}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search term"
          style={inputStyle}
        />
        <select
          value={auditTypeId}
          onChange={(e) => setAuditTypeId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Audit Type</option>
          {auditTypes.map((type) => (
            <option key={type.auditTypeId} value={type.auditTypeId}>
              {type.name}
            </option>
          ))}
        </select>
        <select
          value={auditorsId}
          onChange={(e) => setAuditorsId(e.target.value)}
          style={inputStyle}
        >
          <option value="">Select Auditor</option>
          {auditors.map((auditor) => (
            <option key={auditor.auditorsId} value={auditor.auditorsId}>
              {auditor.auditorsName || 'Unnamed Auditor'}
            </option>
          ))}
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={inputStyle}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          style={inputStyle}
        />
        <button
          onClick={handleSearch}
          style={buttonStyle}
          onMouseOver={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Search
        </button>
      </div>
 
      <Box sx={{ marginTop: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleCreateEngagementClick}
        >
          Create Engagement
        </Button>
      </Box>
 
      <Box sx={{ height: 400, width: '100%', marginTop: 2 }}>
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
    </div>
  );
};
 
export default Engagement;