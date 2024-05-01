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
import ProductForm from './ProductAdd'
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
  category: 'MOBILES',
  brand: 'APPLE',
  model: '',
  condition: '',
  color: '',
  storage: '',
  battery: '',
  price: '',
  sellingPrice: '',
  supplier: '',
  contact: '',
  remarks: '',
};
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../helpers/firebase';
import ProductAdd from './ProductAdd'

const ItemList = ({user}) => {
  const [modal_standard, setmodal_standard] = useState(false);
  const [items, setItems] = useState([])
  const [store, setStore] = useState('')
  const [instockSold, setInstockSold] = useState('IN STOCK')
  const [selectedValue, setSelectedValue] = useState('IN STOCK')
  const [storeProducts, setShowProductForm] = useState(false)
  const [product, setProduct] = useState(initialProductState)
  const [deleteModal, setDeleteModal] = useState(false)
  const dispatch = useDispatch()
// const items = useSelector((state) => state.ItemReducer.items)/
  // useEffect(() => {
  //   if(user){
  //   setStore(user.store)
  //   dispatch(onGetItems(user.store))
  //   }
  // }, [user])
  const fetchProducts = async ( ) => {
    const prodQuery = query(prodCollectionRef,  where('status', '==',selectedValue ), where('store', '==', user.store));
    const data = await getDocs(prodQuery);
    const prod = data.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setItems(prod)
}

  const prodCollectionRef = collection(db, 'products');
  useEffect(() => {
    setStore(user.store)
         fetchProducts()
 }, [user, selectedValue]);

  useEffect(() => {
   setStore(user.store)
 }, [user])
  const memoizedItems = useMemo(() => getUpdatedItems(items), [items]);

  const { newItemList, outOfStockItems } = memoizedItems;

  const handleItemClick = useCallback((item) => {
    setProduct(item)
  }, [])

  const handleStatusChange = useCallback((e) => {
    console.log(e.target.value)
    setSelectedValue(e.target.value)
  }, [])

  const handleDeleteItem = () => {
    if (product) {
      dispatch(onDeleteItem(product)) // Perform deletion
      setDeleteModal(false) // Close modal
    }
    alert('Product Deleted')
    setTimeout(() => {
      fetchProducts()
    }, 1000)
  }

  const onClickDelete = item => {
    setProduct(item) // Set the selected item
    setDeleteModal(true) // Show the delete modal
  }

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
                onClick={() => console.log(cellProps.row.original)}
              >
                <i className='mdi mdi-form-select' id='viewtooltip'></i>
              </Link>
            </li>

            <li>
              <Link
                to={`/product-edit/${cellProps.row.original.id}`}
                className='btn btn-sm btn-soft-info'
              >
                <i className='mdi mdi-pencil' id='edittooltip' />
              </Link>

            </li>

            <li>
              <Link
                to='#'
                className='btn btn-sm btn-soft-danger'
                onClick={() => {
                  // setProduct(cellProps.row.original)
                  onClickDelete(cellProps.row.original)
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
      <ProductAdd modal_standard ={modal_standard} setmodal_standard ={setmodal_standard}
       fetchProducts = {fetchProducts} setProduct={setProduct} product ={product}/>

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteItem} // Call handleDeleteItem only after confirmation
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
                  onChange={handleStatusChange}
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
                data={selectedValue === 'IN STOCK' ?  newItemList : outOfStockItems}
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

