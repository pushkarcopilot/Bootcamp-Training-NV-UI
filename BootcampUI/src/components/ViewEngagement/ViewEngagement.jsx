import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF library
//import "./Style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { PencilFill, House } from 'react-bootstrap-icons';
import { useParams } from "react-router-dom";
import Select from 'react-select';
 
const ViewEngagement = () => {

  const [options, setOptions] = useState([]);

  const [selectedValue, setSelectedValue] = useState('');

  const [selectedAuditorName, setSelectedAuditorName] = useState([]);

  const [selectedAuditType, setSelectedAuditType] = useState('');

  const [selectedStatus, setSelectedStatus] = useState('');

  const [formData, setFormData] = useState({});

  const [auditOutcome, setAuditOutcome] = useState('');
  const {engagementId} = useParams();
 
  useEffect(() => {

    fetchEngagement();

    // GetCountryData();

    // GetAuditstatusData();

  }, []);
 
  const fetchEngagement = () => {

    fetch(`http://localhost:5239/api/engagement/GetEngagementByEngagementId?EngagementId=${engagementId}`)

      .then((response) => response.json())

      .then((result) => {

        setFormData(result[0]);

        setSelectedValue(result[0].countryId);

        setSelectedAuditType(result[0].auditTypeId);

        setSelectedStatus(result[0].statusId);

        setSelectedAuditorName(result[0].auditors[0]);

        setAuditOutcome(result[0].auditOutcome || '');

      });

  };
 
  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };
 
  // const GetCountryData = () => {

  //   fetch(`https://localhost:44326/api/ViewEngagement/Countries`)

  //     .then((response) => response.json())

  //     .then((result) => {

  //       setOptions(result);

  //     });

  // };
 
  // const GetAuditstatusData = () => {

  //   fetch(`https://localhost:44326/api/ViewEngagement/AuditStatus`)

  //     .then((response) => response.json())

  //     .then((result) => {

  //       setAuditstatus(result);

  //     });

  // };
 
  const handleCntryChange = (event) => {

    setSelectedValue(event.target.value);

  };
 
  const handlestatusChange = (event) => {

    setSelectedStatus(event.target.value);

  };
 
  const handleOutcomeChange = (event) => {

    setAuditOutcome(event.target.value);

  };

  const auditorName = [
    { value: '1', label: 'A K KUKKAR & ASSOCIATES'},
    { value: '2', label: 'A C BHUTERIA AND CO'},
    { value: '3', label: 'A G A & ASSOCIATES'},
    { value: '4', label: 'A G S G & CO.'},
    { value: '5', label: 'A. SINGHI & CO.' },
    { value: '6', label: 'A.V.S.S. & Associates' },
    { value: '7', label: 'AAR & CO' },
    { value: '8', label: 'AGARWAL U R S & CO' },
    { value: '9', label: 'AGRAWAL PARMAR & CO' },
    { value: '10', label: 'ANIL ANKIT & CO' },
];

  // const handleAttachmentClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleAttachmentChange = (event) => {
  //   const file = event.target.files[0];
  //   if (file) {
  //     setAttachment(file);
  //   }
  // };
 
  const handleGenerateReport = () => {

    // Validation: Ensure both "Audit Status" and "Audit Outcome" are selected

    if (!selectedStatus || selectedStatus === "0") {

      alert('Please select an Audit Status.');

      return;

    }
 
    if (selectedStatus === 'Completed' && !auditOutcome) {

      alert('Audit Outcome is required when the status is Completed.');

      return;

    }
 
    // Generate PDF using jsPDF

    const doc = new jsPDF();

    const content = `

      This is to certify that we have completed a ${selectedAuditType} audit of ${formData.clientName} 

      for the duration of ${formData.auditStartDate} and ${formData.auditEndDate}.
 
      As per our audit, the audit outcome is ${auditOutcome}.
 
      Engagement owner: 

      [Owner Name]
 
      Auditors: 

      ${formData.auditorName}

    `;
 
    doc.text(content, 10, 10);

    doc.save('Audit_Report.pdf');

  };
 
  return (
<div>
<meta charSet="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
<link href="style.css" rel="stylesheet" type="text/css" />
<div className="container" style={{ width: "60%" }}>
<div className="signup-form">
<form method="post">
<div className="form-row">
<div className="form-group col-md-10">
<h2>View Engagement</h2>
</div>
<div className="form-group col-md-2">
<House />
</div>
</div>
 
            <div className="form-row">
<div className="form-group col-md-6">
<label htmlFor="clientnamelbl">Client Name</label> <PencilFill />
<input type="text" value={formData.clientName} name="clientName" onChange={handleChange} className="form-control" id="clientnameid" placeholder="Client Name" />
</div>
<div className="form-group col-md-6">
<label htmlFor="audittypelabl">Audit Type</label> <PencilFill />
{/* <input type="text" className="form-control" value={formData.auditType} name="AuditType" id="audittypeid" placeholder="Audit Type" /> */}
<select name="AuditType" value={selectedAuditType} onChange={handleCntryChange} id="audittypeid" className="form-control" placeholder="Audit Type">
<option value="">Select Audit Type</option>
                              <option value="1">Financial</option>
                              <option value="2">Compliance</option>
                              <option value="3">Operational</option>
                              </select>
</div>
</div>
<div className="form-row">
<div className="form-group col-md-4">
<label htmlFor="startdatelbl">Start Date</label> <PencilFill />
<input type="text" className="form-control" value={formData.auditStartDate} id="startdateid" placeholder="Start Date" />
</div>
<div className="form-group col-md-4">
<label htmlFor="enddatelbl">End Date</label> <PencilFill />
<input type="text" className="form-control" value={formData.auditEndDate} id="enddateid" placeholder="End Date" />
</div>
<div className="form-group col-md-4">
<label htmlFor="countrylbl">Country</label> <PencilFill />
<select name="country" value={selectedValue} onChange={handleCntryChange} id="countryid" className="form-control" placeholder="Audit status">
{/* <option value="0">Select Country</option>

                  {options.map((option) => (
<option key={option.countryId} value={option.countryId}>

                      {option.countryName}
</option>

                  ))} */}
                   <option value="">Select Country</option>
                        <option value="1">AFGHANISTAN</option>
                        <option value="2">ARGENTINA</option>
                        <option value="3">FRANCE</option>
                        <option value="4">NORWAY</option>
                        <option value="5">INDIA</option>
                        <option value="6">CHINA</option>
                        <option value="7">JAPAN</option>
                        <option value="8">NETHERLANDS</option>
                        <option value="9">EGYPT</option>
                        <option value="10">UNITED STATES</option>
                        <option value="11">Not applicable</option>

</select>
</div>
</div>
<div className="form-row">
<div className="form-group col-md-6">
<label htmlFor="auditorlbl">Auditors</label><PencilFill />
<select className="form-control" value={selectedAuditorName} id="Auditorsid" placeholder="Auditors" name="auditor">
<option value="" disabled>Select an auditor</option>
  <option value="1">A K KUKKAR & ASSOCIATES</option>
  <option value="2">A C BHUTERIA AND CO</option>
  <option value="3">A G A & ASSOCIATES</option>
  <option value="4">A G S G & CO.</option>
  <option value="5">A. SINGHI & CO.</option>
  <option value="6">A.V.S.S. & Associates</option>
  <option value="7">AAR & CO</option>
  <option value="8">AGARWAL U R S & CO</option>
  <option value="9">AGRAWAL PARMAR & CO</option>
  <option value="10">ANIL ANKIT & CO</option>
{/* <Select
      isMulti
      value={formData.auditors}
      //onChange={handleAuditorChange}
      options={auditorName}
      className="form-control"
      placeholder="Select auditors"
    /> */}
    </select>
</div>
<div className="form-group col-md-6">
<label htmlFor="auditstatuslbl">Audit Status</label>
<select name="auditstatus" value={selectedStatus} onChange={handlestatusChange} id="auditstatusid" className="form-control" placeholder="Audit status">
{/* <option value="0">Select Audit Status</option>

                  {auditsts.map((option) => (
<option key={option.auditStatusId} value={option.auditStatusId}>

                      {option.auditStatus}
</option>

                  ))} */}
                  <option value="">Select status</option>
                              <option value="1">Not started</option>
                              <option value="2">Assigned</option>
                              <option value="3">In progress</option>
                              <option value="4">Completed</option>
</select>
</div>
</div>
<div className="form-row">
<div className="form-group col-md-6">
<label htmlFor="accountnumberlbl">Account Number</label>
<input type="text" className="form-control" onChange={handleChange} value={formData.accountNumber} id="accountnumbertid" placeholder="123" />
</div>
<div className="form-group col-md-6">
<label htmlFor="accountreceivabllbl">Account Receivables</label>
<input type="text" className="form-control" value={formData.accountReceivable} onChange={handleChange} id="accountreceivablid" placeholder="$123" />
</div>
</div>
<div className="form-row">
<div className="form-group col-md-6">
<label htmlFor="cashlbl">Cash</label>
<input type="text" className="form-control" value={formData.accountCash} onChange={handleChange} id="cashid" placeholder="$123" />
</div>
<div className="form-group col-md-6">
<label htmlFor="audittypelabl">Other Expenses</label>
<input type="text" className="form-control" value={formData.otherExpenses} onChange={handleChange} id="otherexpenseid" placeholder="$123" />
</div>
</div>
<div className="form-row">
<div className="form-group col-md-6">
<label htmlFor="inventorylbl">Inventory</label>
<input type="text" className="form-control" value={formData.inventoryint} onChange={handleChange} id="inventoryid" placeholder="Inventory" />
</div>
<div className="form-group col-md-6">
<label htmlFor="auditoutcomelabl">Audit Outcome</label>
<select name="auditoutcome" id="auditoutcomeid" className="form-control" placeholder="Audit Outcome" value={auditOutcome} onChange={handleOutcomeChange}>
<option value="">Select Audit Outcome</option>
<option value="Satisfied">Satisfied</option>
<option value="Insignificant Risks Found">Insignificant Risks Found</option>
<option value="Significant Risks Found">Significant Risks Found</option>
</select>
</div>{console.log(selectedAuditorName)}
</div>
<button type="button" className="btn btn-primary" onClick={handleGenerateReport}>

              Generate Report
</button>
</form>
</div>
</div>
</div>

  );

};
 
export default ViewEngagement;

 