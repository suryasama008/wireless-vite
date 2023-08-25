import React, { useState, useRef, useEffect } from 'react'
import { useReactToPrint } from 'react-to-print'

import {
  Button,
  Input,
  Table,
  Row,
  Col
} from 'reactstrap'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
  getModels as onGetModels,
  updateModels as onUpdateModels,
  getUsersData,
} from '../../store/actions'
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
import moment from 'moment'
import { useSelector, useDispatch } from 'react-redux'

const ProductSell = ({searchResults, isOffCanvas }) => {
    const [sellPrice, setSellPrice] = useState('')
     const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
     const [sell, setSell] = useState(false)
     const [emp, setEmp] = useState('')
     const [empName, setEmpName] = useState('')
     const [invoiceNumber, setInvoiceNumber] = useState([])
     const [invoice, setInvoice] = useState('')
     const [remark, setRemark] = useState('')
     const [sold, setSold] = useState(false)
     const [employees, setEmployees] = useState([])
  const dispatch = useDispatch()
    
     const componentRef = useRef()
     const stores = [
      {
        store: 'SQUARE ONE',
        mall: 'Square One,',
        address: '100 City Centre Dr,',
        phone: '(905) 275-5911',
        city: 'Mississauga, ON L5B 2C9',
      },
      {
        store: 'BCC UL',
        mall: 'Bramalea City Center (Upper Level), ',
        address: '25 Peel Centre Dr,',
        phone: '(905)306-8444',
        city: 'Brampton, ON L6T 3R5',
      },
      {
        store: 'BCC LL',
        mall: 'Bramalea City Center (Lower Level), ',
        address: '25 Peel Centre Dr,',
        phone: '(905)230-8200',
        city: 'Brampton, ON L6T 3R5',
      },
      {
        store: 'EMTC',
        mall: 'Erin Mills Town Centre, ',
        address: '5100 Erin Mills Pkwy,',
        phone: '(905)997-0700',
        city: 'Mississauga, ON L5M 4Z5',
      },
    ]

    function condition(props) {
      return props === 'USED'
        ? '30 DAYS IN STORE WARRANTY WITH ORIGINAL PROOF OF PURCHASE. PLEASE NOTE THAT ANY HARDWARE RELATED ISSUES WILL NOT BE COVERED UNDER THE WARRANTY. ALL SALES ARE FINAL.NO REFUNDS OR RETURNS.'
        : '1 YEAR LIMITED MANUFACTURE WARRANTY. WARRANTIES TO CLAIMED THROUGH THE ORIGINAL MANUFACTURER ANY HARDWARE/SOFTWARE ISSUES CAN BE DIRECTED TO THE MANUFACTURER. ALL SALES FINAL. NO REFUNDS OR RETURNS.'
    }
    const store = stores.filter((item) => item.store === searchResults.store)
      
    const invoiceCollectionRef = collection(db, 'invoice')
 
     const getInvoice = async () => {
          const data = await getDocs(invoiceCollectionRef)
          var invoiceData = []
          data.docs.map((doc) => {
            const temp = { ...doc.data(), id: doc.id }
            invoiceData.push(temp)
          })
          setInvoiceNumber(invoiceData)
          setInvoice(invoiceData[0].invoice + 1)
          return invoiceData
        }

   useEffect(() => {
        getInvoice()
        const unsubscribe = () => {
          getInvoice()
        }
        return unsubscribe
      }, [])

    useEffect(() => {
      if (searchResults?.status === 'SOLD'){
        setSellPrice((searchResults?.soldPrice / 1.13).toFixed(2))
        settoggleSwitchSize(!toggleSwitchSize)
      }
    }, [searchResults])


     const handleInvoiceSubmit = async () => {
          const userDoc = doc(invoiceCollectionRef, invoiceNumber[0].id)
          await updateDoc(userDoc, {invoice: parseInt(invoiceNumber[0].invoice) + 1})
      }
      const productRef = collection(db, 'products1')
      const handleSell = async () => {
        const updatedData = {
          ...searchResults,
          status: 'SOLD',
          soldDate: moment().format('DD-MM-YYYY'),
          soldPrice: !toggleSwitchSize ? sellPrice : (sellPrice * 1.13).toFixed(2),
          updatedAt: new Date(),
          SoldRemarks: remark,
          updatedBy: empName,
        }

        console.log(updatedData)
        dispatch(onUpdateItem(updatedData))
        console.log('Document written with ID: ',searchResults.id)
        handleInvoiceSubmit()
        setSold(true)
      }
      
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      })
      const employeeCollectionRef = collection(db, 'employees')

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
      getEmployees().then((emp) => {
        setEmployees(emp)
      }
      )
      const unsubscribe = () => {
        getEmployees()
      }
      return unsubscribe
    
    }, [])

      const handleEmployeeIdChange = (id) => {
        setEmp(id)
      const employee = employees.find((employee) => employee.empId === id)
        if (employee) {
          setEmpName(employee.name)
        } else {
          setEmpName('')
        }
      }

  return (
    <div className='overflow:auto mx-4'>
      {!sell ? (
      <>
      <Table striped bordered hover>
        <tbody>
          <tr>
            <td className='text-start'>Store</td>
            <td className='text-start'>{searchResults?.store}</td>
          </tr>
          <tr>
            <td className='text-start'>Brand</td>
            <td className='text-start'>{searchResults?.brand} - {searchResults?.model} </td>
          </tr>
          <tr>
            <td className='text-start'>Model</td>
            <td className='text-start'>
              {searchResults?.storage}
              {searchResults?.color} ({searchResults?.condition})
            </td>
          </tr>
          <tr>
            <td className='text-start'>Imei</td>
            <td className='text-start'>{searchResults?.imei}</td>
          </tr>
          <tr>
            <td className='text-start'>Status</td>
            <td className='text-start'>{searchResults?.status}</td>
          </tr>
              <tr>
                <td className='text-start'>CP</td>
                <td className='text-start'>{searchResults?.price}</td>
              </tr>
              <tr>
                <td className='text-start'>Selling Price</td>
                <td className='text-start'>{searchResults?.sellingPrice}</td>
              </tr>
              <tr>
                <td className='text-start'>CreatedBy</td>
                <td className='text-start'>{searchResults?.createdBy}</td>
              </tr>
              <tr>
                <td className='text-start'>Remarks</td>
                <td className='text-start'>{searchResults?.remarks}</td>
              </tr>
              <tr  style={{
              display: searchResults?.status !== 'SOLD' ? 'none' : '',
            }}>
                <td className='text-start'>SellingRemarks</td>
                <td className='text-start'>{searchResults?.SoldRemarks}</td>
              </tr>
              
              
        </tbody>
      </Table>
      <div className='text-center'>
      <Button color='primary ' onClick = {()=> setSell(!sell)}>
           Sell <i className='mdi mdi-arrow-right ms-1'></i> 
      </Button>
      </div>
      </>
        ):(
          <div >
          <Table striped bordered hover>
          <tbody>
          <tr>
              <td className='text-start'>Emp #:</td>
              <td className='text-start'>
              <Input
                    type='text'
                    className='form-control'
                    id='formrow-employeeId-Input'
                    value={emp}
                    placeholder='Enter Your Employee Id'
                    onChange={(e) => handleEmployeeIdChange(e.target.value)}
                  />
              </td>
            </tr>
          <tr>
              <td className='text-start'>Sell</td>
              <td className='d-flex'>
              <Col xs={8} md={6}>
                  <input
                    type='text'
                    value={sellPrice}
                    //   defaultValue={searchResults?.sellingPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                    className='form-control'
                    id='formrow-firstname-Input'
                    placeholder='Selling Price'
                  />
                  </Col>
                  <div className='form-check form-switch ms-4'>
                    <input
                      type='checkbox'
                      className='form-check-input'
                      id='customSwitchsizesm'
                      //   defaultChecked
                      onClick={(e) => {
                        settoggleSwitchSize(!toggleSwitchSize)
                      }}
                    />
                    <label
                      className='form-check-label'
                      htmlFor='customSwitchsizesm'
                    >
                      Tax-In
                    </label>
                  </div>
              </td>
            </tr>
            <tr>
              <td className='text-start'>Message:</td>
              <td className='text-start'>
                <Input
                  type='text'
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  className='form-control'
                  id='formrow-firstname-Input'
                  placeholder='write your message here'
                />
              </td>
            </tr>
            </tbody>
            </Table>
            <div ref={componentRef} className='my-4'>
            <div className='text-center border-bottom'>
              <h4>Wireless Plus</h4>
              <h6>{store[0]?.mall}</h6>
              <h6>{store[0]?.phone}</h6>
              <h6>{store[0]?.city}</h6>
            </div>
            <div className='m-3 d-flex justify-content-between border-bottom'>
              <h6>Emp: {empName}</h6>
              <div>
              <h6>Date: {searchResults?.soldDate ? searchResults.soldDate : moment().format('DD MMMM YYYY')}</h6>
              <h6>Invoice: {invoice}</h6>
              </div>
            </div>
            <div className='m-3 border-bottom'>
              <h6>{searchResults?.brand} - {searchResults?.model}- {searchResults?.storage} - {searchResults?.color}</h6>
              <h6>IMEI: {searchResults?.imei}</h6>
            </div>
            <div className='m-3 border-bottom d-flex justify-content-between'>
              <div>
                <h6>Gross Total</h6>
                <h6>Tax</h6>
                <h6>HST #: </h6>
                <h6>Net Total</h6>
              </div>
              <div>
                <h6> {toggleSwitchSize  ? sellPrice : (sellPrice / 1.13).toFixed(2)}</h6>
                <h6>{toggleSwitchSize
                  ? (sellPrice * 0.13).toFixed(2)
                  : (sellPrice - sellPrice / 1.13).toFixed(2)}</h6>
                <h6>819582198</h6>
                <h6>{!toggleSwitchSize ? sellPrice : (sellPrice * 1.13).toFixed(2)}</h6>
              </div>
            </div>
            <div className='m-3 border-bottom'>
              <h6>{condition(searchResults?.condition)}</h6>
              </div>
              {remark && <div className='m-3 border-bottom'>
               <h6>{remark}</h6>
              </div>
              }
      </div> 
      <div className = 'd-flex justify-content-between'>
        <Button color='primary ' onClick = {()=> setSell(!sell)}>
              <i className='mdi mdi-arrow-left me-1'></i>Back 
          </Button>
          <Button color='success'
          disabled = {!sold}
          onClick = {handlePrint}>
            <i className='bx bx-printer '></i>
          </Button>
          <Button color='primary ' onClick = {handleSell} disabled = {sold}>
              Sell <i className='mdi mdi-arrow-right ms-1'></i>
          </Button>
          </div>
          {sold ?  <p className='m'>Product Sold Successfully</p> : null}
          </div>
        )}
    </div>
  )
}

export default ProductSell