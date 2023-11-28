import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import {
    Col,
    Row,
    Card,
    CardBody,
    Table,
    CardTitle,
    Button
  } from 'reactstrap'
  import { useReactToPrint } from 'react-to-print'
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

import { teal } from '@mui/material/colors'
import SalesSummary from '../SalesSummary/SalesSummary'
const Cases = () => {
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
    storeCash:0
})

const [salesSummary, setSalesSummary] = useState({
  cash:'',
  card:'',
  itemsSold:'',
  phones:'',
  repairs:'',
  expenses: '',
  expensesList:''
})
const componentRef = useRef()
const [total, setTotal] = useState(0)
const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));

const user = useSelector((state) => state.users.user)
useEffect(() => { 
    setStore(user.store)
}, [user])
const [employeeId, setEmployeeId] = useState('')
const [employeeName, setEmployeeName] = useState('')
const [employees, setEmployees] = useState([])
const [todaysItems, setTodaysItems] = useState([])
const employeeCollectionRef = collection(db, 'employees')
const [todaysSalesSummary, setTodaysSalesSummary] = useState([])
const handleEmployeeIdChange = (id) => {
    setEmployeeId(id)
  const employee = employees.find((employee) => employee.empId === id)
    if (employee) {
      setEmployeeName(employee.name)
    } else {
      setEmployeeName('')
    }
  }
const getTodaysItems = async () => {
  const soldItemsCollectionRef = collection(db, 'products')
  const date = moment().format('DD-MM-YYYY')
  const soldquery = query(soldItemsCollectionRef,
    where('soldDate', '==', date),
  )
  const data = await getDocs(soldquery)
  const todaysData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  const storeItems = todaysData.filter((item) => item.store === store)
  setTodaysItems(storeItems)
  }
  const getTodaysSaleSummary = async () => {
    const salesSummaryCollectionRef = collection(db, 'salessummary')
    const date = moment().format('DD-MM-YYYY')
    const summaryquery = query(salesSummaryCollectionRef,
      where('date', '==', moment().format('DD-MM-YYYY')),
    )
    const data = await getDocs(summaryquery)
    const todaysData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    const salesSummary = todaysData.filter((item) => item.store === store)
    return salesSummary
    }

console.log(todaysSalesSummary)
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
      return filteredData
    }

console.log(todaysSalesSummary)
useEffect(() => {
  getTodaysItems()
    getTealData()
    getTodaysSaleSummary().then((sales) => {
      console.log(sales[0])
      setTodaysSalesSummary(sales)
    })
    getEmployees().then((emp) => {
        setEmployees(emp)
      }
      )
      const unsubscribe = () => {
        getEmployees()
        getTodaysItems()
      }
      return unsubscribe
}, [store])

