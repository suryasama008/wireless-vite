import React,{useState,useEffect} from 'react'
import MUIDataTable from 'mui-datatables'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Input,
} from 'reactstrap'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
const Order = () => {
    const [orders, setOrders] = useState([])
  const [order, setOrder] = useState({})
  const [cart, setCart] = useState([])
  const [cartOrders, setCartOrders] = useState([])
  const [siliconeColor, setSiliconeColor] = useState('')
  const [cartToggle, setCartToggle] = useState(true)
  const [modal, setModal] = useState(false) 
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedAccessory, setSelectedAccessory] = useState('REGULAR GLASS')
  const [quantities, setQuantities] = useState({})
  const [siliconeColors, setSiliconeColors] = useState({  })

    const toggleStatus = (value) => {
      setSelectedAccessory(value)
      filterAccessories(value)
    }

  const filterAccessories = (value) => {
    setSelectedAccessory(value)
    const filteredProducts = orders.filter((item) => item.cases === value)
    setFilteredProducts(filteredProducts)
    }

  const removeFromCartOrders = (order) => {
    setCartOrders((prevCartOrders) => {
      const updatedCartOrders = prevCartOrders.filter(
        (item) => item.prodId !== order.prodId
      )
      return updatedCartOrders
    })
  }

 const addToCartOrders = (order) => {
  //  order.cases =
  //    order.cases === 'SILICONE' && siliconeColor !== ''
  //      ? siliconeColor
  //      : order.cases
   order.cases = order.cases === "SILICONE" ? `SILICONE-${siliconeColors[`${order.prodId}-${order.cases}`]}` : order.cases
   order.quantity = quantities[`${order.prodId}-${order.cases}`]
   setCartOrders((prevCartOrders) => {
     const updatedCartOrders = [...prevCartOrders, order]
     return updatedCartOrders
   })
   setCart([])
   setSiliconeColor('')
 }
