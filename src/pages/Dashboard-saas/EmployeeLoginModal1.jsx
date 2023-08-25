import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch, connect } from 'react-redux'
import { auth, db } from '../../helpers/firebase'
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
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Input,
  Row,
  Col,
  Form,
  Label,
  InputGroup,
} from 'reactstrap'
import moment from 'moment'
import Flatpickr from 'react-flatpickr'
      const EmployeeLoginModal = (props) => {
      const { isOpen, toggle, employees, attendance } = props
      const [employeeId, setEmployeeId] = useState('')
      const [confirm, setConfirm] = useState(false)
      const [name, setName] = useState('')
      const [employeeName, setEmployeeName] = useState('')
      const [startTime, setStartTime] = useState('00:00')
      const [endTime, setEndTime] = useState('00:00')
      const [totalHours, setTotalHours] = useState('0.00')
      const user = useSelector((state) => state.users.user)
      console.log(attendance)

      const handleEmployeeIdChange = (id) => {
        setEmployeeId(id)
     const employee = employees.find((employee) => employee.empId === id)
        if (employee) {
          setEmployeeName(employee.name)
        } else {
          setEmployeeName('')
        }
      }

      const handleStartTimeChange = (date) => {
        const newStartTime = date[0].toLocaleTimeString()
        setStartTime(newStartTime)
        calculateTotalHours(newStartTime, endTime)
      }

      const handleEndTimeChange = (date) => {
        const newEndTime = date[0].toLocaleTimeString()
        setEndTime(newEndTime)
        calculateTotalHours(startTime, newEndTime)
      }

      const calculateTotalHours = (startTime, endTime) => {
        try {
          const startTimeInMs = new Date(`01/01/2021 ${startTime}`).getTime()
          const endTimeInMs = new Date(`01/01/2021 ${endTime}`).getTime()
          const difference = Math.abs(endTimeInMs - startTimeInMs) / 36e5
          setTotalHours(difference.toFixed(2))
        } catch (error) {
          console.log('Error calculating total hours:', error)
        }
      }

      const handleSubmit = async (event) => {
        event.preventDefault()
        const employee = employees.find(
          (employee) => employee.empId === employeeId
        )
        console.log('employee:', employee)
        if (employee) {
          const attendanceRecord = {
            [employee.name] : {
            employeeId: employee.empId,
            employeeName: employee.name,
            store: user.store,
            date: moment().format('YYYY-MM-DD'),
            day: moment().format('dddd'),
            clockInTime: startTime,
            clockOutTime: endTime,
            },
            date: moment().format('YYYY-MM-DD'),
          }
          console.log('attendanceRecord:', attendanceRecord)
          // onAttendanceUpdate(attendanceRecord)
          try {
            const docRef = await addDoc(collection(db, 'attendance1'), attendanceRecord)
            console.log('Document written with ID: ', docRef.id)
          } catch (error) {
            console.error('Error adding document: ', error)
          }
          setEmployeeId('')
          setEmployeeName('')
          setStartTime('00:00')
          setEndTime('00:00')
          setTotalHours('0.00')
          toggle()
        }
      }

      console.log(startTime, endTime, totalHours )

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
              <Col lg={4}>
                <div className='mb-3'>
                  <label htmlFor='formrow-startTime'>In time</label>
                  <div className='col-md-11'>
                    <InputGroup>
                      <Flatpickr
                        // value={startTime}
                        id='formrow-startTime'
                        onChange={(e) => handleStartTimeChange(e)}
                        className='form-control d-block'
                        placeholder='Select time'
                        options={{
                          enableTime: true,
                          noCalendar: true,
                          dateFormat: 'H:i:K',
                          defaultDate: '00:00',
                        }}
                      />
                      <div className='input-group-append'>
                        <span className='input-group-text'>
                          <i className='mdi mdi-clock-outline' />
                        </span>
                      </div>
                    </InputGroup>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className='mb-3'>
                  <label htmlFor='formrow-endTime'>Out time</label>
                  <div className='col-md-11'>
                    <InputGroup>
                      <Flatpickr
                        // value={endTime}
                        id='formrow-endTime'
                        onChange={(e) => handleEndTimeChange(e)}
                        className='form-control d-block'
                        placeholder='Select time'
                        options={{
                          enableTime: true,
                          noCalendar: true,
                          dateFormat: 'h:i:K',
                          defaultDate: '12:00',
                        }}
                      />
                      <div className='input-group-append'>
                        <span className='input-group-text'>
                          <i className='mdi mdi-clock-outline' />
                        </span>
                      </div>
                    </InputGroup>
                  </div>
                </div>
              </Col>
              <Col lg={4}>
                <div className='mb-3'>
                  <label htmlFor='formrow-endTime'>Confirm</label>
                  <div className='col-md-2'>
                  <button type='button' className='btn btn-success' onClick = {() => setConfirm(true)} >
                  <i className="fas fa-check-circle"></i>
                  </button>
                  </div>
                </div>
              </Col>
              
            </Row>
            {confirm &&  `Total Hours: ${totalHours}`
            
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
