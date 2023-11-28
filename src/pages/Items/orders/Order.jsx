import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, CardBody, CardTitle , Button} from 'reactstrap';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { db } from '../../../helpers/firebase';
import { collection, getDocs, where, query, doc, updateDoc, addDoc } from 'firebase/firestore';

import moment from 'moment';

// import { cases } from '../../../constants/models.js';
import {
    fetchOrders as onFetchOrders,
    addNewOrders as onAddNewOrder,
    updateOrders as onUpdateOrder,
    deleteOrders as onDeleteOrder,
  } from '/src/store/actions'
const Order = () => {
    const [cartItems, setCartItems] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [cases, setCases] = useState([])
    const [model, setModel] = useState('');
    const [orders, setOrders] = useState([])
    const [modelOptions, setModelOptions] = useState([]);
    const [quantities, setQuantities] = useState({});
  const [selectedDate, setSelectedDate] = useState(moment().format('DD-MM-YYYY'));

    const dispatch = useDispatch()
    const user = useSelector((state) => state.users.user);
    const modelCollectionRef = collection(db, 'models');
    const orderCollectionRef = collection(db, 'orders1')
    useEffect(() => {
        const fetchModels = async () => {
            const data = await getDocs(modelCollectionRef);
            const models = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            
            let optionsMeetingCriteria = [];
            const filteredModels = models[0].models.filter(model => 
                model.label.toLowerCase().startsWith('a') || model.label.toLowerCase().startsWith('s')
            );

            filteredModels.forEach(model => {
                model.options.forEach(option => {
                    if (option.label.includes("IPHONE") || option.label.toLowerCase().startsWith('s') || option.label.toLowerCase().startsWith('a')) {
                        optionsMeetingCriteria.push(option);
                    }
                });
            });
    
                        // Sort the options
                        optionsMeetingCriteria.sort((b, a) => a.label.localeCompare(b.label));
    
                        // Log sorted options
                        optionsMeetingCriteria.forEach(option => console.log(option.label));
    
            setModelOptions(filteredModels);
            // setModelOptions(models[0].models);
            const caseItems = models[0].models.filter((item) => item.label === 'CASES')[0]
            const caseOptions = caseItems.options.map((item) => {
                return item.label
            })
            setCases(caseOptions)
        };

        const fetchOrders = async () => {
            const date = moment().format('DD-MM-YYYY')
            const ordersQuery = query(orderCollectionRef, where('date', '==', date));
            const data = await getDocs(ordersQuery);
            const orders = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setOrders(orders)
        }
        fetchModels();
        fetchOrders()
        
    }, [selectedDate]);
    
console.log(orders)

const handleSendEmail = async (emailParams) => {
    const emailData = {
      service_id: 'service_n40uhpq',
      template_id: 'template_tofrxi8',
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
    }
  };


    useEffect(() => {
        const newQuantities = cases.reduce((quantities, caseItem) => {
            const cartItem = cartItems.find(item => item.id === `${model}_${caseItem}`);
            quantities[`${model}_${caseItem}`] = cartItem ? cartItem.qty.toString() : ''; // Use an existing qty or set to default
            return quantities;
        }, {});
    
        setQuantities(newQuantities);
    }, [model, cases, cartItems]); // Depend on model, cases, and cartItems
    

    const handleModelClick = (modelValue) => {
        setModel(modelValue);
        setSelectedModel(modelValue);
    };

    const updateOrCreateCartItem = (caseItem, quantity, isSelected = true) => {
        const itemId = `${model}_${caseItem}`;
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === itemId);
            if (existingItemIndex >= 0) {
                let updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = { ...updatedItems[existingItemIndex], qty: isNaN(quantity) ? '' : quantity.toString(), isSelected };
                return updatedItems;
            } else {
                return [...prevItems, { id: itemId, model, case: caseItem, qty: isNaN(quantity) ? '' : quantity.toString(), isSelected }];
            }
        });
    };

    const handleQuantityChange = (caseItem, newQuantity) => {
        const newQuantities = { ...quantities, [`${model}_${caseItem}`]: newQuantity };
        setQuantities(newQuantities);
        // If the item is already in the cart, update its quantity
        if (cartItems.some(item => item.id === `${model}_${caseItem}`)) {
            updateOrCreateCartItem(caseItem, parseInt(newQuantity, 10));
        }
    };

    const handleAddRemoveItem = (caseItem, isAdding) => {
        if(model === '') return
        const itemId = `${model}_${caseItem}`;
        const quantity = quantities[itemId] || 1;
        if (isAdding) {
            updateOrCreateCartItem(caseItem, parseInt(quantity, 10));
        } else {
            setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        }
    };

  const getQuantity = (caseItem) => {
    const quantity = quantities[`${model}_${caseItem}`];
    return isNaN(quantity) ? '' : quantity.toString();
};
    

