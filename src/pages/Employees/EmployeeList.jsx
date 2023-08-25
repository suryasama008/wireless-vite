import React,{useState, useEffect} from 'react'
import { Button, Row, Col, Card,CardTitle, CardBody,Modal, CardHeader, InputGroup,Table } from 'reactstrap'
import { connect } from 'react-redux'
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
    orderBy
  } from 'firebase/firestore'
  import { auth, db } from '../../helpers/firebase'
import { getEmployees } from '../../helpers/DataContext'

const EmployeeList = ({user}) => {
  const [employees, setEmployees] = useState(null)
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState({
    empId: '',
    name:'',
    phone: '',
    email: ''
  })
  const getEmployeeList = async() => {
        const emp = await getEmployees()
        const sortedEmp = emp.sort((a,b)=>{
            return a.empId - b.empId
        })
        setEmployees(sortedEmp)
    }

    useEffect(()=>{
        getEmployeeList()
    },[])

    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop);
      }
    const handleSubmit = async (event) => {
    event.preventDefault();
        try {
        await addDoc(collection(db, 'employees'), employeeDetails);
        } catch (error) {
        console.error('Error adding document: ', error);
        }
        setmodal_backdrop(false);
        getEmployeeList()
        setEmployeeDetails({})
    };

  return (
    <div className='page-content'>
        {user?.admin && user?.admin === true ? ( <div>
        <div className='m-2'>
        <Col xs='4'>
                  <div>
                    <button
                      type="button"
                      className="btn btn-primary "
                      onClick={() => {
                        tog_backdrop();
                      }}
                      data-toggle="modal"
                    >
                      + Add New Employee
                    </button>
                    <Modal
                      isOpen={modal_backdrop}
                      toggle={() => {
                        tog_backdrop();
                      }}
                      backdrop={'static'}
                      id="staticBackdrop"
                    >
                      <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Modal title</h5>
                        <button type="button" className="btn-close"
                          onClick={() => {
                            setmodal_backdrop(false);
                          }} aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <Row>
                        <Col>
                        <p>Emp Id</p>
                            <input 
                            type='number' 
                            className='form-control' 
                            placeholder='Employeee Id' 
                            value={employeeDetails.empId} 
                            onChange={(e) => setEmployeeDetails(prev => ({ ...prev, empId: e.target.value }))} 
                            />
                        </Col>
                        <Col>
                        <p>Employee Name</p>
                        <input 
                            type='text' 
                            className='form-control' 
                            placeholder='Employee Name' 
                            value={employeeDetails.name} 
                            onChange={(e) => setEmployeeDetails(prev => ({ ...prev, name: e.target.value.toUpperCase() }))} 
                            />
                        </Col>
                        </Row>
                        <Row className='mt-4'>
                        <Col>
                        <p>Phone Number</p>
                        <input 
                            type='number' 
                            className='form-control' 
                            placeholder='Phone number' 
                            value={employeeDetails.phone} 
                            onChange={(e) => setEmployeeDetails(prev => ({ ...prev, phone: e.target.value }))} 
                            />
                        </Col>
                        <Col>
                        <p>Email</p>
                        <input 
                            type='email' 
                            className='form-control' 
                            placeholder='Email Address' 
                            value={employeeDetails.email} 
                            onChange={(e) => setEmployeeDetails(prev => ({ ...prev, email: e.target.value }))} 
                            />
                        </Col>
                        </Row>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-light" onClick={() => {
                          setmodal_backdrop(false);
                        }}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                      </div>
                    </Modal>

                  </div>
            </Col>
        </div>     
        <Card>
            <CardBody>
                <Table className = 'table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Employee Id</th>
                            <th>Employee Name</th>
                            <th>Phone</th>
                            <th>email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees && employees.map((emp, index) => (
                            <tr key = {index}>
                                <td>{index + 1}</td>
                                <td>{emp.empId}</td>
                                <td>{emp.name}</td>
                                <td>{emp.phone}</td>
                                <td>{emp.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        </div> ) : (
               <div className='text-center m-4'>
               <h6>Login with Admin Account to veiw Employee List</h6>
             </div>
        )}
    </div>
  )
}
const mapStateToProps = (state) => {
    return {
      user: state.users.user,
    }
  }
  
  export default connect(mapStateToProps)(EmployeeList)
