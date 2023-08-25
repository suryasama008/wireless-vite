import React, { useState,useMemo, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'
import DeleteModal from '../../../components/Common/DeleteModal'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
} from '/src/store/actions'
import { getCurrentUser } from '../../../helpers/AuthContext'
import OffCanvas from '../../Dashboard-saas/OffCanvas'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import { useSelector, useDispatch } from 'react-redux'
import {
  Col,
  Row,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap'
import ProductForm from './ProductForm'
import {
  Store,
  Brand,
  Color,
  Battery,
  Status,
} from './ItemCol'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
const ItemList = (props) => {
  const history = useHistory();
const [customActiveTab, setcustomActiveTab] = useState('1')
  const [statusActiveTab, setstatusActiveTab] = useState('1')
  const [itemsList , setItemList] = useState([])
const [isRight, setIsRight] = useState(false)
const store = 'SQUARE ONE'
const [productsList, setProductsList] = useState([])
const [product, setProduct] = useState({
  id: '',
  store: 'SQUARE ONE',
  brand: '',
  category: '',
  model: '',
  color: '',
  storage: '',
  costPrice: '',
  sellingPrice: '',
  imei: '',
  battery: '',
  status: '',
  condition: '',
  supplier: '',
  contact: '',
})
  const [modal, setModal] = useState(false) // initialize modal as false instead of true
  const [isEdit, setIsEdit] = useState(false)
  const [instockSoldToggle, setInstockSoldToggle] = useState(false)
  const [inStockItems , setInStockItems] = useState([])
  const [outStockItems , setOutStockItems] = useState([])
  const dispatch = useDispatch()
  const { items } = props
  
  const loadData = () => {
    dispatch(onGetItems())
  }
  
  const memoizedItems = useMemo(() => {
    if (items && items.length) {
      const newItemList = []
      const outOfStockItems = []
      items.sort((b, a) => {
        return (
          b?.updatedAt?.seconds * 1000 +
          b?.updatedAt?.nanoseconds / 1000000 -
          (a?.updatedAt?.seconds * 1000 + a?.updatedAt?.nanoseconds / 1000000)
        )
      })
     
      items.map((item) => {
        const date = new Date(
          item?.updatedAt?.seconds * 1000 +
          item?.updatedAt?.nanoseconds / 1000000,
        )
        const temp = () => {
          return {
            ...item,
            updatedAt: date?.toDateString(),
          }
        }
        
        if (temp().status === 'IN STOCK') {
          newItemList.push(temp())
        } else {
          outOfStockItems.push(temp())
        }
      })
  
      return { newItemList, outOfStockItems };
    }
  }, [items]);

  useEffect(() => {
    if (memoizedItems) {
      setInStockItems(memoizedItems.newItemList)
      setItemList(memoizedItems.newItemList)
      setOutStockItems(memoizedItems.outOfStockItems)
    }
  }, [memoizedItems])

 useEffect(() => {
   if (items && items.length) {
     // convert time stamp to date
     const itemList = []
     items.map((item) => {
       //check date format and filter the data accordingly
       const date = new Date(
         item?.updatedAt?.seconds * 1000 +
         item?.updatedAt?.nanoseconds / 1000000
       )
       //both date and tiem string
       const dateStr = date?.toDateString()
       const timeStr = date?.toLocaleTimeString()
        //concatenate date and time string
       const dateTimeStr = dateStr + ' ' + timeStr
       const temp = () => {
         return {
           ...item,
           updatedAt : dateTimeStr
         }
       }
        itemList.push(temp())
     })
     setItemList(itemList)
     setProductsList(
       itemList.filter(
         (item) => item?.store === store || item?.store === ''
       )
     )
   }
 }, [items, store])
 /**
  * If the modal is open, close it and clear the item. If the modal is closed, open it
  */
 const toggle = () => {
   if (modal) {
     setModal(false)
     setProduct({
       id: '',
       store: 'SQUARE ONE',
       brand: '',
       category: '',
       model: '',
       color: '',
       storage: '',
       costPrice: '',
       sellingPrice: '',
       imei: '',
       battery: '',
       status: '',
       condition: '',
       supplier: '',
       contact: '',
     })
   } else {
     setModal(true)
   }
 }
  
  const handleItemClick = (type) => {
    if (type === 'productEdit') {
      setIsEdit(true);
      toggle();
    } else if (type === 'Add New') {
      setIsEdit(false);
      toggle();
    }
  };

  

  const toggleRightCanvas = (id) => {
    //find and set the product to be edited
    console.log(id)
    const prod = items.find((item) => item.id === id)
    setProduct(prod)
     setIsRight(!isRight)
   }
  
  const handleSubmit = (data) => {
    if (isEdit) {
       const updatedData = {
         ...data,
         updatedAt: new Date(),
       }
      dispatch(onUpdateItem(updatedData, product.id))
      dispatch(onGetItems())
    } else {  
      const updatedData = {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      dispatch(onAddNewItem(updatedData))
      dispatch(onGetItems())
      console.log("add new item")
      setProduct(null)
    }
    toggle()
  }

  //delete item
    const [deleteModal, setDeleteModal] = useState(false)

  const onClickDelete = (item) => {
      setProduct(item)
      setDeleteModal(true)
    }

    const handleDeleteItem = () => {
      if (product) {
        dispatch(onDeleteItem(product))
        dispatch(onGetItems())
        setDeleteModal(false)
      }
    }

    const handleStatusChange = (e) => {
      //filter items based on status
      if (e.target.value === 'IN STOCK') {
        setInstockSoldToggle(false)
      }
      if (e.target.value === 'SOLD') {
        setInstockSoldToggle(true)
      }
    }


  const columns = [
    {
      name: 'store',
      label: 'STORE',
    },
    {
      name: 'brand',
      label: 'BRAND',
    },
    {
      name: 'model',
      label: 'MODEL',
    },
    {
      name: 'color',
      label: 'COLOR',
      options: {
        filter: false,
      },
    },
    {
      name: 'storage',
      label: 'STORAGE',
      options: {
        filter: false,
      },
    },
    {
      name: 'imei',
      label: 'IMEI',
      options: {
        filter: false,
      },
    },
    {
      name: 'condition',
      label: 'CONDITION',
      options: {
        filter: true,
      },
    },
    {
      name: 'status',
      label: 'STATUS',
    },
    {
      name: 'battery',
      label: 'BATTERY',
      options: {
        display: true,
        filter: false,
        sort: false,
        customBodyRender: (data, dataIndex, rowIndex) => {
          data = dataIndex.rowData[6] === 'NEW' ? '100 %' : data + ' %'
          return data
        },
      },
    },
    {
      name: 'updatedAt',
      label: `${statusActiveTab === '2' ? 'SOLD DATE' : 'ADDED DATE'}`,
      options: {
        filter: false,
      },
    },
    {
      name: 'options',
      label: 'OPTIONS',
      options: {
        customBodyRender: (data, dataIndex, rowIndex) => {
          return (
            <ul className='list-unstyled hstack gap-1 mb-0'>
          <li>
            <Button color='primary' onClick = {()=>console.log(dataIndex.rowData[11])}>test</Button>
          </li>
          <li>
            <Button 
              color='primary' 
              onClick={() => history.push(`/product-sell/${dataIndex.rowData[11]}`)}
            >
              View
            </Button>
          </li>

          <li>
            <Button 
              color='primary' 
              onClick={() => history.push(`/product-edit/${dataIndex.rowData[11]}`)}
            >
              Edit
            </Button>
          </li>

          <li>
            <Button
              color='primary'
              onClick={() => onClickDelete(dataIndex.rowData[11])}
            >
              Delete
            </Button>
          </li>
        </ul>
          )
        },
      },
    },
    {
      name: 'id',
      label: 'N/A',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
  ]
  const options = {
    selectableRows: 'none',
    filterType: 'dropdown',
    sort: true,
    rowsPerPage: 100,
    sortOrder: {
      name: 'updatedAt',
      direction: 'desc',
    },
    customSort: (data, colIndex, order) => {
      if (
        colIndex === columns.findIndex((column) => column.name === 'updatedAt')
      ) {
        return data.sort((a, b) => {
          const dateA = new Date(a.data[colIndex])
          const dateB = new Date(b.data[colIndex])
          return order === 'desc' ? dateB - dateA : dateA - dateB
        })
      }
      return data
    },
  }
  
  return (
    <div className='page-content'>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteItem}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className='container-fluid'>
      <Breadcrumbs title={store} breadcrumbItem='Products List' />
      <Card>
          <CardBody className='border-bottom'>
            <Row className='justify-content-between align-items-start'>
              <Col xs={2} className='text-start d-flex'>
                <select
                  defaultValue='0'
                  className='form-select'
                  //  style={{ border: 'none', outline: 'none' }}
                  onChange={(e)=>handleStatusChange(e)}
                >
                  <option value='IN STOCK'>In Stock</option>
                  <option value='SOLD'>Sold</option>
                </select>
              </Col>
              <Col xs={4} className='text-end'>
                <div className='flex-shrink-0'>
                  <Button
                    to='#!'
                    className='btn btn-light me-1'
                    onClick={() => window.location.reload()}
                  >
                    <i className='mdi mdi-refresh'></i>
                  </Button>
                  <Link
                    to='/product-form'
                    className='btn btn-primary me-1'
                  >
                    Add New Item
                  </Link>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
        <CardBody>
          {items && (
            <MUIDataTable
            data={!instockSoldToggle ?  inStockItems : outStockItems}

              columns={columns}
              options={options}
              className='border-t border-gray-300'
            />
          )}
        </CardBody>
      </div>
    </div>
  )
}
const mapStatetoProps = state => {
  return {
    items:  state.ItemReducer.items,
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(ItemList)));

