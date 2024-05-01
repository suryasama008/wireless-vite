import React, { useState, useEffect, useRef } from 'react';

import { Row, Col, Input, Button } from 'reactstrap';
//Firebase
import { auth, db } from '../../../helpers/firebase'
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
import Barcode from './Barcode'
import { useReactToPrint } from 'react-to-print'

import Select from "react-select";

const ProductAddForm = ({product, setProduct, user, imeis, setIMEIs}) => {

  const [modelOptions, setModelOptions] = useState([])
  const [selectedGroup, setselectedGroup] = useState('');
  const componentRef = useRef()
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup);
  }

  const modelCollectionRef = collection(db, 'models')

  const getModels = async () => {
    const data = await getDocs(modelCollectionRef)
    let models = []
    data.docs.map((doc) => {
      const temp = { ...doc.data(), id: doc.id }
      models.push(temp)
    })
    setModelOptions(models[0].models)
    return models
  }

  useEffect(() => {
    getModels()
    const unsubscribe = () => {
      getModels()
    }
    return unsubscribe
  
  }, [])

  console.log(product)

  const handleAddIMEI = () => {
    setIMEIs([...imeis, '']);
  };

  const handleIMEIChange = (imei, index) => {
    const newIMEIs = [...imeis];
    newIMEIs[index] = imei.toUpperCase();
    setIMEIs(newIMEIs);
  };

  const handleRemoveIMEI = (index) => {
    const newIMEIs = [...imeis];
    newIMEIs.splice(index, 1);
    setIMEIs(newIMEIs);
  };

  const printLabel = (imei) => {
    // setPrintImei(imei)
    setTimeout(() => {
    handlePrint()
    }, 400)
}
const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })
  const renderInput = (key, value) => {
    switch (key) {
      case 'brand':
        return (
          <select value={product?.brand || ''}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            className='form-select'>
            <option>APPLE</option>
            <option>SAMSUNG</option>
            <option>GOOGLE</option>
            <option>ZTE</option>
            <option>ALCATEL</option>
            <option>OTHER</option>
          </select>
        );
      case 'category':
        return (
          <select value={product?.category || ''}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
            className='form-select'>
            <option>MOBILES</option>
            <option>ACCESSORIES</option>
            <option>TABLET</option>
          </select>
        );
      case 'model':
        return (
          <Select
            value={selectedGroup}
            onChange={(e) => {
              handleSelectGroup(e);
              setProduct({ ...product, model: e.value })
            }}
            options={modelOptions}
            className="select2-selection" />
        );
      case 'storage':
        return (
            <select value={product?.storage || ''}
                onChange={(e)=>{ setProduct({ ...product, storage: e.target.value }) } }
                className='form-select'
                >
                <option value = 'N/A'>Select Storage</option>
                <option>16 GB</option>
                <option>32 GB</option>
                <option>64 GB</option>
                <option>128 GB</option>
                <option>256 GB</option>
                <option>512 GB</option>
                <option>OTHER</option>
            </select>
        );
      case 'condition':
        return (
            <select value={product?.condition || ''}
                onChange={(e)=>{ setProduct({ ...product, condition: e.target.value }) } }
                className='form-select'
                >
                <option value = ''>Select Condition</option>
                <option>NEW</option>
                <option>USED</option>
            </select>
        );
      default:
        return (
          <Input
            className="form-control"
            type="text"
            placeholder={key}
            name={key}
            value={value}
            onChange={handleChange} />
        );
    }
  };


//   {
    // "price": "800",
    // "taxIn": true,
    // "contact": "",
    // "remarks": "",
    // "category": "Mobiles",
    // "createdAt": "",
    // "color": "Blue",
    // "imei": "353742333790756",
    // "soldRemarks": "",
    // "status": "IN STOCK",
    // "soldDate": "08-08-2023",
    // "soldPrice": "1067.96",
    // "updatedAt": "Mon Dec 11 2023",
    // "supplier": "RAMAN TBBOTH ",
    // "id": "ZoCnp56UvzeTNdF5UPAZ",
