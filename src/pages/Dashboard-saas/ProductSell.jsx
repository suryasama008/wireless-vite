import React, {useState, useEffect, useRef} from 'react'
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux'
import { useReactToPrint } from 'react-to-print'
import {
  Button,
  Input,
  Table,
  Row,
  Col,
  Card,
  CardBody,
} from 'reactstrap'

import { auth, db } from '../../helpers/firebase'
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  query,
  where,
} from 'firebase/firestore'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
  getModels as onGetModels,
  updateModels as onUpdateModels,
  getUsersData,
} from '../../store/actions'
import moment from 'moment'
import BigInvoice from './BigInvoice';

const ProductSell = () => {
    const { id } = useParams()
    const [item, setItem] = useState({})
    const [prodId, setProdId] = useState(null)
    const [sellPrice, setSellPrice] = useState('')
    const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
    const [emp, setEmp] = useState('')
    const [empName, setEmpName] = useState('')
    const [invoiceNumber, setInvoiceNumber] = useState([])
    const [invoice, setInvoice] = useState('')
    const [remark, setRemark] = useState('')
    const [sold, setSold] = useState(false)
    const [toggleInvoice, setToggleInvoice] = useState(true)
    const dispatch = useDispatch()
   
    const componentRef = useRef()
    const stores = [
      {
        id: 1,
        store: 'SQUARE ONE',
        mall: 'Square One,',
        address: '100 City Centre Dr,',
        phone: '(905) 275-5911',
        city: 'Mississauga, ON L5B 2C9',
      },
      {
        id: 5,
        store: 'SQUARE ONE CART',
        mall: 'Square One,',
        address: '100 City Centre Dr,',
        phone: '(905) 275-5911',
        city: 'Mississauga, ON L5B 2C9',
      },
      {
        id: 2,
        store: 'BCC UL',
        mall: 'Bramalea City Center (Upper Level), ',
        address: '25 Peel Centre Dr,',
        phone: '(905)306-8444',
        city: 'Brampton, ON L6T 3R5',
      },
      {
        id: 3,
        store: 'BCC LL',
        mall: 'Bramalea City Center (Lower Level), ',
        address: '25 Peel Centre Dr,',
        phone: '(905)230-8200',
        city: 'Brampton, ON L6T 3R5',
      },
      {
        id: 4,
        store: 'EMTC',
        mall: 'Erin Mills Town Centre, ',
        address: '5100 Erin Mills Pkwy,',
        phone: '(905)997-0700',
        city: 'Mississauga, ON L5M 4Z5',
      },
      {
        id: 5,
        store: 'EMTC CART',
        mall: 'Erin Mills Town Centre, ',
        address: '5100 Erin Mills Pkwy,',
        phone: '(905)997-0700',
        city: 'Mississauga, ON L5M 4Z5',
      },
      {
        id: 6,
        store: 'TECUMSEH',
        mall: 'TECUMSEH, ',
        address: '7654 TECUMSEH RD,',
        phone: '(519)251-8868',
        city: 'WINDSOR, N8T 1E9',
      },
    ]
      useEffect(()=> {
        setProdId(id)
      ,[id]})
   function condition(props) {
     return props === 'USED'
       ? '30 DAYS IN STORE WARRANTY WITH ORIGINAL PROOF OF PURCHASE. PLEASE NOTE THAT ANY HARDWARE RELATED ISSUES WILL NOT BE COVERED UNDER THE WARRANTY. ALL SALES ARE FINAL.NO REFUNDS OR RETURNS.'
       : '1 YEAR LIMITED MANUFACTURE WARRANTY. WARRANTIES TO CLAIMED THROUGH THE ORIGINAL MANUFACTURER ANY HARDWARE/SOFTWARE ISSUES CAN BE DIRECTED TO THE MANUFACTURER. ALL SALES FINAL. NO REFUNDS OR RETURNS.'
   }
   const store = stores.filter((prod) => prod.store === item.store)
   console.log(store)
     
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

      // useEffect(() => {
      //     getInvoice()
      //     const unsubscribe = () => {
      //       getInvoice()
      //     }
      //     return unsubscribe
      //   }, [])

      const getProduct = async () => {
        const docRef = doc(db, 'products', id)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          setItem(docSnap.data())
        } else {
          console.log('No such document!')
        }
      }

      console.log(item)

      useEffect(()=> {
        getProduct()
      },[])

      useEffect(() => {
        if(item?.taxIn){
          settoggleSwitchSize(item?.taxIn)
          setSellPrice((item?.soldPrice / 1.13).toFixed(2))
          setRemark(item?.soldRemarks)
        }else{
          setSellPrice(item?.soldPrice )
        }
      if (item?.status === 'SOLD'){
        // setSellPrice((item?.soldPrice / 1.13).toFixed(2))
        settoggleSwitchSize(!toggleSwitchSize)
        setSold(!sold)
        setInvoice(item?.invoiceNumber)
      }
      if(item?.status === 'IN STOCK'){
        getInvoice()
        const unsubscribe = () => {
          getInvoice()
        }
        return unsubscribe
        }
      }, [item])


    const handleInvoiceSubmit = async () => {
         const userDoc = doc(invoiceCollectionRef, invoiceNumber[0].id)
         await updateDoc(userDoc, {invoice: parseInt(invoiceNumber[0].invoice) + 1})
     }

     const productRef = collection(db, 'products1')
     
     const handleSell = async () => {
       const updatedData = {
         ...item,
         id: prodId,
         status: 'SOLD',
         taxIn: toggleSwitchSize,
         soldDate: moment().format('DD-MM-YYYY'),
         soldPrice: !toggleSwitchSize ? sellPrice : (sellPrice * 1.13).toFixed(2),
         updatedAt: new Date(),
         soldRemarks: remark,
         updatedBy: empName,
         upadtedDate: moment().format('DD-MM-YYYY') 
       }
       console.log(updatedData)
       dispatch(onUpdateItem(updatedData))
       console.log('Document written with ID: ',item.id)
       handleInvoiceSubmit()
       setSold(true)
     }
     
     const handlePrint = useReactToPrint({
       content: () => componentRef.current,
     })
     const employeeCollectionRef = collection(db, 'employees')

   const handleEmployeeIdChange = async(id) => {
    setEmp(id)
    if(id.length > 2){
      const empQuery = query(employeeCollectionRef, where('empId', '==', id) )
      const data = await getDocs(empQuery)
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const employeeData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const employeeName = employeeData[0].name
      setEmpName(employeeName)
    }
  }

  // useEffect(() => {
  //   getUsersData(empId)
  // }, [empId])

  return (
    <div className='page-content'>
      <Card>
      <Row>
        <Col xs={4} className='mb-3'>
          <h5 className='m-4'>SELL</h5>
          <div className='table-responsive'>
            <Card>
              <CardBody>
          <Table striped bordered hover>
          <tbody>
            <tr>
                <td className='text-start'>Emp #:</td>
                <td className='d-flex'>
                <Col xs={8} md={6}>
                <Input
                    type='text'
                    className='form-control'
                    id='formrow-employeeId-Input'
                    value={emp || ''}
                    placeholder='Employee Id'
                    onChange={(e) => handleEmployeeIdChange(e.target.value)}
                  />
                  </Col>
                  <p className = 'ms-4'>
                    {empName && empName}
                    </p>

                  </td>
              </tr>
          <tr>
              <td className='text-start'>Sell</td>
              <td className='d-flex'>
              <Col xs={8} md={6}>
                  <input
                    type='text'
                    value={sellPrice || ''}
                    //   defaultValue={item?.sellingPrice}
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
                      defaultChecked  = {toggleSwitchSize || ''}
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
                  value={remark || ''}
                  onChange={(e) => setRemark(e.target.value)}
                  className='form-control'
                  id='formrow-firstname-Input'
                  placeholder='write your message here'
                />
              </td>
              </tr>
            </tbody>
            </Table>
            <div className='text-center'>
            <Button onClick = { handleSell} color = 'primary'>Sell</Button>
            </div>
            </CardBody>
            </Card>
            <Card>
              <CardBody>
            <Table striped bordered hover>
        <tbody>
          <tr>
            <td className='text-start'>Store</td>
            <td className='text-start'>{item?.store}</td>
          </tr>
          <tr>
            <td className='text-start'>Product</td>
            <td className='text-start'>{item?.brand} - {item?.model} </td>
          </tr>
          <tr>
            <td className='text-start'>Details</td>
            <td className='text-start'>
              {item?.storage}
              -{item?.color} - {item?.condition}
            </td>
          </tr>
          <tr>
            <td className='text-start'>Imei</td>
            <td className='text-start'>{item?.imei}</td>
          </tr>
          <tr>
            <td className='text-start'>Status</td>
            <td className='text-start'>{item?.status}</td>
          </tr>
          <tr>
            <td className='text-start'>Battery</td>
            <td className='text-start'>{item?.battery}%</td>
          </tr>
              <tr>
                <td className='text-start'>Selling Price</td>
                <td className='text-start'>{item?.sellingPrice}</td>
              </tr>
              <tr>
                <td className='text-start'>CP</td>
                <td className='text-start'>{item?.price}</td>
              </tr>
              <tr>
                <td className='text-start'>Supplier</td>
                <td className='text-start'>{item?.supplier}</td>
              </tr>
              <tr>
                <td className='text-start'>Contact</td>
                <td className='text-start'>{item?.contact}</td>
              </tr>
              <tr>
                <td className='text-start'>Remarks</td>
                <td className='text-start'>{item?.remarks}</td>
              </tr>
              <tr  style={{
              display: item?.status !== 'SOLD' ? 'none' : '',
            }}>
                <td className='text-start'>SellingRemarks</td>
                <td className='text-start'>{item?.SoldRemarks}</td>
              </tr>
              <tr>
                <td className='text-start'>CreatedBy</td>
                <td className='text-start'>{item?.createdBy}</td>
              </tr>
        </tbody>
      
      </Table>
      </CardBody>
            </Card>
          </div>
        </Col>
        <Col xs={8}>
          <div className='d-flex justify-content-between'>
        <h5 className='mt-4'>Invoice</h5>
        <div>
        <Button color='primary'
        className='m-4'
          disabled = {toggleInvoice}
          onClick = {()=>setToggleInvoice(true)}>
            Invoice
          </Button>
        <Button color='primary'
        className='m-4'
          disabled = {!toggleInvoice}
          onClick = {()=>setToggleInvoice(false)}>
            A4 Invoice
          </Button>

        </div>
        <Button color='success'
        className='m-4'
          disabled = {!sold}
          onClick = {handlePrint}>
            <i className='bx bx-printer '></i>
          </Button>
        </div>
        <div>
      
        </div>
        <div ref={componentRef} className='my-4'>
          {toggleInvoice ? (
          <div>
            <div className='text-center border-bottom'>
              <h4>Wireless Plus</h4>
              <h6>{store[0]?.mall}</h6>
              <h6>{store[0]?.phone}</h6>
              <h6>{store[0]?.city}</h6>
            </div>
            <div className='m-3 d-flex justify-content-between border-bottom'>
              <h6>Invoice: {invoice}</h6>
              <h6>Date: {item?.soldDate ? item.soldDate : moment().format('DD MMMM YYYY')}</h6>
            </div>
            <div className='m-3 border-bottom'>
              <h6>{item?.brand} - {item?.model}- {item?.storage} - {item?.color}</h6>
              <h6>IMEI: {item?.imei}</h6>
            </div>
            <div className='m-3 border-bottom d-flex justify-content-between'>
              <div>
                <h6>Gross Total</h6>
                <h6>Tax</h6>
                <h6>HST #: </h6>
                <h6>Net Total</h6>
              </div>
              <div>
                <h6> {!toggleSwitchSize  ? sellPrice : (sellPrice / 1.13).toFixed(2)}</h6>
                <h6>{!toggleSwitchSize
                  ? (sellPrice * 0.13).toFixed(2)
                  : (sellPrice - sellPrice / 1.13).toFixed(2)}</h6>
                <h6>819582198</h6>
                <h6>{toggleSwitchSize ? sellPrice : (sellPrice * 1.13).toFixed(2)}</h6>
              </div>
            </div>
            <div className='m-3 border-bottom'>
              <h6>{condition(item?.condition)}</h6>
              </div>
              {remark && <div className='m-3 border-bottom'>
               <h6>{remark}</h6>
              </div>
              }
               <div className = 'm-3'>
              Sign : _______________________
            </div>
      </div> 
      ) : (
        <BigInvoice item = {item} sellPrice = {sellPrice}
        toggleSwitchSize = {toggleSwitchSize} remark = {remark}
        store = {store} stores={stores} condition={condition} 
        invoice= {invoice} />
      )}
      </div>
        </Col>
      </Row>
      </Card>
    </div>
  )
}

export default ProductSell