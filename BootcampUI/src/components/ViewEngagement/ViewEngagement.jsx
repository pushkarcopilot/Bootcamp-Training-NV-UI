import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf"; // Import jsPDF library
//import "./Style.css";
import {  useMsal } from "@azure/msal-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { HiOutlineHome } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { PencilFill, House } from 'react-bootstrap-icons';
import { useParams } from "react-router-dom";
import Select from 'react-select';
 
const ViewEngagement = () => {

  const navigate = useNavigate();
  const { instance } = useMsal();

  const [options, setOptions] = useState([]);

  const [selectedValue, setSelectedValue] = useState('');

  const [selectedAuditType, setSelectedAuditType] = useState('');

  const [selectedStatus, setSelectedStatus] = useState('');

  const [formData, setFormData] = useState({});
    const [validated, setValidated] = useState(false);

  const [auditOutcome, setAuditOutcome] = useState('');
  const {engagementId} = useParams();
  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: "http://localhost:3002/logout",
    });
  };

 
  useEffect(() => {

    fetchEngagement();

    // GetCountryData();

    // GetAuditstatusData();

  }, []);

  useEffect(()=>{},[formData]);
 
  const fetchEngagement = () => {

    fetch(`http://localhost:5239/api/engagement/GetEngagementByEngagementId?EngagementId=${engagementId}`)

      .then((response) => response.json())

      .then((result) => {

        setFormData({...result[0],auditStartDate:result[0].auditStartDate.split('T')[0],auditEndDate:result[0].auditEndDate.split('T')[0]});

        setSelectedValue(result[0].countryId);

        setSelectedAuditType(result[0].auditTypeId);

        setSelectedStatus(result[0].statusId);

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

  const handleAuditorsChange = (e) => {
    var list = [];
    for (var i = 0; i < e.length; i++) {
      list.push(Number(e[i].value));
    }
    setFormData({
      ...formData,
      auditors: list
    });
   
  }

  const auditorNames = [
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

const auditTypeOptions = [
  { value: '', label: 'Select Audit Type' },
  { value: '1', label: 'Financial' },
  { value: '2', label: 'Compliance' },
  { value: '3', label: 'Operational' },
];


  const getAuditorOptions = () => {
    if(!formData || !formData.auditors)
        return null; 
    
    return formData.auditors.map(value => ({
      value: value,
      label: auditorNames.find(name => name.value == value)?.label || 'Unknown Auditor',
    }));

    
  };
 
  const handleGenerateReport = (e) => {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
   setValidated(true);
  

    // Validation: Ensure both "Audit Status" and "Audit Outcome" are selected

    if (!selectedStatus || selectedStatus === "0") {

      alert('Please select an Audit Status.');

      return;

    }
    if (selectedStatus === 'Completed' && !auditOutcome) {

      alert('Audit Outcome is required when the status is Completed.');

      return;

    }

    if (auditOutcome=="") {

      alert('Audit Outcome is required to generate report.');

      return;

    }
    
 
    // Generate PDF using jsPDF

    const doc = new jsPDF();

    const content = `

      This is to certify that we have completed a ${auditTypeOptions.find(type=>type.value==selectedAuditType).label} audit of ${formData.clientName} 

      for the duration of ${formData.auditStartDate} and ${formData.auditEndDate}.
 
      As per our audit, the audit outcome is ${auditOutcome}.
 
      Engagement owner: 

      ${formData.clientName}
 
      Auditors: 

      ${getAuditorOptions().map(name=>{return " "+name.label;})}

    `;
 
    doc.text(content, 10, 10);

    doc.save('Audit_Report.pdf');

  };
 
  return (
    <>
     <div className="d-flex justify-content-between align-items-center">
      <Button
        variant="secondary"
        onClick={handleBack}
        style={{ marginLeft: '120px', marginTop: '40px' }}>
        Back
      </Button>

      <Button
        variant="danger"
        onClick={handleLogout}
        style={{ marginRight: '120px', marginTop: '40px' }}>
        Logout
      </Button>
    </div>
<div>{console.log(formData)}
<Container className="mx-auto mt-2 border border-solid" >
        <div className="d-flex">
          <h4 className="mt-3">View Engagement:</h4>
          <HiOutlineHome size={30} className="mt-3" style={{ marginLeft: "auto" }} />
        </div>
        <hr></hr>

 
        <Form noValidate validated={validated} onSubmit={handleGenerateReport}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label >Client Name: </Form.Label>
                <Form.Control type="text" name="clientName" placeholder="Client Name"
                  value={formData.clientName} onChange={handleChange} required>
                </Form.Control>
                <Form.Control.Feedback type="invalid">Please enter a client name.</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Country: </Form.Label>
                <Form.Select value={selectedValue} name="countryId" onChange={handleChange} className="mb-3">
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
                </Form.Select>
              </Form.Group>
            </Col>            
          </Row>
          <Row>
          <Col>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Label>Audit Type: </Form.Label>
                <Form.Select value={selectedAuditType} name="auditTypeId" onChange={handleChange} required>
                {auditTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select Audit type.</Form.Control.Feedback >
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom03">
                <Form.Label>Audit Status: </Form.Label>
                <Form.Select value={selectedStatus} name="statusId" onChange={handleChange} required>
                  <option value="">Select status</option>
                  <option value="1">Not started</option>
                  <option value="2">Assigned</option>
                  <option value="3">In progress</option>
                  <option value="4">Completed</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select status.</Form.Control.Feedback >
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom04">
                <Form.Label>Start Date: </Form.Label>
                <Form.Control type="date" name="auditStartDate" value={formData.auditStartDate} onChange={handleChange} required></Form.Control>
                <Form.Control.Feedback type="invalid">Please select start date.</Form.Control.Feedback >
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom05">
                <Form.Label>End Date: </Form.Label>
                <Form.Control type="date" name="auditEndDate" value={formData.auditEndDate} onChange={handleChange} required></Form.Control>
                <Form.Control.Feedback type="invalid">Please select end date.</Form.Control.Feedback >
              </Form.Group>
            </Col> 
          </Row>
          <Row>
          <Form.Group className="mb-3" controlId="validationCustom06">
            <Form.Label>Auditors: </Form.Label>
            <CreatableSelect name="auditors" isMulti options={auditorNames} onChange={handleAuditorsChange} value={getAuditorOptions()}required />
            <Form.Control.Feedback type="invalid">Please select Auditor.</Form.Control.Feedback >
          </Form.Group>
          </Row>
          <Row>
          <Col>
              <Form.Group className="mb-3" controlId="validationCustom07">
                <Form.Label >Account Number </Form.Label>
                <Form.Control type="text" name="accountnumber" placeholder="123"
                  value={formData.accountNumber} onChange={handleChange}>
                </Form.Control>
                {/* <Form.Control.Feedback type="invalid">Please enter an Account number.</Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom08">
                <Form.Label >Account Receivables</Form.Label>
                <Form.Control type="text" name="accountreceivable" placeholder="$123"
                  value={formData.accountReceivable} onChange={handleChange}>
                </Form.Control>
                {/* <Form.Control.Feedback type="invalid">Please enter an Account number.</Form.Control.Feedback> */}
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
              <Form.Group className="mb-3" controlId="validationCustom09">
                <Form.Label >Cash </Form.Label>
                <Form.Control type="text" name="cash" placeholder="123"
                  value={formData.accountCash} onChange={handleChange}>
                </Form.Control>
                {/* <Form.Control.Feedback type="invalid">Please enter an Account number.</Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom10">
                <Form.Label >Other Expenses</Form.Label>
                <Form.Control type="text" name="otherexpenses" placeholder="$123"
                  value={formData.otherExpenses} onChange={handleChange}>
                </Form.Control>
                {/* <Form.Control.Feedback type="invalid">Please enter an Account number.</Form.Control.Feedback> */}
              </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col>
              <Form.Group className="mb-3" controlId="validationCustom11">
                <Form.Label >Inventory </Form.Label>
                <Form.Control type="text" name="cash" placeholder="$123"
                  value={formData.accountCash} onChange={handleChange}>
                </Form.Control>
                {/* <Form.Control.Feedback type="invalid">Please enter an Account number.</Form.Control.Feedback> */}
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom12">
                <Form.Label >Audit Outcome</Form.Label>
                <Form.Select value={auditOutcome} name="auditoutcome" onChange={handleOutcomeChange} required isInvalid={validated && !formData.auditOutcome}>
                <option value="">Select Audit Outcome</option>
<option value="Satisfied">Satisfied</option>
<option value="Insignificant Risks Found">Insignificant Risks Found</option>
<option value="Significant Risks Found">Significant Risks Found</option>

                </Form.Select>
                <Form.Control.Feedback type="invalid">Please enter the Audit Outcome.</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3 d-flex">
            <Button type="submit" style={{ marginLeft: "auto" }}>Generate Report</Button>
          </Form.Group>
          </Form>
      </Container></div>
  </>

  );

};
 
export default ViewEngagement;

 