//     "battery": "91",
//     "model": "IPHONE 13 PRO",
//     "store": "BCC LL",
//     "updatedBy": "HAFIZ",
//     "sellingPrice": "949.99",
//     "storage": "128 GB",
//     "condition": "USED",
//     "brand": "APPLE"
// }
useEffect(() => { 
    if (product?.model) {
      setselectedGroup({ label: product.model, value: product.model })
    }
  }, [product])
  
  return (
    <div>
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Store</label>
          <div className="col-md-6 pt-2 mx-2">
            {user.store}
          </div>
          </Row>
          <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Category</label>
          <div className="col-md-6">
          <select value={product?.category || ''}
                onChange={(e) => setProduct({ ...product, category: e.target.value })} 
                name = 'category'
                className='form-select'
                >
                <option>MOBILES</option>
                <option>ACCESSORIES</option>
                <option>TABLET</option>
            </select>
          </div>
        </Row>
        {/* Brand */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Brand</label>
          <div className="col-md-6">
          <select value={product?.brand || ''}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
            className='form-select'>
            <option>APPLE</option>
            <option>SAMSUNG</option>
            <option>GOOGLE</option>
            <option>ZTE</option>
            <option>ALCATEL</option>
            <option>OTHER</option>
          </select>
          </div>
        </Row>
        {/* model */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Model</label>
          <div className="col-md-6">
          <Select
                value={selectedGroup}
                onChange={(e) => {
                    handleSelectGroup(e);
                    setProduct({ ...product, model: e.value })
                }}
                options={modelOptions}
                className="select2-selection"
                />
          </div>
        </Row>
        <div style={{ borderBottom: '2px solid #D3D3D3', color:'#808080'}} className = 'mb-4 mt-2 '>
        </div>
        {/* condition  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Condition</label>
          <div className="col-md-6">
          <select value={product?.condition || ''}
                onChange={(e)=>{ setProduct({ ...product, condition: e.target.value }) } }
                className='form-select'
                >
                <option>Select Condition</option>
                <option>NEW</option>
                <option>USED</option>
            </select>
          </div>
        </Row>
        {/* storage  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Storage</label>
          <div className="col-md-6">
            <select value={product?.storage || ''}
                onChange={(e)=>{ setProduct({ ...product, storage: e.target.value }) } }
                className='form-select'
                >
                <option value = ''>Select Storage</option>
                <option>16 GB</option>
                <option>32 GB</option>
                <option>64 GB</option>
                <option>128 GB</option>
                <option>256 GB</option>
                <option>512 GB</option>
                <option>OTHER</option>
            </select>
          </div>
        </Row>
          {/* color  */}
          <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Color</label>
          <div className="col-md-6">
          <input
            className='form-control'
            type='text'
            placeholder='Enter Color'
            value={product?.color || ''}
            onChange={(e)=>{ setProduct({ ...product, color: e.target.value }) } }
            />
          </div>
        </Row>
        {/* battery  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Battery</label>
          <div className="col-md-6">
          <input
                className='form-control'
                type='number'
                placeholder='Battery'
                value={product?.battery || ''}
                // disabled={product?.condition === 'NEW' || product?.category === 'Accessories'}
                onChange={ (e) => setProduct({ ...product, battery: e.target.value }) }
                />
          </div>
        </Row>
        <div style={{ borderBottom: '2px solid #D3D3D3', color:'#808080'}} className = 'mb-4 mt-2 '>
        </div>
        {/* cost price  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Cost Price</label>
          <div className="col-md-6">
          <input
            className='form-control'
            type='number'
            placeholder='Price'
            value={product?.price || ''}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
          </div>
        </Row>
        {/* Selling Price  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Selling Price</label>
          <div className="col-md-6">
          <input
            className='form-control'
            type='text'
            placeholder='Selling Price'
            value={product?.sellingPrice || ''}
            onChange={(e) => setProduct({ ...product, sellingPrice: e.target.value })}
            />
          </div>
        </Row>
        {/* supplier  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Supplier</label>
          <div className="col-md-6">
          <input
            className='form-control'
            type='text'
            placeholder='Supplier name'
            value={product?.supplier || ''}
            onChange={(e) => setProduct({ ...product, supplier: e.target.value })}
            />
          </div>
        </Row>
        {/* contact  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Contact</label>
          <div className="col-md-6">
          <input
                className='form-control'
                placeholder='Contact'
                value={product?.contact || ''}
                onChange={(e) => setProduct({ ...product, contact: e.target.value })}
            />
          </div>
        </Row>
        {/* message  */}
        <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Message</label>
          <div className="col-md-6">
          <input
                // type="textarea"
                id="formmessage"
                className="form-control"
                value={product?.remarks || ''}
                onChange= {(e) => setProduct({ ...product, remarks: e.target.value })}
                placeholder="Enter your Message"
            />
          </div>
        </Row>
        {/* imei  */}
        {product.id ? <Row className="mb-3">
          <label className="col-md-3 col-form-label mx-4">Imei</label>
          <div className="col-md-6">
          <input
                // type="textarea"
                id="formmessage"
                className="form-control"
                value={product?.imei || ''}
                onChange= {(e) => setProduct({ ...product, imei: e.target.value })}
                placeholder="Enter your IEMI"
            />
          </div>
        </Row>
        : <></>}
        <div style={{ borderBottom: '2px solid #D3D3D3', color:'#808080'}} className = 'mb-4 mt-2 '>
        </div>
       {product.id ? <></> : <div>
        <Row className='mx-3'>
        {imeis.map((imei, index) => (
              <Row key={index} className='mb-2'>
                <Col md='10'>
                  <Input
                    type='text'
                    className='form-control'
                    placeholder='Enter IMEI/Serial No'
                    value={imei}
                    onChange={(e) => handleIMEIChange(e.target.value, index)}
                  />
                </Col>
                <Col md='2'>
                  <Button color='danger' onClick={() => handleRemoveIMEI(index)}>
                    <i className='bx bx-trash' />
                  </Button>
                </Col>
              </Row>
            ))}
        </Row>

            <Button className='mx-4' color='success' onClick={handleAddIMEI}>
              <i className='bx bx-plus-medical' />
            </Button>
            </div>
}
    </div>
  );
};

export default ProductAddForm;
