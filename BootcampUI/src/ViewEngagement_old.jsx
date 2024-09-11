import "./Style.css"
import { PencilFill, House } from 'react-bootstrap-icons';
import React,{ useState ,useEffect} from "react";

const ViewEngagement = () => { 
  const [options, setOptions] = useState([]); 
  const [selectedValue, setSelectedValue] = useState('');

  const[auditsts,setAuditstatus]=useState([])
  const[selectedStatus,setselectedStatus]=useState([])

  const [formData, setFormData] = useState({});    
  
  useEffect(() => {
          fetchEngagement();
          GetCountryData();
          GetAuditstatusData()
        },[])

  const fetchEngagement = () => {
    fetch(`https://localhost:44326/api/ViewEngagement/GetEngagementByEngagementId?EngagementId=6`)
    .then((response) => response.json())
      .then((result) => {      
        setFormData(result);  
        setSelectedValue(result.countryId);
        setselectedStatus(result.statusId);
      })
  }

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
}

const GetCountryData = () => {
  fetch(`https://localhost:44326/api/ViewEngagement/Countries`)
  .then((response) => response.json())
      .then((result) => {
        console.log(result);       
        setOptions(result);

    })
}

const GetAuditstatusData = () => {
  fetch(`https://localhost:44326/api/ViewEngagement/AuditStatus`)
  .then((response) => response.json())
      .then((result) => {
        console.log(result);       
        setAuditstatus(result);

    })
}

const handleCntryChange=(event)=>{
  setSelectedValue(event.target.value);  
}

const handlestatusChange=(event)=>{
  setselectedStatus(event.target.value);  
}

  return (
        <div>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700" />
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
          <link href="style.css" rel="stylesheet" type="text/css" />
          <div className="container"  style={{width:"60%"}}>
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
                  <label htmlFor="clientnamelbl">Client Name</label>   <PencilFill/>
                  <input type="text" value ={formData.clientName} name="clientName"  onChange={handleChange} className="form-control" id="clientnameid" placeholder="Client Name" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="audittypelabl">Audit Type</label> <PencilFill/>
                  <input type="text" className="form-control" value ={formData.auditType} name="AuditType" id="audittypeid" placeholder="Audit Type" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="startdatelbl">Start Date</label> <PencilFill/>
                  <input type="text" className="form-control" value ={formData.startDate} id="startdateid" placeholder="Start Date" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="enddatelbl">End Date</label> <PencilFill/>
                  <input type="text" className="form-control"  value ={formData.endDate} id="enddateid" placeholder="End Date" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="countrylbl">Country</label> <PencilFill/>
                    <select name="country" value={selectedValue} onChange={handleCntryChange}   id="countryid" className="form-control" placeholder="Audit status">
                          <option value="0">Select Country</option>
                          {options.map((option) =>  (
                                 <option key={option.countryId} value={option.countryId}>
                                 {option.countryName}
                          </option>
                        ))}                           
                              
                     </select>     
                </div>
              </div>  
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="auditorlbl">Auditors</label><PencilFill/>
                  <input type="text" className="form-control"  value={formData.auditorName}  id="Auditorsid" placeholder="Auditors" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="auditstatuslbl">Audit Status</label>                 
                  <select name="auditstatus" value={selectedStatus} onChange={handlestatusChange}   id="auditstatusid" className="form-control" placeholder="Audit status">
                          <option value="0">Select Audit Status</option>
                          {auditsts.map((option) =>  (
                                 <option key={option.auditStatusId} value={option.auditStatusId}>
                                 {option.auditStatus}
                          </option>
                        ))}                           
                              
                     </select>   

                          
         
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="accountnumberlbl">Account Number</label>
                  <input type="text" className="form-control" onChange={handleChange} value={formData.accountNumber} id="accountnumbertid" placeholder="Account Number" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="accountreceivabllbl">Account Receivables</label>
                  <input type="text" className="form-control" value={formData.accountReceivable} onChange={handleChange} id="accountreceivablid" placeholder="Account Receivables" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="cashlbl">Cash</label>
                  <input type="text" className="form-control"  value={formData.accountCash} onChange={handleChange} id="cashid" placeholder="Cash" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="audittypelabl">Other Expenses</label>
                  <input type="text" className="form-control" value={formData.otherExpenses} onChange={handleChange} id="otherexpenseid" placeholder="Other Expenses" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inventorylbl">Inventory</label>
                  <input type="text" className="form-control" value={formData.inventoryint} onChange={handleChange} id="inventoryid" placeholder="Inventory" />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="auditoutcomelabl">Audit Outcome</label>                 
                  <select name="auditoutcome" id="auditoutcomeid" className="form-control" placeholder="Audit Outcome">
                    <option value="Select Audit Outcome">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                  </select>    
                </div>
              </div>
             
            </form>	
            </div>
            </div>
        </div>
      );
}

export default ViewEngagement
