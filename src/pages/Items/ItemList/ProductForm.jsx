import React, { useState, useEffect, useRef } from 'react'
import {
  Col,
  Input,
  Row,
  UncontrolledTooltip,
  Card,
  CardHeader,
  CardBody,
  Button,
  Label,
  Form,
  Table,
  CardTitle,
} from 'reactstrap'
import Select from 'react-select'
import * as Yup from 'yup'
import { useFormik } from 'formik'

import { useSelector, useDispatch } from 'react-redux'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
  getModels as onGetModels,
  updateModels as onUpdateModels,
  getUsersData,
} from '../../../store/actions'

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
  orderBy,
} from 'firebase/firestore'
import moment from 'moment'

//Print Label
import Barcode from './Barcode'
import { useReactToPrint } from 'react-to-print'

// import {modelOptions} from '../../../constants/modelOptions'

import { getCurrentUser } from '../../../helpers/AuthContext'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { add } from 'lodash'
const ProductForm = ({ id }) => {
  const [addProducts, setAddProducts] = useState([{}])
  const [empId, setEmpId] = useState('')
  const [employeeName, setEmployeeName] = useState('')
  const [model, setModel] = useState(null)
  const [modelOptions, setModelOptions] = useState([])
  const dispatch = useDispatch()
  const [showLabelPrint, setShowLabelPrint] = useState(true)
  const [printImei, setPrintImei] = useState('')
  const [selectedGroup, setselectedGroup] = useState('')
  const [store, setStore] = useState('')
  const user = useSelector((state) => state.users.user)
  const componentRef = useRef()
  const [product, setProduct] = useState({
    store: store,
    brand: 'APPLE',
    category: 'MOBILES',
    model: '',
    color: '',
    storage: '16 GB',
    costPrice: '',
    sellingPrice: '',
    imei: '',
    battery: '',
    status: 'IN STOCK',
    condition: 'NEW',
    supplier: '',
    contact: '',
  })

  useEffect(() => {
    setStore(user.store)
  }, [user])

  const employeeCollectionRef = collection(db, 'employees')
  const modelCollectionRef = collection(db, 'models')

  const getModels = async () => {
    const data = await getDocs(modelCollectionRef)
    var models = []
    data.docs.map((doc) => {
      const temp = { ...doc.data(), id: doc.id }
      models.push(temp)
    })
    setModelOptions(models[0].models)
    return models
  }

  const getProduct = async () => {
    const docRef = doc(db, 'products', id)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      setProduct(docSnap.data())
      setEmpId(docSnap.data().empId)
      setEmployeeName(docSnap.data().empName)
      setModel(docSnap.data().model)
      addProducts[0] = docSnap.data()
    } else {
      console.log('No such document!')
    }
  }

  useEffect(() => {
    getModels()
    if (id) getProduct()
    const unsubscribe = () => {
      getModels()
    }
    return unsubscribe
  }, [])

  // useEffect(() => {
  //   getUsersData(empId)
  // }, [empId])

  useEffect(() => {
    if (product?.model) {
      setselectedGroup({ label: product.model, value: product.model })
    }
  }, [product])

  const handleEmployeeIdChange = async (id) => {
    setProduct({ ...product, empId: id })
    setEmpId(id)
    if (id.length > 2) {
      const empQuery = query(employeeCollectionRef, where('empId', '==', id))
      const data = await getDocs(empQuery)
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      const employeeData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      const employeeName = employeeData[0].name
      setEmployeeName(employeeName)
    }
  }

  function handleAddRowNested() {
    const modifiedRows = [...addProducts]
    modifiedRows.push({ prodId: Math.floor(Math.random() * 1000000000) })
    setAddProducts(modifiedRows)
  }

  function addImei(imei, key, id) {
    const modifiedRows = [...addProducts]
    if (modifiedRows.length === 1) {
      modifiedRows[0] = { ...product, imei: imei, prodId: 1 }
      setAddProducts(modifiedRows)
    }
    modifiedRows[key].imei = imei
    setAddProducts(modifiedRows)
  }

  function handleRemoveRow(id) {
    if (id !== 1) {
      var modifiedRows = [...addProducts]
      modifiedRows = modifiedRows.filter((x) => x['prodId'] !== id)
      setAddProducts(modifiedRows)
    }
  }

  const productCollectionRef = collection(db, 'products')

  const handleUpdate = () => {
    const updatedData = {
      ...product,
      id: id,
      store: store,
      status: 'IN STOCK',
      updatedAt: new Date(),
    }

    console.log(updatedData)
    dispatch(onUpdateItem(updatedData))
    setTimeout(() => {
      dispatch(onGetItems(store))
      alert('Product updated successfully!') // Alert for edit product
    }, 300)
  }

  const handleSubmit = () => {
    addProducts.map((prod) => {
      const updatedData = {
        ...product,
        ...prod,
        store: store,
        createdBy: employeeName,
        createdAt: new Date(),
        updatedAt: new Date(),
        updatedDate: moment().format('DD-MM-YYYY'),
        // model: model ? model : product.model,
      }
      // console.log(updatedData)
      dispatch(onAddNewItem(updatedData))
    })
    setProduct({})
    // }
    setTimeout(() => {
      dispatch(onGetItems(store))
      alert('Product added successfully!') // Alert for add product
      handleClear()
    }, 300)
 
  }