const handlePlaceOrder = async () => {
    if (orders.length === 0) {
        // There are no existing orders, create a new one
        const newOrder = {
            date: selectedDate,
            [user.store]: {
                cases: cartItems
            }
        };

        try {
            // Add the new document
            await addDoc(orderCollectionRef, newOrder);
            console.log('New order added successfully');
        } catch (error) {
            console.error('Error adding new order: ', error);
        }
    } else {
        // There are existing orders, update the existing one
        const docRef = doc(db, 'orders1', orders[0].id);

        // Preparing the updated data
        const updatedOrders = {
            ...orders[0],
            [user.store]: {
                ...orders[0][user.store],
                cases: [...(orders[0][user.store]?.cases || []), ...cartItems]
            }
        };

        try {
            // Update the document
            await updateDoc(docRef, updatedOrders);
            console.log('Order updated successfully');
        } catch (error) {
            console.error('Error updating order: ', error);
        }
    }
};



    return (
        <div className='page-content'>
            <div className='container-fluid' style={{ maxHeight: '80vh', overflowY: 'auto', scrollbarWidth: 'none', cursor: "pointer" }}>
                <div className='text-end py-3'>
                <Button color='primary'  onClick = {handlePlaceOrder} >Place Order</Button>
                </div>
                {model === '' && <p style = {{color:'red'}}>***please Select Model***</p>}
                <Row>
                <Col lg={2} >
            <Card className='mb-2'>
    <CardTitle className='mb-0 p-3 border-bottom bg-light'>
      <h5 className='mb-0'>Models</h5>
    </CardTitle>
    <CardBody>
        <div style={{ maxHeight: '70vh',overflowY: 'auto', 
            scrollbarWidth: 'none', cursor: "pointer" }}>{modelOptions.map((brand, brandIndex) => (
        <div key={brandIndex}>
          <h4>{brand.label}</h4>
          {brand.options.map((option, optionIndex) => (
            <div key={optionIndex} onClick={() => handleModelClick(option.value)} className='p-2' style={{ borderBottom: "1px solid black", 
            backgroundColor: selectedModel === option.value ? '#556ee5' : 'transparent', color: selectedModel === option.value ? 'white' : 'black' }}>
                {option.value}
            </div>
          ))}
        </div>
        ))}
        </div>
            </CardBody>
       </Card>
       </Col>
       <Col lg={5}>
       <Card className='mb-2'>
    <CardTitle className='mb-0 p-3 border-bottom bg-light'>
      <h5 className='mb-0'>Cases / Accessories</h5>
    </CardTitle>
    <CardBody>
        <div className="" style={{ maxHeight: '70vh',overflowY: 'auto', 
            scrollbarWidth: 'none', cursor: "pointer" }}>
                <h5>model : {model}</h5>
            {cases.map((caseItem, index) => (
            <div key={index} className=' py-2' style = {{borderBottom: "1px solid black"}}>
                <Row>
                <Col lg={8}>
                <div>{caseItem}</div>
                </Col>
                <Col ld={2}>
                <input 
                        type="text" 
                        className='form-control'
                        value={getQuantity(caseItem) || ''}
                        placeholder='1'
                        min={1} 
                        onChange={(e) => handleQuantityChange(caseItem, e.target.value)}
                    />
                </Col>
                <Col ld={2}>
                <button 
                        className='btn btn-icon'
                        onClick={() => handleAddRemoveItem(caseItem, !cartItems.some(item => item.id === `${model}_${caseItem}`))}
                    >
                    {cartItems.some(item => item.id === `${model}_${caseItem}`) ? 
                        <i className='bx bx-trash' style={{ color: 'red', fontSize: '1.5em' }}></i> : 
                        <i className='bx bx-plus' style={{ color: 'green', fontSize: '1.5em' }}></i> 
                    }
                </button>
                </Col>
                </Row>
            </div>
          ))}
          </div>
    </CardBody>
    </Card>
       </Col>
                    <Col lg={5}>
                        <Card className='mb-2'>
                            <CardTitle className='mb-0 p-3 border-bottom bg-light'>
                                <h5 className='mb-0'>Cart Items</h5>
                            </CardTitle>
                            <CardBody>
                                <div style={{ maxHeight: '70vh',overflowY: 'auto', 
                                     scrollbarWidth: 'none', cursor: "pointer" }}>
                                {cartItems.map((item, index) => (
                                    <div key={item.id} className='py-2' style={{ borderBottom: "1px solid black" }}>
                                        <Row>
                                            <Col lg={2}> {index + 1}</Col>
                                            <Col lg={4}>{item.model}</Col>
                                            <Col lg={4}>{item.case}</Col>
                                            <Col lg={2}>{item.qty}</Col>
                                        </Row>
                                    </div>
                                ))}
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Order;
