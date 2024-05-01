// Cases.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Row, Col, Toast,
  ToastHeader,
  ToastBody, } from 'reactstrap';
import TealData from './TealData.jsx';
import SalesSummary from './SalesSummary';
import TodaysSales from './TodaysSales';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { db } from '../../helpers/firebase';
import { collection, getDocs, where, query, doc, updateDoc, addDoc } from 'firebase/firestore';
const Teal = () => {
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState('')
  const [isSendSummary, setIsSendSummary] = useState(false)
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));
  const toggleToast = () => {
      setToast(!toast);
  };

  const [data, setData] = useState({
    store: '',
    tealData: { storeCash: 0,
      hundred: 0,
      fifty: 0,
      twenty: 0,
      ten: 0,
      five: 0,
      two: 0,
      one: 0,
      twentyFiveCents: 0,
      tenCents: 0,
      fiveCents: 0,},
    salesSummary: {  
      cash: '',
      card: '',
      itemsSold: '',
      phones: '',
      repairs: '',
      expenses: '',
      expensesList: '',
      repairsList:'',
    },
    todaysItems: [],
    employees: []
  });
console.log(data.repairsList)
  const user = useSelector((state) => state.users.user);

  const fetchData = useCallback(async (date = moment().format('DD-MM-YYYY')) => {
    setData((prevData) => ({
        ...prevData,
        store: user.store
      }));
      const employeeCollectionRef = collection(db, 'employees');
      const employeeData = await getDocs(employeeCollectionRef);
      const employees = employeeData.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const productCollectionRef = collection(db, 'products');
      const today = moment().format('DD-MM-YYYY');
      const soldQuery = query(productCollectionRef, where('soldDate', '==', date), where('store', '==', user.store));
      const productData = await getDocs(soldQuery);
      const todaysItems = productData.docs.map(doc => ({ id: doc.id,paymentMethod: 'Payment', ...doc.data() }));

      const tealAmountCollectionRef = collection(db, 'teal')
      const tealQuery = query(tealAmountCollectionRef, where('store', '==', user.store));
      const tealAmount = await getDocs(tealQuery);
      const tealData = tealAmount.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]
      const saleSummaryCollectionRef = collection(db, 'salessummary')
      const salesSummaryQuery = query(saleSummaryCollectionRef, where('date', '==', date));
      const salesSummaryDocs = await getDocs(salesSummaryQuery);
      const saleSumaryData = salesSummaryDocs.docs.map(doc => ({ id: doc.id, ...doc.data()}));
      if (!salesSummaryDocs.empty) {
        const salesSummaryData = salesSummaryDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const storeSalesSummary = salesSummaryData.find(summary => summary[user.store]);
        if (storeSalesSummary) {
          // Update the state to hold the sales summary for the current store
          setData((prevData) => ({
            ...prevData,
            salesSummary: storeSalesSummary[user.store]
          }));
        }
      } else {
        // Handle the case when there is no document for the selected date
        // Possibly reset the salesSummary or handle it accordingly
        setData((prevData) => ({
          ...prevData,
          salesSummary: { // reset to default values or handle as needed
            cash: '',
            card: '',
            itemsSold: '',
            phones: '',
            repairs: '',
            expenses: '',
            expensesList: '',
            repairsList: ''
          }
        }));
      }
      setData((prevData) => ({
        ...prevData,
        employees,
        todaysItems,
        tealData,
      }));

  }, [user.store]);

  const handleDateChange = useCallback((newDate) => {
    setSelectedDate(newDate);
    fetchData(newDate); // Fetch data for the new date
  }, [fetchData]);

  useEffect(() => {
    // Call fetchData when the component mounts or when the user.store changes
    fetchData(selectedDate);
  }, [fetchData, selectedDate, user.store]);

  const handleSendEmail = async (emailParams) => {
    const emailData = {
      service_id: 'service_n40uhpq',
      template_id: 'template_tofrxi8',
      user_id: '5sfIq1TVWP4_TTBTJ',
      template_params: emailParams,
      // accessToken: 'L6VH2h1HOUlaq5NEji8Jy', // Uncomment if you need to use the Private Key
    }
  
    try {
      const response = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        JSON.stringify(emailData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (response.status === 200) {
        console.log('Email sent successfully');
      }
    } catch (error) {
      console.error('Failed to send email', error);
    }
  };

  const handleTealDataChange = useCallback((newTealData) => {
    setData((prevData) => ({
      ...prevData,
      tealData: newTealData
    }));
  }, []);

  const handleSalesSummaryChange = useCallback((newSalesSummary) => {
    setData((prevData) => ({
      ...prevData,
      salesSummary: newSalesSummary
    }));
  }, []);

  const handleTodaysItemsRemove = useCallback((itemId) => {
    setData((prevData) => ({
      ...prevData,
      todaysItems: prevData.todaysItems.filter((item) => item.id !== itemId)
    }));
  }, []);

  const handlePaymentMethodChange = useCallback((itemId, paymentMethod) => {
    setData((prevData) => ({
      ...prevData,
      todaysItems: prevData.todaysItems.map((item) => 
        item.id === itemId ? { ...item, paymentMethod } : item
      )
    }));
  }, []);

  const handleSave = useCallback(async () => {
    const updatedTealData = {
      ...data.tealData,
      date: new Date().toLocaleDateString(),
    }
    try {
      const tealCollectionRef = collection(db, 'teal');
      const userDoc = doc(tealCollectionRef, data.tealData.id);
      updateDoc(userDoc, updatedTealData);
      setMessage('Till Updated Successfully!');
      setToast(true); // Show the toast
      // Set a timer to hide the toast after 3 seconds
      setTimeout(() => {
        setToast(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error('Error adding document: ', error);
      setMessage('Error updating till!'); // Set an error message
      setToast(true); // Show the toast
      // Set a timer to hide the toast after 3 seconds even on error
      setTimeout(() => {
        setToast(false);
        setMessage('')
      }, 3000);
    }
  }, [data.tealData, data.tealData.id]);

  const handleSendSalesEmail = useCallback( async () => {
    try {
      // const tealCollectionRef = collection(db, 'teal');
      // const userDoc = doc(tealCollectionRef, data.tealData.id);
      // updateDoc(userDoc, updatedTealData);
      setMessage('Report sent successfully!');

      const formattedExpensesList = data.salesSummary.expensesList
      .split('\n')
      .map((line) => `          ${line}`)
      .join('\n');
 
      const formattedItemsList = data.todaysItems.map((item) => 
      `          CAD $ ${item.soldPrice}  -  ${item.model} (${item.condition})  -  ${item.color}`
    ).join('\n');

      setToast(true); // Show the toast
  
      // Format the sales summary message
    const formattedSalesSummary = `
              ${user.store}
            ${selectedDate}
          Sales Summary
    - Cash: ${parseFloat(data.salesSummary.cash).toFixed(2)}
    - Card: ${parseFloat(data.salesSummary.card).toFixed(2)}
    - Total: ${(
      parseFloat(data.salesSummary.cash) + parseFloat(data.salesSummary.card)
    ).toFixed(2)}
    - Items Sold: ${data.salesSummary.itemsSold}
    - Phones: ${data.salesSummary.phones}
    - Repairs: ${data.salesSummary.repairs}
    - Expenses: ${parseFloat(data.salesSummary.expenses).toFixed(2)}
    - Remarks: \n ${formattedExpensesList}git commit -m "Updated sales summary and added email updates feature"git commit -m "Updated sales summary and added email updates feature"git commit -m "Updated sales summary and added email updates feature"
    - Items Sold List: \n${formattedItemsList}
  `

    console.log(formattedSalesSummary)

      const emailParams = {
        // Define your template params here
        // example:
        store: user.store,
        date: selectedDate,
        message: formattedSalesSummary,
      };
      console.log(emailParams)
      await handleSendEmail(emailParams);
      handleSendEmailToggle()
  
      // Set a timer to hide the toast after 3 seconds
      setTimeout(() => {
        setToast(false);
      }, 3000); // 3000 milliseconds = 3 seconds
    } catch (error) {
      console.error('Error adding document: ', error);
      // setMessage('Error updating till!'); // Set an error message
      setToast(true); // Show the toast
      // Set a timer to hide the toast after 3 seconds even on error
      setTimeout(() => {
        setToast(false);
        setMessage('');
      }, 3000);
    }
  }, [data.tealData, data.tealData.id, data.salesSummary, selectedDate, user.store]);
  
  const handleSaveSalesSummary = useCallback(async () => {
    const salesSummaryCollectionRef = collection(db, 'salessummary');
    const date = moment().format('DD-MM-YYYY');
    // Create a query to find documents with the selected date
    const q = query(salesSummaryCollectionRef, where('date', '==', date));
    
    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // If there is no document for the selected date, create a new one
        const newDocData = {
          date: date,
          [user.store]: data.salesSummary
        };
        await addDoc(salesSummaryCollectionRef, newDocData);
      } else {
        // If there is a document, update only the current store's data
        const docRef = querySnapshot.docs[0].ref;
        const existingData = querySnapshot.docs[0].data();
        const updatedStoreData = {
          ...existingData,
          [user.store]: data.salesSummary // Update only the current store's data
        };
        await updateDoc(docRef, updatedStoreData);
      }
      setMessage('Data saved successfully!');
    } catch (error) {
      console.error('Error saving data: ', error);
      setMessage('Data not saved!');
    }
    
    setToast(true);
    setTimeout(() => {
      setToast(false);
      setMessage('');
    }, 3000);
  }, [data.salesSummary, selectedDate, user.store]);
  
  const handleSendEmailToggle = () => {
    setIsSendSummary(true)
  }

  const handlePrint = useCallback(() => {
    // Implement print functionality here
  }, [data]);

  return (
    <div className='page-content'>
      <Row>
        <Col lg={4}>
          <TodaysSales
            items={data.todaysItems}
            onItemRemove={handleTodaysItemsRemove}
            summary={data.salesSummary}
            onSummaryChange={handleSalesSummaryChange}
            onPaymentMethodChange={handlePaymentMethodChange}
            onDateChange={handleDateChange}
            onSave = {handleSaveSalesSummary}
            onSendEmail = {handleSendSalesEmail}
          />
        </Col>
        <Col lg={4}>
          <SalesSummary
            todaysItems={data.todaysItems}
            summary={data.salesSummary}
            onSummaryChange={handleSalesSummaryChange}
            onPrint={handlePrint}
            store = {user?.store}
            isSendSummary = {isSendSummary}
          />
        </Col>
        <Col lg={4}>
          <TealData
            tealData={data.tealData}
            onTealDataChange={handleTealDataChange}
            onSave={handleSave}
          />
        </Col>
      </Row>
      <div aria-live="polite" aria-atomic="true">
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
    </div>
  );
};

export default Teal;
