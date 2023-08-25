import React, {useEffect, useState} from "react";
import { auth, db } from '../../helpers/firebase'
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
import Flatpickr from 'react-flatpickr'
import { Button, Row, Col, Card, CardBody, CardHeader, InputGroup,Table } from 'reactstrap'
import moment from 'moment'
import Breadcrumbs from '../../components/Common/Breadcrumb'

const Employees = ({user}) => {
    const [attendance, setAttendance] = useState([])
    const [filteredAttendance, setFilteredAttendance] = useState([])
    const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
    const attendanceCollectionRef = collection(db, 'attendance1')
    const getAttendance = async () => {
      const date = moment().format('DD-MM-YYYY')
      const attquery = query(attendanceCollectionRef,
        where('date', '==', selectedDate),
      )
        const data = await getDocs(attquery)
        const attData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        console.log(attData)
        setAttendance(attData)
        }
        console.log(user)

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
  }, [selectedDate]);

useEffect(() => {
    if(attendance.length > 0){
     const attendanceData = attendance && Object.values(attendance[0]).filter((att) => att.date !== undefined)
     attendanceData.sort((a, b) => {
        return a.store - b.store
        })
     setFilteredAttendance(attendanceData)
    }
}, [attendance])

  return (
    <div className='page-content'>
    <div className='container-fluid'>
      <Breadcrumbs title='Employee' breadcrumbItem='Employee Attendance' />
      {user?.admin && user?.admin === true ? ( <Card>
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
                      <th>from</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendance && filteredAttendance.map((att, index) => (
                         <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{att.store}</td>
                        <td>{att.employeeId}</td>
                        <td>{att.employeeName}</td>
                        <td>{att.clockInTime}</td>
                        <td>{att.clockOutTime}</td>
                        <td>{att.totalHours ? att.totalHours : 0} Hours</td>
                        <td>{att.address}</td>
                        <td>{att.date}</td>
                      </tr>
))}
                  </tbody>
                </Table> ): (
                  <div className='text-center'>
                    <h4>No Employees Login available</h4>
                  </div>
                )}

              </CardBody>
            </Card>
              ) : (
                <div className='text-center m-4'>
                  <h6>Login with Admin Account to veiw Attendance Details</h6>
                </div>
              )}
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