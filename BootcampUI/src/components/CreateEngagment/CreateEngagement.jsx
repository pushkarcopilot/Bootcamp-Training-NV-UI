import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import CreatableSelect from "react-select/creatable";
import { createEngagement } from "../../API/Engagement.api";
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
  const options = [
    { value: "1", label: "A K KUKKAR & ASSOCIATES" },
    { value: "2", label: "A C BHUTERIA AND CO" },
    { value: "3", label: "A G A & ASSOCIATES" },
    { value: "4", label: "A G S G & CO." },
    { value: "5", label: "A. SINGHI & CO." },
    { value: "6", label: "A.V.S.S. & Associates" },
    { value: "7", label: "AAR & CO" },
    { value: "8", label: "AGARWAL U R S & CO" },
    { value: "9", label: "AGRAWAL PARMAR & CO" },
    { value: "10", label: "ANIL ANKIT & CO" },
  ];
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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <Button
          variant="secondary"
          onClick={handleBack}
          style={{ marginLeft: "120px", marginTop: "40px" }}
        >
          Back
        </Button>
      </div>

      <div>
        <Container className="mx-auto mt-2 border border-solid">
          <div className="d-flex">
            <h4 className="mt-3">Create Engagement:</h4>
            <HiOutlineHome
              size={30}
              className="mt-3"
              style={{ marginLeft: "auto" }}
            />
          </div>
          <hr></hr>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="validationCustom01">
                  <Form.Label>Client Name: </Form.Label>
                  <Form.Control
                    type="text"
                    name="clientName"
                    placeholder="Client Name"
                    value={formData.clientName}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please enter a client name.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Country: </Form.Label>
                  <Form.Select
                    value={formData.countryId}
                    name="countryId"
                    onChange={handleChange}
                    className="mb-3"
                  >
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
                  <Form.Select
                    value={formData.auditTypeId}
                    name="auditTypeId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Audit Type</option>
                    <option value="1">Financial</option>
                    <option value="2">Compliance</option>
                    <option value="3">Operational</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select Audit type.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="validationCustom03">
                  <Form.Label>Status: </Form.Label>
                  <Form.Select
                    value={formData.statusId}
                    name="statusId"
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select status</option>
                    <option value="1">Not started</option>
                    <option value="2">Assigned</option>
                    <option value="3">In progress</option>
                    <option value="4">Completed</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please select status.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Form.Label>Audit timelines: </Form.Label>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="validationCustom04">
                  <Form.Label>Start Date: </Form.Label>
                  <Form.Control
                    type="date"
                    name="auditStartDate"
                    value={formData.auditStartDate}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select start date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="validationCustom05">
                  <Form.Label>End Date: </Form.Label>
                  <Form.Control
                    type="date"
                    name="auditEndDate"
                    value={formData.auditEndDate}
                    onChange={handleChange}
                    required
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid">
                    Please select end date.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3" controlId="validationCustom06">
              <Form.Label>Auditors: </Form.Label>
              <CreatableSelect
                name="auditors"
                isMulti
                options={options}
                onChange={handleAuditorsChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please select Auditor.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3 d-flex">
              <Button type="submit" style={{ marginLeft: "auto" }}>
                Save
              </Button>
            </Form.Group>
          </Form>
        </Container>
      </div>
    </>
  );
}
export default CreateEngagement;
