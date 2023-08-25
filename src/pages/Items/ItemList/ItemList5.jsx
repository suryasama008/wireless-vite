import React, { useState, useMemo, useEffect, useCallback } from 'react'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'
import { auth } from '../../../helpers/firebase'
import DeleteModal from '../../../components/Common/DeleteModal'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
} from '/src/store/actions'
import { getUsersData as onGetUsers } from '../../../store/actions'
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
  Button,
} from 'reactstrap'
import TableContainer from "../../../components/Common/TableContainer";
import ProductForm from './ProductForm'
import {
  Store,
  Brand,
  Color,
  Model,
  Storage,
  Imei,
  Battery,
  SellingPrice,
  Status,
  Condition,
  Costprice,
  UpdatedAt,
} from './ItemCol'
import { connect } from 'react-redux'

const initialProductState = {
  id: '',
  store: '',
  brand: '',
  category: 'MOBILES',
  model: '',
  color: '',
  storage: '16 GB',
  price: '',
  sellingPrice: '',
  imei: '',
  battery: '',
  status: 'IN STOCK',
  condition: 'NEW',
  supplier: '',
  contact: '',
};

const ItemList = ({user}) => {
  const [store, setStore] = useState('')
  const [instockSold, setInstockSold] = useState('IN STOCK')
  const [selectedValue, setSelectedValue] = useState('IN STOCK')
  const [showProductForm, setShowProductForm] = useState(false)
  const [product, setProduct] = useState(initialProductState)
  const [deleteModal, setDeleteModal] = useState(false)
  const dispatch = useDispatch()
const items = useSelector((state) => state.ItemReducer.items)
  useEffect(() => {
    setStore(user.store)
  }, [user])

  const memoizedItems = useMemo(() => getUpdatedItems(items), [items]);

  const { newItemList, outOfStockItems } = memoizedItems;

  useEffect(() => {
    if (showProductForm) {
      setProduct(initialProductState)
      setIsEdit(false)
    } 
  }, [showProductForm])

  const handleItemClick = useCallback((item) => {
    setProduct(item)
  }, [])

  const toggleRightCanvas = useCallback((prod) => {
    setProduct(prod)
    setIsRight((isRight) => !isRight)
  }, [])

  const handleDeleteItem = useCallback(() => {
    if (product) {
      dispatch(onDeleteItem(product))
      setDeleteModal(false)
    }
  }, [product, dispatch])

  const handleStatusChange = useCallback((e) => {
    setSelectedValue(e.target.value)
  }, [])

  const onClickDelete = useCallback((item) => {
    setProduct(item)
    setDeleteModal(true)
  }, [])

  const columns = useMemo(() => [
    {
      Header: 'Store',
      accessor: 'store',
      filterable: true,
      Cell: (cellProps) => {
        return <Brand {...cellProps} />
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
      Header: 'CP',
      accessor: 'price',
      filterable: true,
      Cell: (cellProps) => {
        return <Costprice {...cellProps} />
      }
    },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      filterable: true,
      sort: false,
      // sortDirection: 'desc',
      Cell: (cellProps) => {
        return <UpdatedAt {...cellProps} />
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      filterable: true,
      Cell: (cellProps) => {
        return (
          <ul className='list-unstyled hstack gap-1 mb-0'>
            <li>
              <Link
                to={`/product-sell/${cellProps.row.original.id}`}
                className='btn btn-sm btn-soft-info'
              >
                <i className='mdi mdi-form-select' id='viewtooltip'></i>
              </Link>
            </li>

            <li>
              <Link
                to={`/product-edit/${cellProps.row.original.id}`}
                className='btn btn-sm btn-soft-info'
              >
                <i className='mdi mdi-playlist-edit' id='edittooltip' />
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
              </Link>
            </li>
          </ul>
        )
      },
    },
], [])

  const options = {
    selectableRows: 'none',
    rowsPerPage: 100,
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
        <Card>
          <CardBody>
            {items && (
              <TableContainer
                columns={columns}
                data={instockSold ?  newItemList : outOfStockItems}
                isGlobalFilter={true}
                isAddOptions={false}
                isItemListGlobalFilter={true}
                handleItemClicks={handleItemClick}
                options={options}
                customPageSize={100}
              />
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
const getUpdatedItems = (items) => {
  let newItemList = []
  let outOfStockItems = []

  if (items && items.length) {
    items.sort((b, a) => {
      return (
        b?.updatedAt?.seconds * 1000 +
        b?.updatedAt?.nanoseconds / 1000000 -
        (a?.updatedAt?.seconds * 1000 + a?.updatedAt?.nanoseconds / 1000000)
      )
    })

    items.forEach((item) => {
      const date = new Date(
        item?.updatedAt?.seconds * 1000 +
        item?.updatedAt?.nanoseconds / 1000000,
      )
      const tempItem = {
        ...item,
        updatedAt: date?.toDateString(),
      }

      if (tempItem.status === 'IN STOCK') {
        newItemList.push(tempItem)
      } else {
        outOfStockItems.push(tempItem)
      }
    })

    return { newItemList, outOfStockItems };
  }
  
  // If items is undefined or empty, return empty arrays
  return { newItemList: [], outOfStockItems: [] }
}



const getColumns = ({onClickDelete}) => [
    {
      Header: 'Store',
      accessor: 'store',
      filterable: true,
      Cell: (cellProps) => {
        return <Brand {...cellProps} />
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
    // {
    //   Header: 'CP',
    //   accessor: 'price',
    //   filterable: true,
    //   Cell: (cellProps) => {
    //     return <Costprice {...cellProps} />
    //   }
    // },
    {
      Header: 'Updated At',
      accessor: 'updatedAt',
      filterable: true,
      sort: false,
      // sortDirection: 'desc',
      Cell: (cellProps) => {
        return <UpdatedAt {...cellProps} />
      },
    },
    {
      Header: 'Actions',
      accessor: 'actions',
      filterable: true,
      Cell: (cellProps) => {
        return (
          <ul className='list-unstyled hstack gap-1 mb-0'>
            <li>
              <Link
                to={`/product-sell/${cellProps.row.original.id}`}
                className='btn btn-sm btn-soft-info'
              >
                <i className='mdi mdi-form-select' id='viewtooltip'></i>
                <UncontrolledTooltip placement='top' target='edittooltip'>
                  View
                </UncontrolledTooltip>
              </Link>
            </li>

            <li>
              <Link
                to={`/product-edit/${cellProps.row.original.id}`}
                className='btn btn-sm btn-soft-info'
              >
                <i className='mdi mdi-playlist-edit' id='edittooltip' />
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
]
const mapStatetoProps = (state) => {
  return {
    items: state.ItemReducer.items,
    user: state.users.user,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(ItemList)))

