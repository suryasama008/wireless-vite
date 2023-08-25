import React, { useState, useRef, useEffect } from 'react'
import {
    Button,
    Card,
    CardBody,
    CardHeader,
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
import { teal } from '@mui/material/colors'
const SalesSummary = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [employees, setEmployees] = useState([])
    const [tealData, setTealData] = useState({
        hundred: 2,
        fifty: 2,
        twenty: 5,
        ten: 3,
        five: 2,
        one: 65,
        two: 45,
        twentyFiveCents: 50,
        tenCents: 43,
        fiveCents: 34,
    })
    const [total, setTotal] = useState(0)
    const employeeCollectionRef = collection(db, 'employees')
    const handleEmployeeIdChange = (id) => {
        setEmployeeId(id)
      const employee = employees.find((employee) => employee.empId === id)
        if (employee) {
          setEmployeeName(employee.name)
        } else {
          setEmployeeName('')
        }
      }

      const getEmployees = async () => {
        const data = await getDocs(employeeCollectionRef)
        var employees = []
        data.docs.map((doc) => {
          const temp = { ...doc.data(), id: doc.id }
          employees.push(temp)
        })
        return employees
      }

    useEffect(() => {
        const tealData = async () => {
            const tealData = await getDoc(doc(db, 'teal', 'teal'))
            // setTealData(tealData.data())
        }
        tealData()
        getEmployees().then((emp) => {
            setEmployees(emp)
          }
          )
          const unsubscribe = () => {
            getEmployees()
          }
          return unsubscribe
    }, [])

    useEffect(() => {
        const totalCount = tealData && tealData.hundred * 100 + tealData.twenty * 20 + tealData.five * 5 + tealData.one * 1 + tealData.two * 2 + tealData.twentyFiveCents * 0.25 + tealData.tenCents * 0.1 + tealData.fiveCents * 0.05
        console.log(totalCount)
        setTotal(totalCount)

    }, [tealData])

  return (
    <div className='page-content'>
                <Card>
                    <CardBody>
                        <div className='d-flex justify-content-between'>
                        <h2>Teal</h2>
                        <Button color='success' className='mb-4'>{total}</Button>
                        </div>
                        <Row >
                            <Col md='6'>
                        <div className='d-flex'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            Emp Id
                        </label>
                         <div className=''>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='Emp Id'
                            id='formrow-employeeId-Input'
                            value={employeeId}
                            onChange={(e) => handleEmployeeIdChange(e.target.value)}
                        />
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            100 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='string'
                            placeholder='100 $'
                            value = {tealData?.hundred.toString() }
                            onChange = {(e) => setTealData({...tealData, hundred: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            value={(tealData?.hundred * 100).toString() + ' $'} 
                            placeholder='X 100 $'
                            readOnly/>
                            </div>
                        </div>
                         
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            20 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='20 $'
                            value = {tealData?.twenty.toString()}
                            onChange = {(e) => setTealData({...tealData, twenty: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            value={(tealData?.twenty * 20).toString() + ' $'}
                            placeholder='X 20 $'
                            readOnly/>
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            5 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            value = {tealData?.five.toString()}
                            placeholder='5 $'
                            onChange = {(e) => setTealData({...tealData, five: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 5 $'
                            value={(tealData?.five * 5).toString() + ' $'}
                           readOnly/>
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            1 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='1 $'
                            value = {tealData?.one.toString()}
                            onChange = {(e) => setTealData({...tealData, one: e.target.value})}
                            />
                            <input className='form-control ms-1'
                            placeholder='X 1 $'
                            value={(tealData?.one * 1).toString() + ' $'}
                           readOnly/>
                            </div>
                        </div>

                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            0.10 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='0.10 $'
                            value = {tealData?.tenCents.toString()}
                            onChange = {(e) => setTealData({...tealData, tenCents: e.target.value})}
                            />
                            <input className='form-control ms-1'
                            placeholder='X 0.10 $'
                            value={(tealData?.tenCents * 0.1).toString() + ' $'}
                            readOnly/>
                            </div>
                        </div>
                        </Col>


                        <Col md='6' className=''>    
                        <div className='d-flex '>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-4'
                        >
                            Emp Name
                        </label>
                         <div className=''>
                            <input
                            className='form-control'
                            disabled
                            placeholder='Emp Name'
                            value={employeeName}
                            readOnly
                            />
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            50 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='50 $'
                            value = {tealData?.fifty.toString()}
                            onChange = {(e) => setTealData({...tealData, fifty: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 50 $'
                            value={(tealData?.fifty * 50).toString() + ' $'}
                            readOnly/>
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            10 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='10 $'
                            value = {tealData?.ten.toString()}
                            onChange = {(e) => setTealData({...tealData, ten: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 10 $'
                            value={(tealData?.ten * 10).toString() + ' $'}
                            readOnly/>
                            </div>
                        </div>

                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            2 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='2 $'
                            value = {tealData?.two.toString()}
                            onChange = {(e) => setTealData({...tealData, two: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 2 $'
                            value={(tealData?.two * 2).toString() + ' $'}
                            readOnly/>
                            </div>
                        </div>

                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            0.25 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='0.25 $'
                            value = {tealData?.twentyFiveCents.toString()}
                            onChange = {(e) => setTealData({...tealData, twentyFiveCents: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 0.25 $'
                            value={(tealData?.twentyFiveCents * 0.25).toString() + ' $'}
                            readOnly/>
                            </div>
                        </div>
                        <div className='d-flex mt-4'>
                        <label
                            htmlFor='example-text-input'
                            className='col-form-label col-md-3'
                        >
                            0.05 $
                        </label>
                         <div className='d-flex'>
                            <input
                            className='form-control'
                            type='number'
                            placeholder='0.05 $'
                            value = {tealData?.fiveCents.toString()}
                            onChange = {(e) => setTealData({...tealData, fiveCents: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 0.05 $'
                            value={(tealData?.fiveCents * 0.05).toFixed(2) + ' $'}
                            readOnly/>
                            </div>
                        </div>
                        </Col>
                        </Row>
                        <div>Last Updated at: </div>
                        <div className='d-flex justify-content-center'>
                    <Button className='mt-4' color='primary'>Submit</Button>
</div>
                    </CardBody>
                </Card>
    </div>
  )
}

export default SalesSummary