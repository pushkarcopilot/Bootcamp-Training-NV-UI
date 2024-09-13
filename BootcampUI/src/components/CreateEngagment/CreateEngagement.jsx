import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import CreatableSelect from 'react-select/creatable';
import { createEngagement } from "../../API/Engagement.api";
import { getDropdownValues } from "../../API/Engagement.api";
import { HiOutlineHome } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../authConfig";

function CreateEngagement() {
  const navigate = useNavigate();
  const { instance } = useMsal();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    clientName: "",
    auditTypeId: "",
    auditStartDate: "",
    auditEndDate: "",
    countryId: "",
    auditors: [],
    statusId: "",
  });

  const [countries, setCountries] = useState([]);
  const [auditors, setAuditors] = useState([]);
  const [auditTypes, setAuditTypes] = useState([]);
  const [engagementStatus, setEngagementStatus] = useState([]);

  useEffect(() => {
    const getDropdownValue = async () => {
      try {
        const data = await getDropdownValues();
        setCountries(data[0]);
        setAuditors(data[1]);
        setAuditTypes(data[2]);
        setEngagementStatus(data[3]);
        console.log(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    getDropdownValue();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleChange = (e) => {
    if (e.target.name === "auditTypeId" || e.target.name === "statusId") {
      setFormData({
        ...formData,
        [e.target.name]: Number(e.target.value),
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAuditorsChange = (e) => {
    var list = [];
    for (var i = 0; i < e.length; i++) {
      list.push(Number(e[i].value));
    }
    setFormData({
      ...formData,
      auditors: list,
    });
  };

  async function handleSubmit(e) {
    if (e.currentTarget.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    try {
      setFormData(formData);
      await createEngagement(formData);
      navigate(-1);
    } catch (error) {
      console.error("Error creating engagement:", error);
    }
  }
  
  const auditorOptions = auditors.map(auditor=>({value:auditor.auditorId.toString(),label:auditor.name}));
 
    const countryOptions = countries.map((option) => 
      <option key={option.countryId} value={option.countryId}>{option.name}</option>
    );

    const auditTypeOptions = auditTypes.map((option) => 
      <option key={option.auditTypeId} value={option.auditTypeId}>{option.name}</option>
    );

    const engagementStatusOptions = engagementStatus.map((option) => 
      <option key={option.engagementStatusId} value={option.engagementStatusId}>{option.name}</option>
    );

  return (<>
    <div className="d-flex justify-content-between align-items-center">
      <Button
        variant="secondary"
        onClick={handleBack}
        style={{ marginLeft: '120px', marginTop: '40px' }}>
        Back
      </Button>
    </div>

    <div>
      <Container className="mx-auto mt-2 border border-solid" >
        <div className="d-flex">
          <h4 className="mt-3">Create Engagement:</h4>
          <HiOutlineHome size={30} className="mt-3" style={{ marginLeft: "auto" }} />
        </div>
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                <Form.Select value={formData.countryId} name="countryId" onChange={handleChange} className="mb-3">
                <option value="">Select Country</option>
                  {countryOptions}                  
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom02">
                <Form.Label>Audit Type: </Form.Label>
                <Form.Select value={formData.auditTypeId} name="auditTypeId" onChange={handleChange} required>
                  <option value="">Select Audit Type</option>
                  {auditTypeOptions}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select Audit type.</Form.Control.Feedback >
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="validationCustom03">
                <Form.Label>Status: </Form.Label>
                <Form.Select value={formData.statusId} name="statusId" onChange={handleChange} required>
                  <option value="">Select status</option>
                  {engagementStatusOptions}
                </Form.Select>
                <Form.Control.Feedback type="invalid">Please select status.</Form.Control.Feedback >
              </Form.Group>
            </Col>
          </Row>

          <Form.Label>Audit timelines: </Form.Label>
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
          <Form.Group className="mb-3" controlId="validationCustom06">
            <Form.Label>Auditors: </Form.Label>
            <CreatableSelect name="auditors" isMulti options={auditorOptions} onChange={handleAuditorsChange} required />
            <Form.Control.Feedback type="invalid">Please select Auditor.</Form.Control.Feedback >
          </Form.Group>
          <Form.Group className="mb-3 d-flex">
            <Button type="submit" style={{ marginLeft: "auto" }}>Save</Button>
          </Form.Group>
        </Form>
      </Container></div>
  </>
  )
}
export default CreateEngagement;
