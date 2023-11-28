import React, {useEffect, useState} from "react";
import { auth, db } from '../../helpers/firebase'
import { connect } from 'react-redux'
import EmployeeLoginModal from "../Dashboard-saas/EmployeeLoginModal";
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
import Flatpickr from 'react-flatpickr'
import { Button, Row, Col, Card, CardBody, CardHeader, InputGroup,Table } from 'reactstrap'
import moment from 'moment'
import Breadcrumbs from '../../components/Common/Breadcrumb'

const Employees = ({user}) => {
    const [employee, setEmployee] = useState([])
    const [attendance, setAttendance] = useState([])
    const [filteredAttendance, setFilteredAttendance] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const [address, setAddress] = useState('')
    const [modal, setModal] = useState(false);
    const [postalCode, setPostalCode] = useState(null);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const toggle = () => setModal(!modal);

    const predefinedLocations = ['L6T 3R5', 'L5M 4Z5', 'L5B 2C9', 'L1T 1X2', 'L6T 1B7', 'L5B']
    const attendanceCollectionRef = collection(db, 'attendance1')
    const getAttendance = async () => {
    const date = moment().format('DD-MM-YYYY')
    const attquery = query(attendanceCollectionRef,
      where('date', '==', selectedDate),
    )
    const data = await getDocs(attquery)
    const attData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    setAttendance(attData)
    }

    const handleDateChange = (e) => {
      setSelectedDate(moment(e.target.value).format('DD-MM-YYYY'));
    };

    useEffect(() => {
      getAttendance()
      const unsubscribe = () => {
        getAttendance()
      }
      return unsubscribe
    }, [])

    useEffect(() => {
      getAttendance();
    }, [selectedDate, modal]);

    useEffect(() => {
      if (attendance.length > 0) {
        let attendanceData;
        if(user.admin){
           attendanceData = attendance && Object.values(attendance[0]).filter((att) => att.date !== undefined);
        }else {
          attendanceData =   attendance && Object.values(attendance[0]).filter((att) => att.store === user.store);
        }
          
          // Sort the attendance data by store
          const sortedAttendance = attendanceData.sort((a, b) => {
              return a.store.localeCompare(b.store);
          });
          
          setFilteredAttendance(sortedAttendance);
      }
    }, [attendance])


const getPostalCode = async (latitude, longitude) => {
  // toggle()
  try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDXpPRXcboTM2CVZaNmELQpLJoDBonHaLg`);
    const data = await response.json();
    const addressComponents = data.results[0].address_components;
    const current_address = data.results[0].formatted_address
    setAddress(current_address)
    const postalObj = addressComponents.find(component => component.types.includes("postal_code"));
    if (postalObj) {
      // console.log(postalObj.long_name)
      setPostalCode(postalObj.long_name);
      const currentPostalCode = postalObj.long_name;
      console.log(currentPostalCode)
      
    } else {
      alert("Postal code not found for this location!");
    }
  } catch (error) {
    console.log(error)
    alert("Error fetching postal code!");
  }
}

 const handleClick = () => {
  toggle()
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }
  setLoading(true);
  navigator.geolocation.getCurrentPosition(position => {
    getPostalCode(position.coords.latitude, position.coords.longitude);
    getAttendance()
    setLoading(false);
  }, error => {
    alert("Unable to retrieve your location.");
    setLoading(false);
  });
}

  return (
    <div className='page-content'>
    <div className='container-fluid'>
      <Breadcrumbs title='Employee' breadcrumbItem='Employee Attendance' />
      {message}
      {modal && ( 
            <EmployeeLoginModal toggle = {toggle} setEmployee = {setEmployee} address = {address} />
          )}
    <Card>
        <CardHeader>
          <Row>
                <Col xs = '2'>
                <select className="form-control">
                  <option>Daily Report</option>
                  <option>Monthly Report</option>
                </select>
                </Col>
                <Col xs ='2'>
                <input
                  className="form-control"
                  type="date"
                  defaultValue={moment().format('YYYY-MM-DD')}  // Change the format here to match the input type
                  id="example-date-input"
                  onChange={handleDateChange}
                />
                </Col>
                <Col>
                <Button
                      onClick={handleClick}
                      className='float-end'
                      color='primary'
                    >
                     { loading ? (
                      <i className='fas fa-spinner fa-spin font-size-16'></i>  // Loading spinner
                    ) : (
                      <i className='fas fa-user-plus font-size-16'></i>  // The original button icon
                    )}
                  </Button></Col>
          </Row>
        </CardHeader>
          <CardBody>
            
            {attendance && attendance.length > 0 ? (
            <Table className='table'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Store</th>
                  <th>Emp Id</th>
                  <th>Emp Name</th>
                  <th>Clock In</th>
                  <th>Clock Out</th>
                  <th>Total Hours</th>
                  {user?.admin && user?.admin === true && <th>from</th>}
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {attendance && filteredAttendance.map((att, index) => {
                  const clockIn = moment(att.clockInTime, 'hh:mm A');
                  const clockOut = moment(att.clockOutTime, 'hh:mm A');
              
                  // Calculate the total hours
                  const totalMinutes = clockOut.diff(clockIn, 'minutes');

                  // Convert total minutes into hours and minutes
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;
              
                  const totalHoursFormatted = `${hours ? `${hours} Hours` : ''} ${minutes ? `${minutes} Minutes` : ''}`;
                    return <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{att.store}</td>
                    <td>{att.employeeId}</td>
                    <td>{att.employeeName}</td>
                    <td>{att.clockInTime}</td>
                    <td>{att.clockOutTime}</td>
                    <td>{totalHoursFormatted ? totalHoursFormatted : 0}</td>
                    {user?.admin && user?.admin === true && <td>{att.address}</td>}
                    <td>{att.date}</td>
                  </tr>
})}
              </tbody>
            </Table> ): (
              <div className='text-center'>
                <h4>No Employees Login available</h4>
              </div>
            )}

          </CardBody>
        </Card>
           
    </div>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.users.user,
  }
}

export default connect(mapStateToProps)(Employees)