import React, { useState, useMemo, useEffect, useCallback } from 'react'
import MUIDataTable from 'mui-datatables'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import ProductForm from './ProductForm'
import { connect } from 'react-redux'
import {
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
    UncontrolledTooltip,
    Row,
    Col,
    Card,
    CardBody,
    Nav,
  NavItem,
  NavLink,
} from 'reactstrap'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
  getModels as onGetModels,
  updateModels as onUpdateModels,
} from '/src/store/actions'
import classnames from 'classnames'
const ProductAdd = ({user}) => {
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [filteredProducts, setFilteredProducts] = useState([{}])
    const [statusActiveTab, setstatusActiveTab] = useState(0)
    const [showProductForm, setShowProductForm] = useState(false)
    const dispatch = useDispatch()

    const brands = [
      {
        name: 'APPLE',
        models: [
          'IPHONE 14',
          'IPHONE 14 PRO',
          'IPHONE 14 PRO MAX',
          'IPHONE 13',
          'IPHONE 13 PRO',
          'IPHONE 13 PRO MAX',
          'IPHONE 13 MINI',
          'IPHONE 12',
          'IPHONE 12 PRO',
          'IPHONE 12 PRO MAX',
          'IPHONE 12 MINI',
          'IPHONE 11',
          'IPHONE 11 PRO',
          'IPHONE 11 PRO MAX',
          'IPHONE X',
          'IPHONE XS',
          'IPHONE XS MAX',
          'IPHONE 8 PLUS',
          'IPHONE 8',
          'IPHONE 7',
          'IPHONE 7 PLUS',
          'IPHONE 6',
          'IPHONE 6S',
          'IPHONE 6 PLUS',
          'IPHONE 6S PLUS',
        ],
        accessories: [
          'AIRPODS',
          'AIRPODS 2',
          'AIRPODS PRO',
          'AIRPODS PRO 2',
          'AIRPODS 3',
          'PENCIL',
          'PENCIL 2',
          'WATCH',
        ],
      },
      {
        name: 'SAMSUNG',
        models: [
          'S23',
          'S23 PLUS',
          'S23 ULTRA',
          'S20',
          'S20 FE',
          'S20 PLUS',
          'S20 ULTRA',
          'S21',
          'S21 FE',
          'S21 PLUS',
          'S21 ULTRA',
          'S22',
          'S22 FE',
          'S22 PLUS',
          'S22 ULTRA',
          'NOTE 10',
          'NOTE 10 PLUS',
          'NOTE 10 ULTRA',
          'NOTE 20',
          'NOTE 20 PLUS',
          'NOTE 20 ULTRA',
          'NOTE 21',
          'NOTE 21 PLUS',
          'NOTE 21 ULTRA',
          'NOTE 8',
          'NOTE 9',
          'S5',
          'S6',
          'S7',
          'S8',
          'S8 PLUS',
          'S9',
          'S9 PLUS',
          'S10',
          'S10 PLUS',
          'A01',
          'A01 CORE',
          'A02',
          'A03',
          'A03 CORE',
          'A10',
          'A10S',
          'A11',
          'A12',
          'A13',
          'A20',
          'A20S',
          'A21',
          'A21S',
          'A22',
          'A23',
          'A32',
          'A33',
          'A50',
          'A51',
          'A52 5G',
          'A70',
          'A71',
        ],
        accessories: ['GALAXY BUDS'],
      },
      {
        name: 'GOOGLE',
        models: [
          'PIXEL 6',
          'PIXEL 6A',
          'PIXEL 6 PRO',
          'PIXEL 7',
          'PIXEL 7 PRO',
          'PIXEL 5',
          'PIXEL 4A',
          'PIXEL 4A 5G',
          'PIXEL 4',
          'PIXEL 4 XL',
          'PIXEL 3',
          'PIXEL 3 XL',
          'PIXEL 3A',
          'PIXEL 3A XL',
          'PIXEL 2',
          'PIXEL 2 XL',
          'PIXEL 2A',
          'PIXEL 2A XL',
        ],
        accessories: [],
      },
      {
        name: 'ALCATEL',
        models: ['ALCATEL 1', 'GO FLIP 3', 'INSIGHT'],
        accessories: [],
      },
      {
        name: 'ZTE',
        models: [
          'BLADE A3 LITE',
          'BLADE A31 LITE',
          'BLADE A7P',
          'BLADE L210',
          'CMBAL 2',
        ],
        accessories: [],
      },
    ]
    
    const conditions = ['NEW', 'USED']

    const toggle = () => {
      if (showProductForm) {
        setShowProductForm(false)
        setProduct({
          id: '',
          brand: '',
          model: '',
          color: '',
          storage: '',
          condition: '',
        })
      } else {
        setShowProductForm(true)
      }
    }

const generateInitialProducts = () => {
  const prod = []
  for (const brand of brands) {
    for (const model of brand.models) {
      for (const condition of conditions) {
        const product = {
          prodId: Math.floor(Math.random() * 1000000000),
          brand: brand.name,
          category: 'Mobiles',
          status: 'IN STOCK',
          model,
          condition,
        }
        prod.push(product)
      }
    }
  }
  for (const brand of brands) {
    for (const model of brand.accessories) {
      const product = {
        prodId: Math.floor(Math.random() * 1000000000),
        brand: brand.name,
        category: 'Accessories',
        status: 'IN STOCK',
        model,
        condition: 'NEW',
      }
      prod.push(product)
    }
  }
  return prod
}

useEffect(() => {
  const initialProducts = generateInitialProducts()
  setProducts(initialProducts)
  setFilteredProducts(initialProducts)
}, [])

   const handleItemClick = useCallback((type) => {
     setIsEdit(false)
     if (type === 'productEdit') {
       toggle()
     } else if (type === 'Add New') {
       toggle()
     }
   }, [])

   const handleSubmit = useCallback(
     (data) => {
       const updatedData = {
         ...product,
         store: 'SQUARE ONE',
         createdAt: new Date(),
         updatedAt: new Date(),
       }
       dispatch(onAddNewItem(updatedData))
       toggle()
     },
     [product, dispatch]
   )

    const toggleStatus = useCallback(
      (brand) => {
        const currentProducts = products.filter(
          (product) => product.brand === brand
        )
        setFilteredProducts(currentProducts)
      },
      [products]
    )
  
    const options = {
        selectableRows: 'none',
        // onRowClick: handleRowClick,
        filterType: 'dropdown',
        sort: true,
        //set page count to 100 per page
        rowsPerPage: 100,
    }
  
const columns = useMemo(() => [
  {
    name: 'brand',
    label: 'BRAND',
    options: {
      filter: true,
    },
  },
  {
    name: 'category',
    label: 'CATEGORY',
    options: {
      filter: false,
      customBodyRender: (data, dataIndex, rowIndex) => {
          const category = data
        return <p>{category}</p>
      },
    },
  },
  {
    name: 'model',
      label: 'MODEL',
      sort: true,
      sortDirection: 'asc',
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
    options: {
      filter: true,
    },
  },
  {
    name: 'options',
    label: 'OPTIONS',
    options: {
      customBodyRender: (data, dataIndex, rowIndex) => {
        return (
          <Button
            color='primary'
            className='mt-1'
            onClick={() => {
              //last item of an arry is the id
              const prod = products.find(
                (item) => item.prodId === dataIndex.rowData[6]
              )
              setProduct(prod)
              handleItemClick('productEdit')
            }}
          >
            USE PRODUCT
          </Button>
        )
      },
    },
  },
  {
    name: 'prodId',
    label: 'N/A',
    options: {
      display: false,
      filter: false,
      sort: false,
    },
  },
]
, [products])
    return (
      <div className='page-content'>
          <Breadcrumbs title='Products' breadcrumbItem='Add New' />
            <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                <select
                      defaultValue='0'
                      className='form-select '
                      //  style={{ border: 'none', outline: 'none' }}
                      onChange={(e) => toggleStatus(e.target.value)}
                    >
                      <option value='APPLE'>Apple</option>
                      <option value='SAMSUNG'>Samsung</option>
                      <option value='GOOGLE'>Google</option>
                      <option value='ALCATEL'>Alcatel</option>
                      <option value='ZTE'>ZTE</option>
                    </select>
                </CardBody>
              </Card>
            </Col>
          </Row>
          {showProductForm && <ProductForm
              product={product}
              setShowProductForm={setShowProductForm}
              setProduct={setProduct}
              handleSubmit={handleSubmit}
              toggle={toggle}
              isEdit = {isEdit}
              store = {user?.store}
            />
          }
        <MUIDataTable
          data={filteredProducts}
          columns={columns}
          options={options}
          className='border-t border-gray-300'
        />
         
      </div>
    )
}
const mapStatetoProps = (state) => {
  return {
    user: state.users.user,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(ProductAdd)))

