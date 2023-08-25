import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { collection, getDocs, updateDoc, addDoc, doc, query, where } from 'firebase/firestore';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Row, Col, Form, Label, Input } from 'reactstrap';
import moment from 'moment';
import { db } from '../../helpers/firebase';

const EmployeeLoginModal = (props) => {
  const { isOpen, toggle, address } = props;
  const [attendance, setAttendance] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState();
  const [totalHours, setTotalHours] = useState('0.00');
  const user = useSelector((state) => state.users.user);

  const employeeCollectionRef = collection(db, 'employees');
  const attendanceCollectionRef = collection(db, 'attendance1');

  // Get attendance
  const getAttendance = async () => {
    const date = moment().format('DD-MM-YYYY');
    const attquery = query(attendanceCollectionRef, where('date', '==', date));
    const data = await getDocs(attquery);
    const attData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setAttendance(attData);
  };

  // Get employees
  const getEmployees = async () => {
    const data = await getDocs(employeeCollectionRef);
    const employees = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setEmployees(employees);
  };

  useEffect(() => {
    getEmployees();
    getAttendance();
  }, []);

  const handleEmployeeIdChange = (id) => {
    setEmployeeId(id);
    const employee = employees.find((employee) => employee.empId === id);
    if (employee) {
      setEmployeeName(employee.name);
      if (attendance.length > 0 && attendance[0][employee.name]) {
        setStartTime(attendance[0][employee.name].clockInTime);
      }
    } else {
      setEmployeeName('');
    }
  };

  const handleClockIn = async () => {
    const date = moment().format('DD-MM-YYYY');
    const time = moment().format('hh:mm A');
    const day = moment().format('dddd');
    const clockIn = {
      [employeeName]: {
        employeeId,
        employeeName,
        store: user.store,
        date,
        day,
        clockInTime: time,
        address: address
      },
      date,
    };
    setStartTime(time);

    if (attendance.length > 0) {
      attendance[0][employeeName] = clockIn[employeeName];
    }
  };

  const handleClockOut = async () => {
    const time = moment();
    const start = moment(startTime, 'hh:mm A');
    const duration = moment.duration(time.diff(start));
    const hours = parseInt(duration.asHours());
    const minutes = parseInt(duration.asMinutes()) % 60;
    const total = hours + ':' + minutes;
    setEndTime(time.format('hh:mm A'));
    setTotalHours(total);

    let clockOut = {
      [employeeName]: {
        ...attendance[0][employeeName],
        clockOutTime: time.format('hh:mm A'),
        totalHours: total,
        address: address
      },
    };

    if (attendance.length > 0) {
      attendance[0][employeeName] = clockOut[employeeName];
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (attendance.length === 0) {
      try {
        await addDoc(collection(db, 'attendance1'), {
          ...attendance[0],
          date: moment().format('DD-MM-YYYY'),
        });
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    } else {
      try {
        const userDoc = doc(attendanceCollectionRef, attendance[0].id);
        await updateDoc(userDoc, attendance[0]);
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
    setEmployeeId('');
    setEmployeeName('');
    toggle();
  };

  return (
    <Modal
      isOpen={!isOpen}
      role='dialog'
      autoFocus={true}
      centered={true}
      className='exampleModal'
      tabIndex='-1'
      toggle={toggle}
    >
      <div className='modal-content'>
        <ModalHeader toggle={toggle}>
          Employee Login
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <div className='mb-3'>
                  <Label htmlFor='formrow-employeeId-Input'>Employee ID</Label>
                  <Input
                    type='text'
                    className='form-control'
                    id='formrow-employeeId-Input'
                    value={employeeId}
                    placeholder='Enter Your Employee Id'
                    onChange={(e) => handleEmployeeIdChange(e.target.value)}
                  />
                </div>
              </Col>
              <Col md={6}>
              <div className='mb-3'>
                <Label for='employeeName'>Employee Name</Label>
                <Input
                  type='text'
                  name='employeeName'
                  id='employeeName'
                  placeholder='Employee Name'
                  value={employeeName}
                  readOnly
                />
              </div>
              </Col>
            </Row>
            <Row>
              <Col lg={6}>
                <div className='mb-3'>
                  <label htmlFor='formrow-startTime'>In time</label>
                  <div className='col-md-11'>
                    <Button color = "primary" onClick = {handleClockIn}> Clock-In </Button>
                    <Row>
                    {startTime && <p className='ms-2 mt-2'>Clock-In: {startTime} </p>}
                    </Row>
                  </div>
                </div>
              </Col>
              <Col lg={6}>
                <div className='mb-3'>
                  <label htmlFor='formrow-endTime' onClick = {handleClockOut}>Out time</label>
                  <div className='col-md-11'>
                    <Button color = "primary" onClick = {handleClockOut}> Clock-Out </Button>
                    <Row>
                    {endTime && <p className='ms-2 mt-2'>Clock-Out: {endTime}</p>}

                    </Row>
                  </div>
                </div>
              </Col>

              
            </Row>
            {confirm &&  `Total Hours: ${totalHours} Hours`
            
      }
          </Form>
        </ModalBody>
        <ModalFooter>
          <button type='submit' className='btn btn-primary w-md' onClick = {handleSubmit} >
            Submit
          </button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

EmployeeLoginModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  employees: PropTypes.array,
  onAttendanceUpdate: PropTypes.func,
}
export default EmployeeLoginModal
