import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Form,
  FormGroup,
  Label,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledTooltip,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import classnames from "classnames";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DeleteModal from '../../../components/Common/DeleteModal'
import { Odate, Type, Model, Category, Remarks, Qty } from './CryptoCol'

import TableContainer from "../../../components/Common/TableContainer";

//Date Picker
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select'
import "/src/assets/scss/datatables.scss";

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb";
import { getCryptoOrders } from "/src/store/crypto/actions";

const CryptoOrders = props => {
  //meta title
  document.title = 'Orders | Wireless + - Vite React Admin & Dashboard Template'

  const { orders, onGetOrders } = props
  const [activeTab, setActiveTab] = useState('1')
  const [selectedMulti, setselectedMulti] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState(null)
  const [storeOrders, setStoreOrders] = useState({
    id: '',
    store: '',
    model: '',
    category: '',
    type: '',
    qty: 0,
    remarks: '',
  })
  const [storeOrderData, setStoreOrderData] = useState([])

  useEffect(() => {
    onGetOrders()
  }, [onGetOrders])

  const handleChange = (date) => {
    setStartDate(date)
  }

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }
  function handleMulti(selectedMulti) {
    const selectedMultiString = selectedMulti.map((item) => item.value)
    const selectedMultiStringComma = selectedMultiString.join(', ')
    setStoreOrders((prevState) => ({
      ...prevState,
      type: selectedMultiStringComma,
      qty: 1,
    }))
    setselectedMulti(selectedMulti)
  }
  const handleSubmit = () => {
    console.log(storeOrders)
    //update if the order is already in the list
    if (storeOrderData.some((item) => item.id === storeOrders.id)) {
      const index = storeOrderData.findIndex((item) => item.id === storeOrders.id)
      const newArray = [...storeOrderData]
      newArray[index] = storeOrders
      setStoreOrderData(newArray)
      setselectedMulti(null)
      setStoreOrders({
        id: '',
        store: '',
        model: '',
        category: '',
        type: '',
        qty: '',
        remarks: '',
      })
      return
    }
    //add new order
    setStoreOrderData([...storeOrderData, storeOrders])
    setselectedMulti(null)  
    setStoreOrders({
      id: '',
      store: '',
      model: '',
      category: '',
      type: '',
      qty: '',
      remarks: '',
    })
      
  
      
  }
  useEffect(() => {
    console.log(selectedOptions)
  }, [selectedMulti])
  console.log(storeOrderData)
  // Table Data

  // const productData = [
  //   {
  //     id: 1,
  //     pdate: "03 Mar, 2020",
  //     type: "Buy",
  //     coin: "Bitcoin",
  //     value: "1.00952 BTC",
  //     valueInUsd: "$ 9067.62",
  //     status: "Completed",
  //   },
  //   {
  //     id: 2,
  //     pdate: "04 Mar, 2020",
  //     type: "Sell",
  //     coin: "Ethereum",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 3,
  //     pdate: "04 Mar, 2020",
  //     type: "Buy",
  //     coin: "Bitcoin",
  //     value: "0.00321 BTC",
  //     valueInUsd: "$ 1802.62",
  //     status: "Pending",
  //   },
  //   {
  //     id: 4,
  //     pdate: "05 Mar, 2020",
  //     type: "Buy",
  //     coin: "Litecoin",
  //     value: "0.00224 LTC",
  //     valueInUsd: "$ 1773.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 5,
  //     pdate: "06 Mar, 2020",
  //     type: "Buy",
  //     coin: "Ethereum",
  //     value: "1.04321 ETH",
  //     valueInUsd: "$ 9423.73",
  //     status: "Failed",
  //   },
  //   {
  //     id: 6,
  //     pdate: "07 Mar, 2020",
  //     type: "Sell",
  //     coin: "Bitcoin",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 7,
  //     pdate: "07 Mar, 2020",
  //     type: "Buy",
  //     coin: "Bitcoin",
  //     value: "1.00952 BTC",
  //     valueInUsd: "$ 9067.62",
  //     status: "Pending",
  //   },
  //   {
  //     id: 8,
  //     pdate: "08 Mar, 2020",
  //     type: "Sell",
  //     coin: "Ethereum",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 9,
  //     pdate: "09 Mar, 2020",
  //     type: "Sell",
  //     coin: "Litecoin",
  //     value: "1.00952 LTC",
  //     valueInUsd: "$ 9067.62",
  //     status: "Completed",
  //   },
  //   {
  //     id: 10,
  //     pdate: "10 Mar, 2020",
  //     type: "Buy",
  //     coin: "Ethereum",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Pending",
  //   },
  //   {
  //     id: 11,
  //     pdate: "11 Mar, 2020",
  //     type: "Buy",
  //     coin: "Ethereum",
  //     value: "1.04321 ETH",
  //     valueInUsd: "$ 9423.73",
  //     status: "Completed",
  //   },
  //   {
  //     id: 12,
  //     pdate: "12 Mar, 2020",
  //     type: "Sell",
  //     coin: "Bitcoin",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 13,
  //     pdate: "03 Mar, 2020",
  //     type: "Buy",
  //     coin: "Bitcoin",
  //     value: "1.00952 BTC",
  //     valueInUsd: "$ 9067.62",
  //     status: "Completed",
  //   },
  //   {
  //     id: 14,
  //     pdate: "04 Mar, 2020",
  //     type: "Sell",
  //     coin: "Ethereum",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 15,
  //     pdate: "04 Mar, 2020",
  //     type: "Buy",
  //     coin: "Bitcoin",
  //     value: "0.00321 BTC",
  //     valueInUsd: "$ 1802.62",
  //     status: "Pending",
  //   },
  //   {
  //     id: 16,
  //     pdate: "05 Mar, 2020",
  //     type: "Buy",
  //     coin: "Litecoin",
  //     value: "0.00224 LTC",
  //     valueInUsd: "$ 1773.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 17,
  //     pdate: "06 Mar, 2020",
  //     type: "Buy",
  //     coin: "Ethereum",
  //     value: "1.04321 ETH",
  //     valueInUsd: "$ 9423.73",
  //     status: "Failed",
  //   },
  //   {
  //     id: 18,
  //     pdate: "07 Mar, 2020",
  //     type: "Sell",
  //     coin: "Bitcoin",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 19,
  //     pdate: "07 Mar, 2020",
  //     type: "Buy",
  //     coin: "Bitcoin",
  //     value: "1.00952 BTC",
  //     valueInUsd: "$ 9067.62",
  //     status: "Pending",
  //   },
  //   {
  //     id: 20,
  //     pdate: "08 Mar, 2020",
  //     type: "Sell",
  //     coin: "Ethereum",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  //   {
  //     id: 21,
  //     pdate: "09 Mar, 2020",
  //     type: "Sell",
  //     coin: "Litecoin",
  //     value: "1.00952 LTC",
  //     valueInUsd: "$ 9067.62",
  //     status: "Completed",
  //   },
  //   {
  //     id: 22,
  //     pdate: "10 Mar, 2020",
  //     type: "Buy",
  //     coin: "Ethereum",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Pending",
  //   },
  //   {
  //     id: 23,
  //     pdate: "11 Mar, 2020",
  //     type: "Buy",
  //     coin: "Ethereum",
  //     value: "1.04321 ETH",
  //     valueInUsd: "$ 9423.73",
  //     status: "Completed",
  //   },
  //   {
  //     id: 24,
  //     pdate: "12 Mar, 2020",
  //     type: "Sell",
  //     coin: "Bitcoin",
  //     value: "0.00413 ETH",
  //     valueInUsd: "$ 2123.01",
  //     status: "Completed",
  //   },
  // ];
  const optionGroup = [
    {
      label: 'Picnic',
      options: [
        { label: 'Red', value: 'Red' },
        { label: 'Black', value: 'Black' },
        { label: 'Rose Gold', value: 'Rose Gold' },
        { label: 'Navy Blue', value: 'Navy Blue' },
        { label: 'Light Pink', value: 'Light Pink' },
        { label: 'Hot Pink', value: 'Hot Pink' },
        { label: 'Green', value: 'Green' },
        { label: 'Midnight Green', value: 'Midnight Green' },
        { label: 'Purple', value: 'Purple' },
        { label: 'White', value: 'White' },
        { label: 'Yellow', value: 'Yellow' },
        { label: 'Orange', value: 'Orange' },
        { label: 'Blue', value: 'Blue' },
        { label: 'Grey', value: 'Grey' },
        { label: 'Gold', value: 'Gold' },
        { label: 'Brown', value: 'Brown' },
        { label: 'Maroon', value: 'Maroon' },
        { label: 'Teal', value: 'Teal' },
      ],
    },
  ]
  //delete item
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = (item) => {
    setStoreOrders(item)
    setDeleteModal(true)
  }
  const handleItemClick = (item, type) => {
    setStoreOrders(item)
  }
  const handleDeleteItem = () => {
   
      // delete order
      const filteredOrders = storeOrderData.filter((order) => order.id !== storeOrders.id)
    setStoreOrderData(filteredOrders)
     setStoreOrders({
       id: '',
       store: '',
       model: '',
       category: '',
       type: '',
       qty: '',
       remarks: '',
     })
      setDeleteModal(false)
  }
  const columns = useMemo(
    () => [
      {
        Header: 'Model',
        accessor: 'model',
        filterable: true,
        Cell: (cellProps) => {
          return <Model {...cellProps} />
        },
      },
      {
        Header: 'Category',
        accessor: 'category',
        filterable: true,
        Cell: (cellProps) => {
          return <Category {...cellProps} />
        },
      },
      {
        Header: 'Type',
        accessor: 'type',
        filterable: true,
        Cell: (cellProps) => {
          return <Type {...cellProps} />
        },
      },
      {
        Header: 'Qty',
        accessor: 'qty',
        filterable: true,
        Cell: (cellProps) => {
          return <Qty {...cellProps} />
        },
      },
      {
        Header: 'Remarks',
        accessor: 'remarks',
        filterable: true,
        Cell: (cellProps) => {
          return <Remarks {...cellProps} />
        },
      },
      {
        Header: 'Date',
        accessor: 'date',
        filterable: true,
        Cell: (cellProps) => {
          return <Odate {...cellProps} />
        },
      },
      {
        Header: 'Action',
        accessor: 'action',
        Cell: (cellProps) => {
          return (
            <ul className='list-unstyled hstack gap-1 mb-0'>
              <li>
                <Link
                  to='#'
                  className='btn btn-sm btn-soft-info'
                  onClick={() => {
                    const ItemData = cellProps.row.original
                    handleItemClick(ItemData)
                  }}
                >
                  <i className='mdi mdi-pencil-outline' id='edittooltip' />
                  <UncontrolledTooltip placement='top' target='edittooltip'>
                    Edit
                  </UncontrolledTooltip>
                </Link>
              </li>
              <li>
                <Link
                  to='#'
                  className='btn btn-sm btn-soft-danger'
                  onClick={() => {
                    const ItemData = cellProps.row.original
                    onClickDelete(ItemData)
                  }}
                >
                  <i className='mdi mdi-delete-outline' id='deletetooltip' />
                  <UncontrolledTooltip placement='top' target='deletetooltip'>
                    Delete
                  </UncontrolledTooltip>
                </Link>
              </li>
            </ul>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteItem}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title='Crypto' breadcrumbItem='Orders' />

          <Row>
            <Col lg='12'>
              <Card>
                <CardBody>
                  <h4 className='card-title mb-3'>Orders</h4>

                  <ul className='nav nav-tabs nav-tabs-custom' role='tablist'>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '1',
                        })}
                        onClick={() => {
                          toggleTab('1')
                        }}
                      >
                        All Orders
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className={classnames({
                          active: activeTab === '2',
                        })}
                        onClick={() => {
                          toggleTab('2')
                        }}
                      >
                        Processing
                      </NavLink>
                    </NavItem>
                  </ul>

                  <TabContent activeTab={activeTab} className='p-3'>
                    <TabPane tabId='1' id='all-order'>
                      <Form>
                        <Row className='mb-4'>
                          <div className='col-xl col-sm-6'>
                            <FormGroup className='mt-3 mb-0'>
                              <Label>Model</Label>
                              <input
                                className='form-control'
                                type='text'
                                value={storeOrders?.model}
                                onChange={(e) =>
                                  setStoreOrders((prevState) => {
                                    return {
                                      ...prevState,
                                      id: storeOrderData.length + 1,
                                      date: new Date(),
                                      model: e.target.value.toUpperCase(),
                                      store: 'EMTC',
                                    }
                                  })
                                }
                                placeholder='Model'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-xl col-sm-6'>
                            <FormGroup className='mt-3 mb-0'>
                              <Label>Category</Label>
                              <select
                                className='form-control'
                                value={storeOrders?.category}
                                onChange={(e) => {
                                  const temp = e.target.value === "Silicon Case" ? "" : e.target.value
                                  setStoreOrders((prevState) => {
                                    return {
                                      ...prevState,
                                      category: e.target.value,
                                      type: temp,
                                    }
                                  })
                                }}
                              >
                                <option value='Select'>Select</option>
                                <option value='Tempered Glass'>
                                  Tempered Glass
                                </option>
                                <option value='Privacy Glass' defaultValue>
                                  Privacy Glass
                                </option>
                                <option value='Premium Glass'>
                                  Premium Glass
                                </option>

                                <option value='Silicon Case'>
                                  Silicon Case
                                </option>
                                <option value='OVO Case'>OVO Case</option>
                                <option value='Punjab Case'>Punjab Case</option>
                                <option value='Phone'>Phone</option>
                                <option value='Other'>Other</option>
                              </select>
                            </FormGroup>
                          </div>
                          {storeOrders?.category === 'Silicon Case' ? (
                            <div className='col-sm col-sm-6'>
                              <FormGroup className='mt-3 mb-0'>
                                <label className='control-label'>Type</label>
                                <Select
                                  value={selectedMulti}
                                  isMulti={true}
                                  onChange={(e) => {
                                    handleMulti(e)
                                  }}
                                  options={optionGroup}
                                  className='select2-selection'
                                />
                              </FormGroup>
                            </div>
                          ) : null}

                          <div className='col-xs col-sm-1'>
                            <FormGroup className='mt-3 mb-0'>
                              <Label>Qty</Label>
                              <input
                                className='form-control'
                                //type should be number
                                type='number'
                                value={storeOrders?.qty}
                                onChange={(e) =>
                                  setStoreOrders((prevState) => {
                                    return {
                                      ...prevState,
                                      qty: e.target.value,
                                    }
                                  })
                                }
                                placeholder='Qty'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-xl col-sm-6'>
                            <FormGroup className='mt-3 mb-0'>
                              <Label>Remarks</Label>
                              <input
                                className='form-control'
                                type='text'
                                value={storeOrders?.remarks}
                                onChange={(e) =>
                                  setStoreOrders((prevState) => {
                                    return {
                                      ...prevState,
                                      remarks: e.target.value,
                                    }
                                  })
                                }
                                placeholder='Remarks'
                              />
                            </FormGroup>
                          </div>
                          <div className='col-xl col-sm-6 align-self-end'>
                            <div className='mb-3'>
                              <Button
                                type='button'
                                color='primary'
                                className='w-md'
                                onClick={() => {
                                  handleSubmit()
                                }}
                              >
                                Add Order
                              </Button>
                            </div>
                          </div>
                        </Row>
                      </Form>

                      <TableContainer
                        columns={columns}
                        data={storeOrderData}
                        isGlobalFilter={false}
                        isAddOptions={false}
                        customPageSize={10}
                      />
                    </TabPane>
                    <TabPane tabId='2' id='processing'>
                      <div>
                        <TableContainer
                          columns={columns}
                          data={storeOrderData}
                          isGlobalFilter={false}
                          isAddOptions={false}
                          customPageSize={10}
                        />
                      </div>
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
};

CryptoOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
};

const mapStateToProps = ({ crypto }) => ({
  orders: crypto.orders,
});

const mapDispatchToProps = dispatch => ({
  onGetOrders: () => dispatch(getCryptoOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CryptoOrders));
