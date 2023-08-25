import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  fetchOrders as onFetchOrders,
  addNewOrders as onAddNewOrder,
  updateOrders as onUpdateOrder,
  deleteOrders as onDeleteOrder,
} from '/src/store/actions'
import { Button, Row, Col, Card, CardBody, InputGroup,Table } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import moment from 'moment'

const OrdersList = ({ order, user }) => {
  const [store, setStore] = useState('')
  const [orders, setOrders] = useState([])

 /**
  * The function formatDate formats a given date into a string with the format "dd/mm/yyyy", and the
  * code sets the initial state of selectedDate to today's date in that format using the useState hook.
  * @returns The `formatDate` function returns a formatted date string in the format of "DD/MM/YYYY".
  * The `today` variable is assigned the current date in the formatted string format. The `useState`
  * hook initializes the `selectedDate` state variable with the value of `today`.
  */
 
 useEffect(() => {
  setStore(user.store)
}, [user])
  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    console.log()
    return `${month}/${date}/${year}`
  }
  const today = formatDate(new Date())
  const [selectedDate, setSelectedDate] = useState(moment().format('DD/MM/YYYY'))

/* This code block is using the `useDispatch` hook from the `react-redux` library to get a reference to
the `dispatch` function, which is used to dispatch actions to the Redux store. */

  const dispatch = useDispatch()
  useEffect(() => {
    const date = new Date().toLocaleDateString()
    dispatch(onFetchOrders(date))
    // if(date !== selectedDate) dispatch(onFetchOrders(selectedDate))
  }, [dispatch])

  useEffect(()=>{
    const filteredOrders = order[0]?.products.filter(prod => prod.store === store)
    console.log(filteredOrders)
    setOrders(filteredOrders)
  },[store,order])

 /**
  * This function dispatches an action to fetch orders for a selected date.
  */
  const handleRefresh = () => {
   dispatch(onFetchOrders(selectedDate))
  }

  const handleDateChange = ( dateStr) => {
    const date = new Date(dateStr).toLocaleDateString()
    // setSelectedDate(date)
    dispatch(onFetchOrders(date))
  }


  const removeFromCartOrders = (prod) => {
      const updatedCartOrders = order[0].products.filter(
        (item) => item.prodId !== prod.prodId
      )
      //if order exist update the order
      const orderList = {
        id: order[0]?.id,
        date: order[0]?.date,
        products: [...updatedCartOrders],
      }
    dispatch(onUpdateOrder(orderList))
    const date = new Date().toLocaleDateString()
    dispatch(onFetchOrders(date))
  }
  
  return (
    <div className='page-content'>
      <div className='container-fluid'>
        <Breadcrumbs title='SQUARE ONE' breadcrumbItem='Order List' />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <InputGroup>
                      <Flatpickr
                        className='form-control d-block'
                        placeholder='dd/mm/yyyy'
                        defaultValue={ moment().format('DD-MM-YYYY')}
                        onChange={(e) => handleDateChange(e)}
                        options={{
                          altInput: true,
                          altFormat: 'd/m/Y',
                          dateFormat: 'd/m/Y',
                        }}
                      />
                    </InputGroup>
                  </div>
                    <div>
                      <select value={store}
                       onChange={(e)=>setStore(e.target.value)} 
                        className='form-select'
                        >
                        <option>BCC LL</option>
                        <option>BCC UL</option>
                        <option>EMTC</option>
                        <option>EMTC CART</option>
                        <option>SQUARE ONE</option>
                        <option>TP1</option>
                      </select>
                    </div>
                </div>
              </CardBody>
            </Card>
            <Card>
              <CardBody>
                <h4 className='card-title'>Order List</h4>
                {order && order.length > 0 ? (
                <Table className='table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Store</th>
                      <th>Model</th>
                      <th>Accessory</th>
                      <th>Qty</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order && orders?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.store}</td>
                        <td>{item.model}</td>
                        <td>{item.cases}</td>
                        <td>{item.quantity}</td>
                        <td>{order[0]?.date}</td>
                        <td>
                          <Button
                            color='danger'
                            className='btn-sm'
                            disabled={item.store !== user.store}
                            onClick={() => removeFromCartOrders(item)}
                          >
                            <i className='bx bxs-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table> ): (
                  <div className='text-center'>
                    <h4>No Orders Found</h4>
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}
const mapStatetoProps = (state) => {
  return {
    order: state.orders.orders,
    user: state.users.user
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(OrdersList)));