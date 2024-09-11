import React, { useState, useRef } from 'react';
import { jsPDF } from 'jspdf'; // Import jsPDF library
import './report.css'; // Import the CSS file specific to this component

const GenerateReport = () => {
  const [isEditing, setIsEditing] = useState({
    clientName: false,
    startDate: false,
    endDate: false,
    auditType: false,
    country: false,
    auditors: false,
  });

  const [fieldValues, setFieldValues] = useState({
    clientName: 'Deloitte',
    startDate: '', // Start date field
    endDate: '',   // End date field
    auditType: 'Financial',
    country: 'Country goes here',
    auditors: 'Name 1, Name 2, Name 3',
    auditStatus: 'Not Started',
    auditOutcome: '',
  });

  const [attachment, setAttachment] = useState(null);
  const fileInputRef = useRef(null);

  const handleEditClick = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (field, value) => {
    setFieldValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAttachment(file);
    }
  };

  const handleGenerateReport = () => {
    // Check if Audit Outcome is mandatory and not filled
    if (fieldValues.auditStatus === 'Completed' && !fieldValues.auditOutcome) {
      alert('Audit Outcome is required when the status is Completed.');
      return;
    }

    // Generate PDF using jsPDF
    const doc = new jsPDF();
    const content = `
      This is to certify that we have completed a ${fieldValues.auditType} audit of ${fieldValues.clientName} 
      for the duration of ${fieldValues.startDate} and ${fieldValues.endDate}. 

      As per our audit, the audit outcome is ${fieldValues.auditOutcome}. 

      Engagement owner: 
      [Owner Name] 

      Auditors: 
      ${fieldValues.auditors}
    `;

    doc.text(content, 10, 10);
    doc.save('Audit_Report.pdf');
  };

  return (
    <div className="container">
      <header>
        <h5>Web App</h5>
        <button className="home-button">🏠</button>
      </header>
       <div><h2>View Engagement</h2></div>
      <section className="engagement-section">

        {Object.keys(fieldValues).map((key) => {
          if (key === 'auditStatus' || key === 'auditOutcome') {
            return (
              <div className="form-group" key={key}>
                <label>{key === 'auditStatus' ? 'Audit Status:' : 'Audit Outcome:'}</label>
                <select
                  value={fieldValues[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                >
                  {key === 'auditStatus' ? (
                    <>
                      <option>Not Started</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </>
                  ) : (
                    <>
                      <option value="">Select Outcome</option>
                      <option>Satisfied</option>
                      <option>Insignificant Risks Found</option>
                      <option>Significant Risks Found</option>
                    </>
                  )}
                </select>
              </div>
            );
          } else if (key === 'startDate' || key === 'endDate') {
            // Add date picker for Start Date and End Date
            return (
              <div className="form-group" key={key}>
                <label>{key === 'startDate' ? 'Start Date:' : 'End Date:'}</label>
                <input
                  type="date"
                  value={fieldValues[key]}
                  onChange={(e) => handleInputChange(key, e.target.value)}
                />
              </div>
            );
          } else if (key === 'auditors') {
            // Render dropdown options for auditors
            const auditorOptions = fieldValues.auditors.split(',').map((auditor) => auditor.trim());

            return (
              <div className="form-group" key={key}>
                <label>Auditors:</label>
                {isEditing[key] ? (
                  <select
                    multiple
                    value={auditorOptions}
                    onChange={(e) => handleInputChange(key, Array.from(e.target.selectedOptions, option => option.value).join(', '))}
                  >
                    {auditorOptions.map((auditor, index) => (
                      <option key={index} value={auditor}>
                        {auditor}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span>{fieldValues[key]}</span>
                )}
                <button className="edit-button" onClick={() => handleEditClick(key)}>✏️</button>
              </div>
            );
          } else {
            return (
              <div className="form-group" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1') + ':'}</label>
                {isEditing[key] ? (
                  <input
                    type="text"
                    value={fieldValues[key]}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                ) : (
                  <span>{fieldValues[key]}</span>
                )}
                <button className="edit-button" onClick={() => handleEditClick(key)}>✏️</button>
              </div>
            );
          }
        })}

        <div className="form-group">
          <label>Attachment:</label>
          <button className="attachment-button" onClick={handleAttachmentClick}>📎 Add Attachment</button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleAttachmentChange}
          />
          {attachment && <span>{attachment.name}</span>}
        </div>

        <div className="form-group">
          <label>Account Number:</label>
          <input type="text" defaultValue="123" />
        </div>

        <div className="form-group">
          <label>Account Receivables:</label>
          <input type="text" defaultValue="$123" />
        </div>

        <div className="form-group">
          <label>Cash:</label>
          <input type="text" defaultValue="$123" />
        </div>

        <div className="form-group">
          <label>Other Expenses:</label>
          <input type="text" defaultValue="$123" />
        </div>
      </section>

      <div className="buttons">
        <button className="save-button">Save</button>
        <button className="report-button" onClick={handleGenerateReport}>Generate Report</button>
      </div>
    </div>
  );
};

export default GenerateReport;