useEffect(() => {
    const totalCount = tealData && tealData.hundred * 100 + tealData.twenty * 20 + tealData.five * 5 + tealData.one * 1 + tealData.two * 2 + tealData.twentyFiveCents * 0.25 + tealData.tenCents * 0.1 + tealData.fiveCents * 0.05
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
    setEmployeeId('')
    setEmployeeName('')
    getTealData()
}

const handleDateChange = (e) => {
  setSelectedDate(moment(e.target.value).format('DD-MM-YYYY'));
};

const handleSubmit = () => {
  const todatData = {
    id: moment().format('DD-MM-YYYY'),
    store: store,
  }
}
const removeFromCartOrders = (item) => {
  const updatedItems = todaysItems.filter(
    (prod) => prod.id !== item.id
  )
  setTodaysItems(updatedItems)
}

const handleSaleSummary = async () => {
  const updatedSalesSumary = {
    ...salesSummary,
    cash:salesSummary.card,
    card: (parseFloat(total) - parseFloat(tealData?.storeCash)).toFixed(2),
    itemsSold:0,
    phones:todaysItems.count,
    repairs:salesSummary.repairs,
    expenses: salesSummary.expenses,
    store: user.store,
  }
  try {
    const saleSummaryCollectionRef = collection(db, 'salesSummary')
    const userDoc = doc(saleSummaryCollectionRef, tealData.id)
    await updateDoc(userDoc, updatedTeal)
  } catch (error) {
    console.error('Error adding document: ', error)
  }
    const data = await getDoc(doc(db, 'teal', 'teal'))
    setEmployeeId('')
    setEmployeeName('')
    getTealData()
}
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
})
  return (
    <div className='page-content'>
      <Row>
      
      <Col lg={4}>
    <Card  className='mb-2'>
      <CardTitle className='mb-0 p-3 border-bottom bg-light'>
        <h5 className='mb-0'>Today's Sales</h5>
      </CardTitle>
      <CardBody>
      <Table striped bordered hover>
  <tbody>

  <tr>
      <td className='text-start col-sm-3'>Card</td>
      <td className='text-center col-sm-3'>
      <input
            className='form-control text-center'
            // type='number'
            placeholder= '0'
            value = {salesSummary?.card}
            onChange = {(e) => setSalesSummary({...salesSummary, card: e.target.value})}
            />
      </td>
      </tr>
        <tr>
  <td className='text-start col-sm-3'>Cash</td>
  <td className='text-center col-sm-3'>
    <input 
      className='form-control text-center'  
      value={salesSummary?.cash}
      onChange = {(e) => setSalesSummary({...salesSummary, cash: e.target.value})}
    />
  </td>
</tr>
<tr>
  <td className='text-start col-sm-3'>Today's Sale</td>
  <td className='text-center col-sm-3 '>
    <input 
      className='form-control text-center' 
      disabled 
      value={(parseFloat(salesSummary?.card) + (parseFloat(salesSummary?.cash))).toFixed(2)}
    />
  </td>
</tr>
  <tr>
      <td className='text-start col-sm-3'>Sales By Model</td>
      <td className='text-center col-sm-3'>
      <input
            className='form-control text-center'
            type='number'
            placeholder='0'
            value = {salesSummary?.itemsSold}
            onChange = {(e) => setSalesSummary({...salesSummary, itemsSold: e.target.value})}
            />
      </td>
      </tr>
  <tr>
      <td className='text-start col-sm-3'>Phones & Accessories</td>
      <td className='text-center col-sm-3'>
      <input
            className='form-control text-center'
            type='number'
            placeholder='0'
            value = {salesSummary?.phones}
            onChange = {(e) => setSalesSummary({...salesSummary, phones: e.target.value})}
            />
      </td>
      </tr>
  <tr>
      <td className='text-start col-sm-3'>Repairs</td>
      <td className='text-center col-sm-3'>
      <input
            className='form-control text-center'
            type='number'
            placeholder='0'
            value = {salesSummary?.repairs}
            onChange = {(e) => setSalesSummary({...salesSummary, repairs: e.target.value})}
            />
      </td>
      </tr>
  <tr>
      <td className='text-start col-sm-3'>Expenses</td>
      <td className='text-center col-sm-3'>
      <input
            className='form-control text-center'
            type='number'
            placeholder='0'
            value = {salesSummary?.expenses}
            onChange = {(e) => setSalesSummary({...salesSummary, expenses: e.target.value})}
            />
      </td>
      </tr>
      <tr>
        <td>
          Expenses Description
        </td>
        <td>
          <textarea className='form-control'
          value = {salesSummary.expensesList}
          onChange = {(e) => setSalesSummary({...salesSummary, expensesList: e.target.value})}
          />
        </td>
      </tr>
      </tbody>
      </Table>
      <Table>
        <tbody>
        {
          todaysItems.map((item) => (
            <tr key={item.id}>
              <td>{item.model}</td>
              <td>{item.soldPrice}</td>
              <td>
              <Button
                  color='danger'
                  className='btn-sm'
                  onClick={() => removeFromCartOrders(item)}
                  >
                      <i className='bx bxs-trash'></i>
                   </Button>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
      <div className='text-center'>
        <Button color = 'primary' >Save</Button>
      </div>
      </CardBody>
      </Card>
      </Col>
      <Col lg={4}>
      <Card className='mb-2'>
  <CardTitle className='mb-0 p-3 border-bottom bg-light'>
    <h5 className='mb-0'>Sales Summary</h5>
  </CardTitle>
  <CardBody>
    <div ref={componentRef} className='m-4'>
      <div className='text-center'>
        <h2>Wireless+</h2>
        <h4>{store}</h4>
      </div>
      <div className='row'>
        <div className='col'>
          {/* This column is for names */}
          <p>Date</p>
          <p>Card</p>
          <p>Cash</p>
          <p>Today's Sale</p>
          <p>Sales By Model</p>
          <p>Phones Sold</p>
          <p>Repairs</p>
          <p>Expenses</p>
          <p>Expenses Description</p>
        </div>
        <div className='col text-end'>
          {/* This column is for values */}
          <p>{moment().format('DD-MM-YYYY')}</p>
          <p>{salesSummary.card || '-'}</p>
          <p>{salesSummary.cash || '-'}</p>
          <p>{salesSummary.card && salesSummary.cash ? (parseFloat(salesSummary.card) + parseFloat(salesSummary.cash)).toFixed(2) : '-'}</p>
          <p>{salesSummary.itemsSold || '-'}</p>
          <p>{salesSummary.phones || '-'}</p>
          <p>{salesSummary.repairs || '-'}</p>
          <p>{salesSummary.expenses || '-'}</p>
          <textarea className='form-control mt-2' value={salesSummary.expensesList || ''} />
        </div>
      </div>
      <h4>Phones:</h4>
      <div className='row'>
        <div className='col'>
          {/* This column is for phone names */}
          {todaysItems.length > 0 ? todaysItems.map((item) => (
            <p key={item.id}>{item.model}- {item.color} ({item.condition})</p>
          )) : <p>No phones sold today.</p>}
        </div>
        <div className='col'>
          {/* This column is for phone values */}
          {todaysItems.length > 0 ? todaysItems.map((item) => (
            <p key={item.id}>{item.soldPrice}</p>
          )) : <p>-</p>}
        </div>
      </div>
    </div>
    <div className='text-center'>
      <Button color='success' className='m-4' onClick={handlePrint}>
        Print
      </Button>
    </div>
  </CardBody>
</Card>


      </Col>
      <Col lg={4}>
    <Card  className='mb-2'>
      <CardTitle className='mb-0 p-3 border-bottom bg-light'>
        <h5 className='mb-0'>Till</h5>
      </CardTitle>
      <CardBody>
      <Table striped bordered hover>
  <tbody>
  <tr>
      <td className='text-start col-sm-3'>Employee</td>
      <td className='text-start col-sm-3'>
      <input
          className='form-control'
          type='number'
          placeholder='Emp Id'
          id='formrow-employeeId-Input'
          value={employeeId}
          onChange={(e) => handleEmployeeIdChange(e.target.value)}
      />
      </td>
      <td className='text-center col-sm-3'> 
          {employeeName}
         </td>
    
    </tr>
    <tr>
    <td className='text-start col-sm-3'>Store Cash</td>
      <td className='text-center col-sm-3'>
        <input className='form-control text-center' 
        value = {tealData?.storeCash }
        onChange = {(e) => setTealData({...tealData, storeCash: e.target.value})} />
      </td>
    </tr>
    <tr>
      <td className='text-start'>$100</td>
      
      <td className='text-start col-sm-3'>
      <input
        className='form-control'
        type='string'
        placeholder='100 $'
        value = {tealData?.hundred }
        onChange = {(e) => setTealData({...tealData, hundred: e.target.value})}
        />
      </td>
      <td className='text-center col-sm-2'>
      {(tealData?.hundred * 100) + ' $'} 
      </td>
    </tr>
    <tr>
      <td className='text-start'>$50</td>
      <td className='text-center'>
      <input
          className='form-control'
          type='number'
          placeholder='50 $'
          value = {tealData?.fifty}
          onChange = {(e) => setTealData({...tealData, fifty: e.target.value})}
          />
      </td>
      <td className='text-center'>{(tealData?.fifty * 50) + ' $'}</td>
    </tr>
    <tr>
      <td className='text-start'>$20</td>

      <td className='text-center'><input
          className='form-control'
          type='number'
          placeholder='20 $'
          value = {tealData?.twenty}
          onChange = {(e) => setTealData({...tealData, twenty: e.target.value})}
          /></td>
                <td className='text-center'>{(tealData?.twenty * 20) + ' $'}</td>
    </tr>
    <tr>
      <td className='text-start'>$10</td>
      <td className='text-center'>                
        <input
          className='form-control'
          type='number'
          placeholder='10 $'
          value = {tealData?.ten}
          onChange = {(e) => setTealData({...tealData, ten: e.target.value})}
          /></td>
      <td className='text-center'>{(tealData?.ten * 10) + ' $'}</td>
    </tr>
    <tr>
      <td className='text-start'>$5</td>
      <td className='text-center'><input
          className='form-control' 
          type='number'
          value = {tealData?.five}
          placeholder='5 $'
          onChange = {(e) => setTealData({...tealData, five: e.target.value})}
          /></td>
      <td className='text-center'>{(tealData?.five * 5) + ' $'}</td>

    </tr>
    <tr>
      <td className='text-start'>$2</td>
      <td className='text-center'>
        <input
          className='form-control'
          type='number'
          placeholder='2 $'
          value = {tealData?.two}
          onChange = {(e) => setTealData({...tealData, two: e.target.value})}
          /></td>
      <td className='text-center'>{(tealData?.two * 2) + ' $'}</td>
    </tr>
    <tr>
      <td className='text-start'>$1</td>
      <td className='text-center'><input
        className='form-control'
        type='number'
        placeholder='1 $'
        value = {tealData?.one}
        onChange = {(e) => setTealData({...tealData, one: e.target.value})}
        /></td>
      <td className='text-center'>{(tealData?.one * 1) + ' $'}</td>
    </tr>
    <tr>
      <td className='text-start'>$0.25</td>
      <td className='text-center'>
          <input
              className='form-control'
              type='number'
              placeholder='0.25 $'
              value = {tealData?.twentyFiveCents}
              onChange = {(e) => setTealData({...tealData, twentyFiveCents: e.target.value})}
              />
          </td>
          <td className='text-center'>{(tealData?.twentyFiveCents * 0.25) + ' $'}</td>
    </tr>
        <tr>
          <td className='text-start'>$0.10</td>
          <td className='text-center'> 
          <input
            className='form-control'
            type='number'
            placeholder='0.10 $'
            value = {tealData?.tenCents}
            onChange = {(e) => setTealData({...tealData, tenCents: e.target.value})}
            /></td>
          <td className='text-center'>{(tealData?.tenCents * 0.1) + ' $'}</td>
        </tr>
        <tr>
          <td className='text-start'>$0.05</td>
          <td className='text-center'>
          <input
              className='form-control'
              type='number'
              placeholder='0.05 $'
              value = {tealData?.fiveCents}
              onChange = {(e) => setTealData({...tealData, fiveCents: e.target.value})}
              />
          </td>
          <td className='text-center'>{(tealData?.fiveCents * 0.05).toFixed(2) + ' $'}</td>

        </tr>
            </tbody>
            </Table>
            <Table>
            <tbody>
            <tr>
          <td className='text-start'>Total</td>
          <td className='text-end'>$ {total}</td>
        </tr>
        <tr>
        <td className='text-start col-sm-3'>Store Cash</td>
        <td className='text-end col-sm-3'>
          -{tealData?.storeCash}
        </td>
      </tr>
        <tr>
        <td className='text-start col-sm-3'>Sale Cash</td>
        <td className='text-end col-sm-3'>
         {(parseFloat(total) - parseFloat(tealData?.storeCash)).toFixed(2)}
        </td>
      </tr>
        <tr>
          <td className='text-start'>Last Updated By</td>
          <td className='text-end'>{tealData?.empName}</td>
        </tr>
        <tr>
          <td className='text-start'>Last Updated At</td>
          <td className='text-end'>{tealData?.date},  {tealData?.time} </td>
        </tr>
            </tbody>
            </Table>
            <div className='text-center'>
            <Button className='mt-4' color='primary' onClick = {handleSave}>Save</Button>
            </div>
            </CardBody>
        </Card>
      </Col>
      </Row>
      </div>
  )
}

export default Cases