import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import CreatableSelect from 'react-select/creatable';
import { HiOutlineHome } from "react-icons/hi2";
function CreateEngagement() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        clientName: "",
        auditorsId: "",
        auditTypeId: "",
        statusId: "",
        startDate: "",
        endDate: "",
        countryId: ""
    });
    const options = [
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

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }

    const handleAuditorsChange = (e) => {
        var list = [];
        for (var i = 0; i < e.length; i++) {
            list.push(e[i].value);
        }
        setFormData({
            ...formData,
            auditorsId: list.toString()
        });
    }

    async function handleSubmit (e) {
        if (e.currentTarget.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        setValidated(true);
        setFormData(formData);
         await fetch('api/engagement');
    }

    return (
        <Container className="mt-2 border border-solid" >
            <div className="d-flex">
                <h5 className="mt-3">Create Engagement:</h5>
                <HiOutlineHome size={30 } className="mt-3" style={{ marginLeft: "auto" }} />
            </div>
                <hr></hr>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                      <Col>
                        <Form.Group className="mb-3" controlId="validationCustom01">
                          <Form.Label >Client Name: </Form.Label>
                          <Form.Control size="sm" type="text" name="clientName" placeholder="Client Name"
                                    value={formData.clientName} onChange={handleChange} required>
                                </Form.Control>
                          <Form.Control.Feedback type="invalid">Please enter a client name.</Form.Control.Feedback>
                        </Form.Group>                       
                      </Col>
                      <Col>
                      <Form.Group> 
                <Form.Label>Country: </Form.Label>               
                    <Form.Select size="sm" value={formData.countryId} name="countryId" onChange={handleChange} className="mb-3">
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
                            <Form.Select size="sm" value={formData.auditTypeId} name="auditTypeId" onChange={handleChange} required>
                              <option value="">Select Audit Type</option>
                              <option value="1">Financial</option>
                              <option value="2">Compliance</option>
                              <option value="3">Operational</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">Please select Audit type.</Form.Control.Feedback >
                        </Form.Group>
                      </Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="validationCustom03">
                            <Form.Label>Status: </Form.Label>
                            <Form.Select size="sm" value={formData.statusId} name="statusId" onChange={handleChange} required>
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

                    <Form.Label>Audit timelines: </Form.Label>                    
                    <Row>
                      <Col>
                          <Form.Group className="mb-3" controlId="validationCustom04">
                            <Form.Label>Start Date: </Form.Label>
                            <Form.Control size="sm" type="date" name="startDate" value={formData.startDate} onChange={handleChange} required></Form.Control>
                            <Form.Control.Feedback type="invalid">Please select start date.</Form.Control.Feedback >
                          </Form.Group>
                      </Col>
                        <Col>
                          <Form.Group className="mb-3" controlId="validationCustom05">
                            <Form.Label>End Date: </Form.Label>
                            <Form.Control size="sm" type="date" name="endDate" value={formData.endDate} onChange={handleChange} required></Form.Control>
                            <Form.Control.Feedback type="invalid">Please select end date.</Form.Control.Feedback >
                          </Form.Group>
                      </Col>
                </Row>
                <Form.Group className="mb-3" controlId="validationCustom06">
                              <Form.Label>Auditors: </Form.Label>
                              <CreatableSelect name="auditorsId" isMulti options={options} onChange={handleAuditorsChange} required/>                          
                          <Form.Control.Feedback type="invalid">Please select Auditor.</Form.Control.Feedback >
                        </Form.Group>               
                <Form.Group className="mb-3 d-flex">
                    <Button size="sm" type="submit" style={{ marginLeft: "auto" }}>Save</Button>
                </Form.Group>
                </Form>
            </Container>
        )
}
export default CreateEngagement;