console.log('cartOrders', cartOrders)
 function handleInputChange(id, value, cases) {
   setQuantities((prevQuantities) => ({
     ...prevQuantities,
     [`${id}-${cases}`]: parseInt(value),
   }))
 }
  function handleColorChange(id, value, cases) {
    setSiliconeColors((prevSiliconeColors) => ({
      ...prevSiliconeColors,
      [`${id}-${cases}`]: value,
    }))
  }
  console.log('siliconeColors', siliconeColors)

    const cases = [
      'REGULAR GLASS',
      'PRIVACY GLASS',
      'TOP GLASS',
      'SILICONE',
      'PUNJAB',
      'OVO',
      'JATT LIFE',
      'CLEAR CASE',
    ]
    const models = [
      { brand: 'BRAND1', models: ['MODEL1', 'MODEL2'] },
      { brand: 'BRAND2', models: ['MODEL1', 'MODEL2', 'MODEL3'] },
    ]

    useEffect(() => {
   const prod = []
   for (const model of models) {
     for (const mod of model.models) {
       for (const cas of cases) {
         const product = {
           store: 'SQUARE ONE',
           prodId: Math.floor(Math.random() * 1000000000),
           brand: model.brand,
           cases: cas,
           status: 'IN STOCK',
           model: mod,
           quantity: 0,
         }
         prod.push(product)
       }
     }
   }
   setOrders(prod)
    }, [])
  
  const columns = [
    {
      name: 'store',
      label: 'STORE',
      options: {
        filter: true,
      },
    },
    {
      name: 'brand',
      label: 'BRAND',
      options: {
        filter: true,
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
      name: 'cases',
      label: 'ACCESSORIES',
      options: {
        customBodyRender: (data, tableMeta, rowIndex) => {
          if (data !== 'SILICONE') {
            return data
          }
          return (
            <>
              SILICONE{' '}
              <SiliconeColor
                id={tableMeta.rowData[6]}
                cases={tableMeta.rowData[3]}
                handleColorChange={handleColorChange}
              />
            </>
          )
        },
      },
    },
    {
      name: 'quantity',
      label: 'QTY',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[6]
          const cases = tableMeta.rowData[3]
          const quantity = quantities[`${id}-${cases}`] || 0

          const handleChange = (event) => {
            updateValue(event.target.value)
            handleInputChange(id, event.target.value, cases)
          }

          return (
            <div className='d-flex' style={{ maxWidth: '150px' }}>
              <Input
                className='form-control input-sm'
                type='number'
                bsSize='sm'
                min='0'
                value={quantity}
                onChange={handleChange}
              />
            </div>
          )
        },
      },
    },

    {
      name: 'addToCart',
      label: 'ADD TO CART',
      options: {
        customBodyRender: (data, dataIndex, rowIndex) => {
          const prodId = dataIndex.rowData[6]
          // Check if the product is in the cartOrders
          const addedProduct = cartOrders.find((item) => item.prodId === prodId)

          return (
            <div className='form-check form-switch form-switch-md mb-3'>
              <input
                className='form-check-input'
                type='checkbox'
                value={data}
                id='customSwitchsizemd'
                checked={addedProduct?.isAdded || false}
                onChange={(event) => {
                  const prodId = dataIndex.rowData[6]
                  //find the product in the orders array
                  const prod = orders.find((item) => item.prodId === prodId)
                  const isChecked = event.target.checked
                  isChecked ? addToCartOrders(prod) : removeFromCartOrders(prod)
                }}
              />
            </div>
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


  return (
    <div className='page-content'>
      <div className='container-fluid'>
        <Breadcrumbs title='Orders' breadcrumbItem='Order List' />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <label htmlFor='autoSizingSelect'>Accessories: </label>
                    <select
                      defaultValue='0'
                      className='form-select'
                      onChange={(e) => toggleStatus(e.target.value)}
                    >
                      <option value='REGULAR GLASS'>Regular Glass</option>
                      <option value='TOP GLASS'>Top Glass</option>
                      <option value='PRIVACY GLASS'>Privacy Glass</option>
                      <option value='SILICONE'>Silicone Case</option>
                      <option value='CLEAR CASE'>Clear Case</option>
                      <option value='PUNJAB'>Punjab Case</option>
                      <option value='OVO'>OVO Case</option>
                      <option value='JATT LIFE'>Jatt Life Case</option>
                      <option value='CLEAR COAT'>clear Coat</option>
                    </select>
                  </div>
                  <Button
                    to='#'
                    className='btn btn-success'
                    onClick={() => handleItemClick('Add New')}
                  >
                    Place Order
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <MUIDataTable
          data={filteredProducts}
          columns={columns}
          className='border-t border-gray-300'
          options={{
            responsive: true,
            autoWidth: true,
            responsive: 'standard',
            scroll: { maxHeight: '500px' },
            pagination: false,
            tableLayout: 'auto',
            selectableRows: 'none',
            filter: false,
            print: false,
            download: false,
            filterType: 'dropdown',
            sort: true,
            rowsPerPage: 100,
          }}
        />
      </div>
    </div>
  )
}

const colors = [
  { name: 'black', color: '#000000' },
  { name: 'rose gold', color: '#B76E79' },
  { name: 'white', color: '#FFFFFF' },
  { name: 'yellow', color: '#FFFF00' },
  { name: 'red', color: '#FF0000' },
  { name: 'navy', color: '#000080' },
  { name: 'hot pink', color: '#FF69B4' },
  { name: 'BLACK', color: '#000000' },
  { name: 'ROSE GOLD', color: '#B76E79' },
  { name: 'WHITE', color: '#FFFFFF' },
  { name: 'YELLOW', color: '#FFFF00' },
  { name: 'RED', color: '#FF0000' },
  { name: 'NAVY', color: '#000080' },
  { name: 'HOT PINK', color: '#FF69B4' },
  { name: 'BABY BLUE', color: '#89CFF0' },
  { name: 'BLUE', color: '#0000FF' },
  { name: 'MIDNIGHT GREEN', color: '#004953' },
  { name: 'HUNTER GREEN', color: '#355E3B' },
  { name: 'LIGHT PINK', color: '#FFB6C1' },
  { name: 'PURPLE', color: '#800080' },
  { name: 'ORANGE', color: '#FFA500' },
  { name: 'GRAY', color: '#808080' },
  { name: 'BROWN', color: '#964B00' },
  { name: 'WINE', color: '#722f37' },
]


  const SiliconeColor = ({
    setSiliconeColor,
    handleColorChange,
    id,
    cases,
  }) => {
    const [selectedColors, setSelectedColors] = useState([])
console.log(selectedColors)
    useEffect(() => {
      handleColorChange(id, selectedColors.join(' | '), cases)
    }, [selectedColors])
    return (
      <Row>
        {colors.map((color) => (
          <Col key={color.name} xs={6} sm={3}>
            <div className='form-check form-check-inline'>
              <input
                className='form-checkbox-outline'
                id={`checkbox-${color.name}`}
                type='checkbox'
                value={color.name}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedColors([...selectedColors, e.target.value])
                  } else {
                    setSelectedColors(
                      selectedColors.filter((item) => item !== e.target.value)
                    )
                  }
                }}
              />
              <label
                className='form-check-label'
                htmlFor={`checkbox-${color.name}`}
                style={{ fontWeight: 'bold' }}
              >
                {color.name}
              </label>
              <div
                className='color-box'
                style={{ backgroundColor: color.color }}
              />
            </div>
          </Col>
        ))}
      </Row>
    )
  }


export default Order