const handleClear = () => {
  setProduct({
    store: '',
    brand: 'APPLE', // Default value
    category: 'MOBILES', // Default value
    model: '',
    color: '',
    storage: '16 GB', // Default value
    costPrice: '',
    sellingPrice: '',
    imei: '',
    battery: '',
    status: 'IN STOCK', // Default value
    condition: 'NEW', // Default value
    supplier: '',
    contact: '',
    remarks: '',
  })
  setAddProducts([{}]) // Resetting additional products list
  alert('All fields have been cleared!')
}

  const handleChangeModel = (selectedOption) => {
    setModel(selectedOption.value)
    setProduct({ ...product, model: selectedOption.value })
  }

  function handleSelectGroup(selectedGroup) {
    setselectedGroup(selectedGroup)
  }
  const handleChange = (e) => {
    var name = e.taget.name
    var value = e.taget.value
    setProduct({
      ...product,
      [name]: value,
    })
  }

  // console.log(product)
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  const optionGroup = [
    {
      label: 'Picnic',
      options: [
        { label: 'Mustard', value: 'Mustard' },
        { label: 'Ketchup', value: 'Ketchup' },
        { label: 'Relish', value: 'Relish' },
      ],
    },
    {
      label: 'Camping',
      options: [
        { label: 'Tent', value: 'Tent' },
        { label: 'Flashlight', value: 'Flashlight' },
        { label: 'Toilet Paper', value: 'Toilet Paper' },
      ],
    },
  ]

  //print label

  const printLabel = (imei) => {
    setPrintImei(imei)
    setTimeout(() => {
      handlePrint()
    }, 400)
    setShowLabelPrint(true)
  }

  return (
    <div className='page-content'>
      <Row>
        <Col lg={4}>
          <Card className='mb-2'>
            <CardTitle className='mb-0 p-3 border-bottom bg-light'>
              <h5 className='mb-0'>Product Details</h5>
            </CardTitle>
            <CardBody>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td className='text-start'>Store</td>
                    <td className='text-start'>{store}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Category</td>
                    <td className='text-start'>{product?.category}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Brand</td>
                    <td className='text-start'>{product?.brand}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Model</td>
                    <td className='text-start'>{product?.model}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Color</td>
                    <td className='text-start'>{product?.color}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Storage</td>
                    <td className='text-start'>{product?.storage}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Condition</td>
                    <td className='text-start'>{product?.condition}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Status</td>
                    <td className='text-start'>{product?.status}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Battery</td>
                    <td className='text-start'>{product?.battery}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>CP</td>
                    <td className='text-start'>{product?.price}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Selling Price</td>
                    <td className='text-start'>{product?.sellingPrice}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Supplier</td>
                    <td className='text-start'>{product?.supplier}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Contact</td>
                    <td className='text-start'>{product?.contact}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>Remarks</td>
                    <td className='text-start'>{product?.remarks}</td>
                  </tr>
                  <tr
                    style={{
                      display: product?.status !== 'SOLD' ? 'none' : '',
                    }}
                  >
                    <td className='text-start'>SellingRemarks</td>
                    <td className='text-start'>{product?.SoldRemarks}</td>
                  </tr>
                  <tr>
                    <td className='text-start'>CreatedBy</td>
                    <td className='text-start'>{employeeName}</td>
                  </tr>
                  {(addProducts || []).map((formRow, key) => (
                    <tr key={key}>
                      <td className='text-start'>IMEI/Serial No {key + 1}</td>
                      <td className='d-flex'>
                        <Col md='10'>{formRow.imei}</Col>
                        <Col md='2'>
                          <Button
                            color='primary'
                            // className='m-4'
                            // disabled = {!sold}
                            onClick={() => {
                              printLabel(formRow.imei)
                            }}
                          >
                            <i className='bx bx-printer '></i>
                          </Button>
                        </Col>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
          {showLabelPrint && (
            <div className='mx-4'>
              <div
                className='m-4'
                style={{ border: '5px solid black', margin: '50px' }}
                ref={componentRef}
              >
                <div className='text-center border border-3'>
                  <div
                    className='text-center black-text'
                    style={{
                      borderBottom: '2px solid black',
                      fontSize: '18px',
                    }}
                  >
                    <b>{product?.model}</b>
                  </div>
                  <div
                    className='text-center black-text'
                    style={{
                      borderBottom: '2px solid black',
                      fontSize: '18px',
                    }}
                  >
                    <b>$ {product?.sellingPrice}</b>
                  </div>
                  <div
                    className='text-center black-text'
                    style={{
                      borderBottom: '2px solid black',
                      fontSize: '18px',
                    }}
                  >
                    <b>
                      {product?.storage} - {product?.condition} -{' '}
                      {product?.battery}%
                    </b>
                  </div>
                  <div className='text-center mt-2'>
                    <Barcode
                      imei={printImei ? printImei : addProducts[0].imei}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Col>
        <Col lg={5}>
          <Card>
            <CardTitle className='mb-0 p-3 border-bottom bg-light'>
              {id ? 'Update Product' : 'Add Product'}
            </CardTitle>
            <CardBody>
              <div>
                <Row>
                  <Col md={6}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-empId-Input'>Employee Id</Label>
                      <input
                        className='form-control'
                        type='number'
                        placeholder='Emp Id'
                        value={empId || ''}
                        // disabled={product?.condition === 'NEW'}
                        onChange={(event) =>
                          handleEmployeeIdChange(event.target.value)
                        }
                      />
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-password-Input'>
                        Employee Name
                      </Label>
                      <input
                        className='form-control'
                        type='Name'
                        placeholder='Name'
                        value={employeeName || ''}
                        disabled={true}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-email-Input'>Category</Label>
                      <select
                        value={product?.category || ''}
                        onChange={(e) =>
                          setProduct({ ...product, category: e.target.value })
                        }
                        name='category'
                        className='form-select'
                      >
                        <option>MOBILES</option>
                        <option>ACCESSORIES</option>
                        <option>TABLET</option>
                      </select>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-password-Input'>Store</Label>
                      <select
                        value={store || ''}
                        onChange={(e) => setStore(e.target.value)}
                        className='form-select'
                      >
                        <option>BCC LL</option>
                        <option>BCC UL</option>
                        <option>EMTC</option>
                        <option>EMTC CART</option>
                        <option>SQUARE ONE</option>
                        <option>TP1</option>
                        <option>TECUMSEH</option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <div
                  style={{
                    borderBottom: '1px solid #D3D3D3',
                    color: '#808080',
                  }}
                  className='mb-4 mt-2 text-center'
                >
                  <div>Product Details</div>
                </div>
                <Row>
                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputCity'>Brand</Label>
                      <select
                        value={product?.brand || ''}
                        onChange={(e) => {
                          setProduct({ ...product, brand: e.target.value })
                        }}
                        className='form-select'
                      >
                        <option>APPLE</option>
                        <option>SAMSUNG</option>
                        <option>GOOGLE</option>
                        <option>ZTE</option>
                        <option>ALCATEL</option>
                        <option>OTHER</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputState'>Model</Label>
                      <Select
                        value={selectedGroup}
                        onChange={(e) => {
                          handleSelectGroup(e)
                          setProduct({ ...product, model: e.value })
                        }}
                        options={modelOptions}
                        className='select2-selection'
                      />
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>Color</Label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Enter Color'
                        value={product?.color || ''}
                        onChange={(e) => {
                          setProduct({ ...product, color: e.target.value })
                        }}
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputCity'> Storage </Label>
                      <select
                        value={product?.storage || ''}
                        onChange={(e) => {
                          setProduct({ ...product, storage: e.target.value })
                        }}
                        className='form-select'
                      >
                        <option>16 GB</option>
                        <option>32 GB</option>
                        <option>64 GB</option>
                        <option>128 GB</option>
                        <option>256 GB</option>
                        <option>512 GB</option>
                        <option>OTHER</option>
                      </select>
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputState'>Condition</Label>
                      <select
                        value={product?.condition || ''}
                        onChange={(e) => {
                          setProduct({ ...product, condition: e.target.value })
                        }}
                        className='form-select'
                      >
                        <option>NEW</option>
                        <option>USED</option>
                      </select>
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>Status</Label>
                      <select
                        value={product?.status || ''}
                        onChange={(e) => {
                          setProduct({ ...product, status: e.target.value })
                        }}
                        className='form-select'
                      >
                        <option>IN STOCK</option>
                        <option>SOLD</option>
                      </select>
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputCity'>Battery</Label>
                      <input
                        className='form-control'
                        type='number'
                        placeholder='Battery'
                        value={product?.battery || ''}
                        // disabled={product?.condition === 'NEW' || product?.category === 'Accessories'}
                        onChange={(e) =>
                          setProduct({ ...product, battery: e.target.value })
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputState'>Cost Price</Label>
                      <input
                        className='form-control'
                        type='number'
                        placeholder='Price'
                        value={product?.price || ''}
                        onChange={(e) =>
                          setProduct({ ...product, price: e.target.value })
                        }
                      />
                    </div>
                  </Col>

                  <Col lg={4}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>Selling Price</Label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Selling Price'
                        value={product?.sellingPrice || ''}
                        onChange={(e) =>
                          setProduct({
                            ...product,
                            sellingPrice: e.target.value,
                          })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <div
                  style={{
                    borderBottom: '1px solid #D3D3D3',
                    color: '#808080',
                  }}
                  className='mb-4 mt-2 text-center'
                >
                  <div>Contact</div>
                </div>
                <Row>
                  <Col lg={6}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>Supplier</Label>
                      <input
                        className='form-control'
                        type='text'
                        placeholder='Supplier name'
                        value={product?.supplier || ''}
                        onChange={(e) =>
                          setProduct({ ...product, supplier: e.target.value })
                        }
                      />
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>Contact:</Label>
                      <input
                        className='form-control'
                        type='number'
                        placeholder='Contact'
                        value={product?.contact || ''}
                        onChange={(e) =>
                          setProduct({ ...product, contact: e.target.value })
                        }
                      />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>Message</Label>
                      <input
                        // type="textarea"
                        id='formmessage'
                        className='form-control'
                        value={product?.remarks || ''}
                        onChange={(e) =>
                          setProduct({ ...product, remarks: e.target.value })
                        }
                        placeholder='Enter your Message'
                      />
                    </div>
                  </Col>
                </Row>
                <div
                  style={{
                    borderBottom: '1px solid #D3D3D3',
                    color: '#808080',
                  }}
                  className='mb-4 mt-2 text-center'
                >
                  <div>IMIE / Serial Number</div>
                </div>
                <Row>
                  <Col lg={12}>
                    <div className='mb-3'>
                      <Label htmlFor='formrow-InputZip'>
                        IMEI / Serial Number
                      </Label>
                      {id ? (
                        <input
                          className='form-control'
                          type='text'
                          placeholder='Imei/Serial No'
                          value={product?.imei || ''}
                          onChange={(event) => {
                            addProducts[0] = {
                              ...product,
                              imei: event.target.value.toUpperCase(),
                            }
                            setProduct({
                              ...product,
                              imei: event.target.value.toUpperCase(),
                            })
                          }}
                        />
                      ) : (
                        <div className='inner-repeater mb-4'>
                          <table style={{ width: '100%' }}>
                            <tbody>
                              {(addProducts || []).map((formRow, key) => (
                                <tr key={key}>
                                  <td>
                                    <Row className='mb-2'>
                                      <Col md='10'>
                                        <Input
                                          type='text'
                                          className='inner form-control btn-sm'
                                          placeholder='Enter your IEMI/Serial No'
                                          onChange={(event) =>
                                            addImei(
                                              event.target.value.toUpperCase(),
                                              key
                                            )
                                          }
                                        />
                                      </Col>
                                      <Col md='2'>
                                        <Button
                                          color='danger'
                                          className='trash-btn'
                                          id='unknown-btn'
                                          onClick={(e) => {
                                            handleRemoveRow(formRow.prodId)
                                          }}
                                        >
                                          <i className='bx bx-trash' />
                                        </Button>
                                      </Col>
                                    </Row>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <Button
                            onClick={() => {
                              handleAddRowNested()
                            }}
                            color='success'
                            className='mt-1'
                          >
                            <i className='bx bx-plus-medical' />
                          </Button>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row className='m-4 d-flex justify-content-between'>
                  <Col lg={4}>
                    <button
                      className='btn btn-danger w-md mt-4'
                      onClick={() => handleClear()}
                    >
                      Clear
                    </button>
                  </Col>
                  <Col lg={4}></Col>
                  <Col lg={4}>
                    <Button
                      color='primary'
                      className='mt-4 w-md'
                      onClick={id ? handleUpdate : handleSubmit}
                    >
                      Submit
                    </Button>
                  </Col>
                </Row>
              </div>
            </CardBody>
          </Card>
        </Col>

        <Col lg={2}></Col>
      </Row>
    </div>
  )
}

const mapStatetoProps = (state) => {
  return {
    users: state.users,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(ProductForm)))
