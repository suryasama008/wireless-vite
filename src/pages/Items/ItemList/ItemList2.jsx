import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { isEmpty } from 'lodash'
import 'bootstrap/dist/css/bootstrap.min.css'
import TableContainer from '../../../components/Common/TableContainer'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import DeleteModal from '../../../components/Common/DeleteModal'
import { useMemo } from 'react'
import { items } from '../../../common/data'

import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
} from '/src/store/actions'
import {
  Store,
  Brand,
  Color,
  Storage,
  Imei,
  Battery,
  SellingPrice,
  Status,
  Condition,
  Model,
} from './ItemCol'
import { useSelector, useDispatch } from 'react-redux'
import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
  Card,
  CardBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'
const ItemList = () => {
  document.title = 'Item List'
  const [modal, setModal] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [itemList, setItemList] = useState([])
  const [item, setItem] = useState({})

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,
    initialValues: {
      store: '',
      brand: '',
      color: '',
      model: '',
      storage: '',
      imei: '',
      battery: '',
      sellingPrice: '',
      status: '',
      condition: '',
    },
    validationSchema: Yup.object({
      store: Yup.string().required('Store is required'),
      brand: Yup.string().required('Brand is required'),
      color: Yup.string().required('Color is required'),
      model: Yup.string().required('Model is required'),
      storage: Yup.string().required('Storage is required'),
      imei: Yup.string().required('Imei is required'),
      battery: Yup.string().required('Battery is required'),
      sellingPrice: Yup.string().required('Selling Price is required'),
      status: Yup.string().required('Status is required'),
      condition: Yup.string().required('Condition is required'),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updatedItem = {
          store: values.store,
          brand: values.brand,
          color: values.color,
          model: values.model,
          storage: values.storage,
          imei: values.imei,
          battery: values.battery,
          sellingPrice: values.sellingPrice,
          status: values.status,
          condition: values.condition,
        }
        dispatchEvent(onUpdateItem(updatedItem))
        validation.resetForm()
      } else {
        const newItem = {
          store: values['color'],
          brand: values['brand'],
          color: values['color'],
          model: values['model'],
          storage: values['storage'],
          imei: values['imei'],
          battery: values['battery'],
          sellingPrice: values['sellingPrice'],
          status: values['status'],
          condition: values['condition'],
        }
        dispatch(onAddNewItem(newItem))
        validation.resetForm()
      }
      toggle()
    },
  })

  const dispatch = useDispatch()
  const { items } = useSelector((state) => ({
    items: state.ItemReducer.items,
  }))
  console.log('items', items)

  useEffect(() => {
    if (items && !items.length) {
      dispatch(onGetItems())
    }
  }, [dispatch, items])
  useEffect(() => {
    if (items && !items.length) {
      dispatch(onGetItems())
    }
  }, [dispatch, items])

  useEffect(() => {
    setItemList(items)
  }, [items])

  useEffect(() => {
    if (!isEmpty(item) && !!isEdit) {
      setItemList(items)
      setIsEdit(false)
    }
  }, [items])

  const toggle = () => {
    if (modal) {
      setModal(false)
      setSelectedItem(null)
    } else {
      setModal(true)
    }
  }

  const handleItemClick = (arg) => {
    const item = arg
    setItem({
      store: item.store,
      brand: item.brand,
      color: item.color,
      model: item.model,
      storage: item.storage,
      imei: item.imei,
      battery: item.battery,
      sellingPrice: item.sellingPrice,
      status: item.status,
      condition: item.condition,
    })
    setIsEdit(true)

    toggle()
  }

  //delete item
  const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = (item) => {
    setItem(item)
    setDeleteModal(true)
  }

  const handleDeleteItem = () => {
    if (item) {
      dispatch(onDeleteItem(item))
      setDeleteModal(false)
    }
  }

  const handleItemsClicks = () => {
    setItemList('')
    setIsEdit(false)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Store',
        accessor: 'store',
        filterable: true,
        Cell: (cellProps) => {
          return <Store {...cellProps} />
        },
      },
      {
        Header: 'Brand',
        accessor: 'brand',
        filterable: true,
        Cell: (cellProps) => {
          return <Brand {...cellProps} />
        },
      },
      {
        Header: 'Model',
        accessor: 'model',
        filterable: true,
        Cell: (cellProps) => {
          return <Model {...cellProps} />
        },
      },
      {
        Header: 'Color',
        accessor: 'color',
        filterable: true,
        Cell: (cellProps) => {
          return <Color {...cellProps} />
        },
      },
      {
        Header: 'Storage',
        accessor: 'storage',
        filterable: true,
        Cell: (cellProps) => {
          return <Storage {...cellProps} />
        },
      },
      {
        Header: 'IMEI',
        accessor: 'imei',
        filterable: true,
        Cell: (cellProps) => {
          return <Imei {...cellProps} />
        },
      },
      {
        Header: 'Battery',
        accessor: 'battery',
        filterable: true,
        Cell: (cellProps) => {
          return <Battery {...cellProps} />
        },
      },
      {
        Header: 'Selling Price',
        accessor: 'sellingPrice',
        filterable: true,
        Cell: (cellProps) => {
          return <SellingPrice {...cellProps} />
        },
      },
      {
        Header: 'Condition',
        accessor: 'condition',
        filterable: true,
        Cell: (cellProps) => {
          return <Condition {...cellProps} />
        },
      },
      {
        Header: ' Status',
        accessor: 'status',
        filterable: true,
        Cell: (cellProps) => {
          return <Status {...cellProps} />
        },
      },

      {
        Header: 'Actions',
        accessor: 'actions',
        filterable: true,
        Cell: (cellProps) => {
          return (
            <ul className='list-unstyled hstack gap-1 mb-0'>
              <li data-bs-toggle='tooltip' data-bs-placement='top' title='View'>
                <Link
                  to='/inventoryitems-details'
                  className='btn btn-sm btn-soft-primary'
                >
                  <i className='mdi mdi-eye-outline' id='viewtooltip'></i>
                </Link>
              </li>
              <UncontrolledTooltip placement='top' target='viewtooltip'>
                View
              </UncontrolledTooltip>

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
        <div className='container-fluid'>
          <Breadcrumbs title='Items' breadcrumbItem='Items Lists' />
          <Row>
            <Col lg='12'>
              <Card>
                <CardBody className='border-bottom'>
                  <div className='d-flex align-items-center'>
                    <h5 className='mb-0 card-title flex-grow-1'>Item Lists</h5>
                    <div className='flex-shrink-0'>
                      <Link
                        to='#!'
                        onClick={() => setModal(true)}
                        className='btn btn-primary me-1'
                      >
                        Add New Item
                      </Link>
                      <Link to='#!' className='btn btn-light me-1'>
                        <i className='mdi mdi-refresh'></i>
                      </Link>
                      <UncontrolledDropdown className='dropdown d-inline-block me-1'>
                        <DropdownToggle
                          type='menu'
                          className='btn btn-success'
                          id='dropdownMenuButton1'
                        >
                          <i className='mdi mdi-dots-vertical'></i>
                        </DropdownToggle>
                        <DropdownMenu>
                          <li>
                            <DropdownItem href='#'>Action</DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href='#'>Another action</DropdownItem>
                          </li>
                          <li>
                            <DropdownItem href='#'>
                              Something else here
                            </DropdownItem>
                          </li>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </div>
                  </div>
                </CardBody>
                <CardBody>
                  <TableContainer
                    columns={columns}
                    data={items}
                    isGlobalFilter={true}
                    isAddOptions={false}
                    handleItemClicks={handleItemClick}
                    isItemListGlobalFilter={true}
                    customPageSize={10}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle} tag='h4'>
              {isEdit ? 'Edit Item' : 'Add Item'}
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={(e) => {
                  e.preventDefault()
                  validation.handleSubmit()
                  return false
                }}
              >
                <Row>
                  <Col className='col-12'>
                    <div className='mb-3'>
                      <Label className='form-label'>Store</Label>
                      <Input
                        name='store'
                        type='select'
                        className='form-select'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.store || ''}
                      >
                        <option>BCC LL</option>
                        <option>BCC UL</option>
                        <option>EMTC</option>
                        <option>SQUARE ONE</option>
                      </Input>
                      {validation.touched.store && validation.errors.store ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.store}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Category</Label>
                      <Input
                        name='category'
                        type='select'
                        className='form-select'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.category || ''}
                      >
                        <option>Mobile</option>
                        <option>Tablet</option>
                        <option>Accessory</option>
                      </Input>
                      {validation.touched.category &&
                      validation.errors.category ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.category}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Condition</Label>
                      <Input
                        name='condition'
                        type='select'
                        className='form-select'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.condition || ''}
                      >
                        <option>New</option>
                        <option>Used</option>
                      </Input>
                      {validation.touched.condition &&
                      validation.errors.condition ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.condition}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className='mb-3'>
                      <Label className='form-label'>Brand</Label>
                      <Input
                        name='brand'
                        type='select'
                        className='form-select'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.brand || ''}
                      >
                        <option>Apple</option>
                        <option>Samsung</option>
                        <option>Google</option>
                        <option>Motorola</option>
                        <option>ZTE</option>
                        <option>Other</option>
                      </Input>
                      {validation.touched.brand && validation.errors.brand ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.brand}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Model Name</Label>
                      <Input
                        name='model'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.model || ''}
                        invalid={
                          validation.touched.model && validation.errors.model
                            ? true
                            : false
                        }
                      />
                      {validation.touched.model && validation.errors.model ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.model}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Color</Label>
                      <Input
                        name='color'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.color || ''}
                        invalid={
                          validation.touched.color && validation.errors.color
                            ? true
                            : false
                        }
                      />
                      {validation.touched.color && validation.errors.color ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.color}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Storage</Label>
                      <Input
                        name='storage'
                        type='select'
                        className='form-select'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.storage || ''}
                      >
                        <option>16GB</option>
                        <option>32GB</option>
                        <option>64GB</option>
                        <option>128GB</option>
                        <option>256GB</option>
                        <option>512GB</option>
                        <option>1TB</option>
                      </Input>
                      {validation.touched.storage &&
                      validation.errors.storage ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.storage}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className='mb-3'>
                      <Label className='form-label'>Battery</Label>
                      <Input
                        name='battery'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.battery || ''}
                        invalid={
                          validation.touched.battery &&
                          validation.errors.battery
                            ? true
                            : false
                        }
                      />
                      {validation.touched.battery &&
                      validation.errors.battery ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.battery}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Supplier/Customer</Label>
                      <Input
                        name='supplier'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.supplier || ''}
                        invalid={
                          validation.touched.supplier &&
                          validation.errors.supplier
                            ? true
                            : false
                        }
                      />
                      {validation.touched.supplier &&
                      validation.errors.supplier ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.supplier}
                        </FormFeedback>
                      ) : null}
                    </div>

                    <div className='mb-3'>
                      <Label className='form-label'>Contact</Label>
                      <Input
                        name='contact'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.contact || ''}
                        invalid={
                          validation.touched.contact &&
                          validation.errors.contact
                            ? true
                            : false
                        }
                      />
                      {validation.touched.contact &&
                      validation.errors.contact ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.contact}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>Purchase Price</Label>
                      <Input
                        name='costPrice'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.costPrice || ''}
                        invalid={
                          validation.touched.costPrice &&
                          validation.errors.costPrice
                            ? true
                            : false
                        }
                      />
                      {validation.touched.costPrice &&
                      validation.errors.costPrice ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.costPrice}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'> Selling Price</Label>
                      <Input
                        name='sellingPrice'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.sellingPrice || ''}
                        invalid={
                          validation.touched.sellingPrice &&
                          validation.errors.sellingPrice
                            ? true
                            : false
                        }
                      />
                      {validation.touched.sellingPrice &&
                      validation.errors.sellingPrice ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.sellingPrice}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className='mb-3'>
                      <Label className='form-label'>IMEI</Label>
                      <Input
                        name='imei'
                        type='text'
                        onChange={validation.handleChange}
                        onBlur={validation.handleBlur}
                        value={validation.values.imei || ''}
                        invalid={
                          validation.touched.imei && validation.errors.imei
                            ? true
                            : false
                        }
                      />
                      {validation.touched.imei && validation.errors.imei ? (
                        <FormFeedback type='invalid'>
                          {validation.errors.imei}
                        </FormFeedback>
                      ) : null}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <div className='text-end'>
                      <button
                        type='submit'
                        className='btn btn-success save-user'
                      >
                        Save
                      </button>
                    </div>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ItemList
