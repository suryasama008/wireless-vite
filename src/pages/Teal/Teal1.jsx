import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
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
const Teal = () => {
    const [employeeId, setEmployeeId] = useState('')
    const [employeeName, setEmployeeName] = useState('')
    const [employees, setEmployees] = useState([])
    const [store, setStore] = useState('')
    const [tealData, setTealData] = useState({
        hundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        five: 0,
        one: 0,
        two: 0,
        twentyFiveCents:0,
        tenCents: 0,
        fiveCents: 0,
    })
    const [total, setTotal] = useState(0)
    const user = useSelector((state) => state.users.user)
    useEffect(() => { 
        setStore(user.store)
    }, [user])
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
console.log(store)
      const getEmployees = async () => {
        const data = await getDocs(employeeCollectionRef)
        var employees = []
        data.docs.map((doc) => {
          const temp = { ...doc.data(), id: doc.id }
          employees.push(temp)
        })
        return employees
      }
      const tealCollectionRef = collection(db, 'teal')
      const getTealData = async () => {
          const data = await getDocs(tealCollectionRef)
          var teal = []
          data.docs.map((doc) => {
            const temp = { ...doc.data(), id: doc.id }
            teal.push(temp)
          })
          const filteredData = teal.filter((item) => item.store === store)
          setTealData(filteredData[0])
          console.log(filteredData[0])
          return filteredData
        }
    

    useEffect(() => {
        getTealData()
        getEmployees().then((emp) => {
            setEmployees(emp)
          }
          )
          const unsubscribe = () => {
            getEmployees()
          }
          return unsubscribe
    }, [store])

    useEffect(() => {
        const totalCount = tealData && tealData.hundred * 100 + tealData.twenty * 20 + tealData.five * 5 + tealData.one * 1 + tealData.two * 2 + tealData.twentyFiveCents * 0.25 + tealData.tenCents * 0.1 + tealData.fiveCents * 0.05
        console.log(totalCount)
        setTotal(totalCount)

    }, [tealData])

    const handleSave = async () => {
      const updatedTeal = {
        ...tealData,
        hundred: tealData.hundred,
        fifty: tealData.fifty,
        twenty: tealData.twenty,
        ten: tealData.ten,
        five: tealData.five,
        one: tealData.one,
        two: tealData.two,
        twentyFiveCents: tealData.twentyFiveCents,
        tenCents: tealData.tenCents,
        fiveCents: tealData.fiveCents,
        empName: employeeName,
        empId: employeeId,
        total: total,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString('en-US', { hour12: true }),
        store: user.store,
      }
      try {
        const tealCollectionRef = collection(db, 'teal')
        const userDoc = doc(tealCollectionRef, tealData.id)
        await updateDoc(userDoc, updatedTeal)
      } catch (error) {
        console.error('Error adding document: ', error)
      }
        const data = await getDoc(doc(db, 'teal', 'teal'))
        console.log(tealData)
        setEmployeeId('')
        setEmployeeName('')
        getTealData()
    }

  return (
    <div className='page-content'>
              <Card>
                    <CardBody>
                        <div className='d-flex justify-content-between'>
                        <h2>Till</h2>
                        <div className='d-flex'>
                          <h5 className='me-4 mt-2'>Total</h5>
                        <Button color='success' className='mb-4'>$ {total}</Button>
                        </div>
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
                            value = {tealData?.hundred }
                            onChange = {(e) => setTealData({...tealData, hundred: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            value={(tealData?.hundred * 100) + ' $'} 
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
                            value = {tealData?.twenty}
                            onChange = {(e) => setTealData({...tealData, twenty: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            value={(tealData?.twenty * 20) + ' $'}
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
                            value = {tealData?.five}
                            placeholder='5 $'
                            onChange = {(e) => setTealData({...tealData, five: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 5 $'
                            value={(tealData?.five * 5) + ' $'}
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
                            value = {tealData?.one}
                            onChange = {(e) => setTealData({...tealData, one: e.target.value})}
                            />
                            <input className='form-control ms-1'
                            placeholder='X 1 $'
                            value={(tealData?.one * 1) + ' $'}
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
                            value = {tealData?.tenCents}
                            onChange = {(e) => setTealData({...tealData, tenCents: e.target.value})}
                            />
                            <input className='form-control ms-1'
                            placeholder='X 0.10 $'
                            value={(tealData?.tenCents * 0.1) + ' $'}
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
                            value = {tealData?.fifty}
                            onChange = {(e) => setTealData({...tealData, fifty: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 50 $'
                            value={(tealData?.fifty * 50) + ' $'}
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
                            value = {tealData?.ten}
                            onChange = {(e) => setTealData({...tealData, ten: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 10 $'
                            value={(tealData?.ten * 10) + ' $'}
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
                            value = {tealData?.two}
                            onChange = {(e) => setTealData({...tealData, two: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 2 $'
                            value={(tealData?.two * 2) + ' $'}
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
                            value = {tealData?.twentyFiveCents}
                            onChange = {(e) => setTealData({...tealData, twentyFiveCents: e.target.value})}
                            />
                            <input className='form-control ms-1' 
                            placeholder='X 0.25 $'
                            value={(tealData?.twentyFiveCents * 0.25) + ' $'}
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
                            value = {tealData?.fiveCents}
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
                        <div className='mt-4'>
                          <p className = 'font-style-italic'>Last Updated :  {tealData?.date} at {tealData?.time} </p>
                          <p>Updated By: {tealData?.empName}</p>
                          </div>
                        <div className='d-flex justify-content-center'>
                    <Button className='mt-4' color='primary' onClick = {handleSave}>Submit</Button>
                    </div>
                    </CardBody>
                </Card>
    </div>
  )
}

export default Teal