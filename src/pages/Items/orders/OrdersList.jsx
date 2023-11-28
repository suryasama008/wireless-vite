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
import { Button, Row, Col, Card, CardBody, InputGroup,Table, Toast,
  ToastHeader,
  ToastBody, } from 'reactstrap'
import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/material_blue.css'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../helpers/firebase';
import moment from 'moment';
import axios from 'axios';

import ModelDisplay from './ModelDisplay'

const OrdersList = ({ order, user }) => {
  const [store, setStore] = useState('')
    const [toast, setToast] = useState(false);
  const [message, setMessage] = useState('')

  const [orders, setOrders] = useState([])
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'))
  const [showTotals, setShowTotals] = useState(false);

 /**
  * The function formatDate formats a given date into a string with the format "dd/mm/yyyy", and the
  * code sets the initial state of selectedDate to today's date in that format using the useState hook.
  * @returns The `formatDate` function returns a formatted date string in the format of "DD/MM/YYYY".
  * The `today` variable is assigned the current date in the formatted string format. The `useState`
  * hook initializes the `selectedDate` state variable with the value of `today`.
  */
 

 const orderCollectionRef = collection(db, 'orders1');
 useEffect(() => {
    const fetchOrders = async ( ) => {
            const date = moment().format('DD-MM-YYYY')
            const ordersQuery = query(orderCollectionRef, where('date', '==', selectedDate));
            const data = await getDocs(ordersQuery);
            const orders = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            console.log(orders)
            setOrders(orders)
        }
        fetchOrders()
}, [selectedDate]);
 useEffect(() => {
  setStore(user.store)
}, [user])

/* This code block is using the `useDispatch` hook from the `react-redux` library to get a reference to
the `dispatch` function, which is used to dispatch actions to the Redux store. */


  const handleDateChange = (selectedDates) => {
    // selectedDates is an array, we use the first item
    const formattedDate = moment(selectedDates[0]).format('DD-MM-YYYY');
    console.log(formattedDate);
    setSelectedDate(formattedDate); // Update the selected date state
    // If you need to dispatch to Redux
    // dispatch(onFetchOrders(formattedDate));
};


  const removeFromCartOrders = (itemToRemove) => {
    // Assuming 'orders' is your state that contains all orders
    // and you're updating the first order in the array
    const updatedCases = orders[0][user.store].cases.filter(item => item.id !== itemToRemove.id);

    const updatedOrder = {
        ...orders[0],
        [user.store]: {
            ...orders[0][user.store],
            cases: updatedCases
        }
    };

    // Now you need to update this order in Firebase
    const orderDocRef = doc(db, 'orders1', orders[0].id); // Adjust with your collection name and order ID

    updateDoc(orderDocRef, updatedOrder)
        .then(() => {
            console.log("Order updated successfully");

            // Update the state to reflect the change
            const updatedOrders = [...orders];
            updatedOrders[0] = updatedOrder;
            setOrders(updatedOrders); // Assuming setOrders is your state update function
        })
        .catch(error => {
            console.error("Error updating order: ", error);
        });
};

const handleSendEmail = async () => {

        const htmlTable = createHtmlTable(orders);

        const date = moment().format('DD-MM-YYYY')
        const emailParams = {
            date: date,
            htmlContent: htmlTable,
        }
        const emailData = {
          service_id: 'service_n40uhpq',
          template_id: 'template_uhndxsr',
          user_id: 'u9HKukohg-tvqGoxg',
          template_params: emailParams,
          // accessToken: 'YOUR_PRIVATE_KEY', // Uncomment if you need to use the Private Key
        };
      
        try {
          const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', JSON.stringify(emailData), {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.status === 200) {
            console.log('Email sent successfully');
          }
        } catch (error) {
          console.error('Failed to send email', error);
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        setMessage('Report sent successfully!');
         setToast(true);
        setTimeout(() => {
          setToast(false);
          setMessage('');
        }, 3000);
      };

const createHtmlTable = (orders) => {
    let htmlContent = '<table style="width:100%; border-collapse: collapse;">';
    
    // Extracting all store names
    let stores = new Set();
    orders.forEach(order => {
        Object.keys(order).forEach(store => {
            if (store !== 'date' && store !== 'id' && store !== 'remarks') {
                stores.add(store);
            }
        });
    });

    stores.forEach(store => {
        htmlContent += `<tr><th colspan="2" style="text-align: left; border-bottom: 1px solid #ddd; padding-left: 10px; font-weight: bold;">${store}</th></tr>`;

        let caseTypes = new Set();
        // Gather case types for each store
        orders.forEach(order => {
            if (order[store]) {
                order[store].cases.forEach(item => {
                    caseTypes.add(item.case);
                });
            }
        });

        caseTypes.forEach(caseType => {
            htmlContent += `<tr><td colspan="2" style="text-align: left; padding-left: 30px; padding-top:20px; font-weight: bold;">${caseType}</td></tr>`;

            orders.forEach(order => {
                if (order[store]) {
                    order[store].cases.filter(item => item.case === caseType).forEach(item => {
                        const capitalizedModel = capitalizeFirstLetter(item.model);
                        htmlContent += `<tr>
                                            <td style="padding-left: 50px; padding-top:10px">${capitalizedModel}</td>
                                            <td>${item.qty}</td>
                                        </tr>`;
                    });
                }
            });
        });

        // Space after each store
        htmlContent += `<tr><td colspan="2" style="height: 20px;"></td></tr>`;
    });

    htmlContent += '</table>';
    return htmlContent;
};

const capitalizeFirstLetter = (string) => {
    return string.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};


  

  return (
    <div className='page-content'>
      <div className='container-fluid'>
        <Breadcrumbs title={store} breadcrumbItem='Order List' />
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
                          altFormat: 'd-m-Y',
                          dateFormat: 'd-m-Y',
                        }}
                      />
                    </InputGroup>
                  </div>
                    <div>
                    <Button color='primary mx-2' onClick={handleSendEmail}>
                        Send Order
                    </Button>

                    </div>
                </div>
              </CardBody>
            </Card>
            <div className='text-end'> 
            <Toast 
            isOpen={toast}
        className="align-items-center text-white bg-primary border-0"
            role="alert"
            >
            <div className="d-flex">
                <ToastBody>
                    {message}
                </ToastBody>
                <button onClick={() => setToast(false)} type="button" className="btn-close btn-close-white me-2 m-auto"
                ></button>
            </div>
        </Toast>
        </div>
              <ModelDisplay orders = {orders} userStore={user.store} showTotals= {showTotals}/>
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