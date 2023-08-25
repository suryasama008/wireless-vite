import React, { useState, useEffect } from 'react'
import MUIDataTable from 'mui-datatables'
import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Table,
} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import Breadcrumbs from '../../../components/Common/Breadcrumb'
import {cases, models, silicone} from  '../../../constants/models.js'
import {
  fetchOrders as onFetchOrders,
  addNewOrders as onAddNewOrder,
  updateOrders as onUpdateOrder,
  deleteOrders as onDeleteOrder,
} from '/src/store/actions'
import moment from 'moment'

const Order = ({ order,user }) => {
  console.log(user)
  const [orders, setOrders] = useState([])
  const [cartOrders, setCartOrders] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isOrdersSet, setIsOrdersSet] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const date = new Date().toLocaleDateString()
      dispatch(onFetchOrders(date))
  }, [dispatch])
  
    /* This `useEffect` hook is running whenever the `isOrdersSet` state changes. If `isOrdersSet` is
    `true`, it calls the `filterAccessories` function with the argument `'Regular Glass'`. This is
    likely used to initially filter the `orders` array by the default value of `'Regular Glass'`
    when the component mounts and `isOrdersSet` is set to `true`. */
  
    useEffect(() => {
      if (isOrdersSet) {
        filterAccessories('Regular Glass')
      }
    }, [isOrdersSet])

  useEffect(() => {
     const date = new Date().toLocaleDateString()
     dispatch(onFetchOrders(date))
   }, [dispatch])
  
  //getorders from store
  // const orderz = useSelector((state) => state)
  // console.log(orderz)
  
/**
 * This function filters orders based on the type of case specified and sets the filtered products.
 */
 const filterAccessories = (value) => {
   let filteredProducts
   if (value === 'Silicone Case') {
     filteredProducts = orders.filter((item) =>
       item.cases.startsWith('Silicone')
     )
   } else {
     filteredProducts = orders.filter((item) => item.cases === value)
   }
   setFilteredProducts(filteredProducts)
 }


/**
 * This function removes an order from the cart and sets the quantity of the corresponding order in the
 * orders array to an empty string.
 */
  const removeFromCartOrders = (order) => {
    setCartOrders((prevCartOrders) => {
      const updatedCartOrders = prevCartOrders.filter(
        (item) => item.prodId !== order.prodId
      )
      return updatedCartOrders
    })

    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((item) => {
        if (item.prodId === order.prodId) {
          item.quantity = ''
        }
        return item
      })
      return updatedOrders
    })
  }

/**
 * This function adds a product to the cart if it is not already in the cart.
 * @returns If the `prod` object already exists in the `cartOrders` array, nothing is returned (the
 * function exits early with a `return` statement). If the `prod` object does not exist in the
 * `cartOrders` array, the `cartOrders` state is updated by adding the `prod` object to the end of the
 * array, and the updated `cartOrders` array is returned
 */
  const addToCartOrders = (prod) => {
    const isProductInCart = cartOrders.find(
      (item) => item.prodId === prod.prodId
    )
    if (isProductInCart) {
      return
    }
    setCartOrders((prevCartOrders) => {
      const updatedCartOrders = [...prevCartOrders, prod]
      return updatedCartOrders
    })
  }


 /* This `useEffect` hook is creating an array of products based on the `models`, `cases`, and
 `silicone` arrays. It is then setting the state of `orders` to this array of products and setting
 the state of `isOrdersSet` to `true`. This hook only runs once when the component mounts, as it has
 an empty dependency array `[]`. */
  useEffect(() => {
    const prod = []
    for (const model of models) {
      for (const mod of model.models) {
        for (const cas of cases) {
          if (cas === 'Silicone') {
            for (const color of silicone) {
              const product = {
                store: user.store,
                prodId: `${mod}-${cas}-${color}`,
                brand: model.brand,
                cases: `${cas}-${color}`,
                status: 'IN STOCK',
                model: mod,
                quantity: 1,
                date: moment().format('DD-MM-YYYY')
              }
              prod.push(product)
            }
          } else {
            const product = {
              store: user.store,
              prodId: `${mod}-${cas}`,
              brand: model.brand,
              cases: cas,
              model: mod,
              quantity: '',
              date: moment().format('DD-MM-YYYY')
            }
            prod.push(product)
          }
        }
      }
    }
    setOrders(prod)
    setIsOrdersSet(true)
  }, [])


 /**
  * This function handles placing an order by creating an order object with the current date and the
  * products in the cart, dispatching an action to place the order, and resetting the cart orders.
  */

 console.log(new Date().toLocaleDateString())
  const handlePlaceOrder = () => {
//check id the a new file is created of that date in the orders folder and update the the esisting file if the file is already create for that date "order"
    if (order && order.length > 0) {
      //if order exist update the order
      const orderList = {
        id: order[0]?.id,
        date: order[0].date,
        products: [...order[0].products, ...cartOrders],
      }
      dispatch(onUpdateOrder(orderList))
      setCartOrders([])
      return
    } 
    const orderList = {
      date: new Date().toLocaleDateString(),
      products: cartOrders,
    }
    console.log(orderList)
    dispatch(onAddNewOrder(orderList))
    setCartOrders([])
    // history.push('/')
  }

  const columns = [
    {
      name: 'brand',
      label: 'Brand',
      options: {
        filter: true,
      },
    },

    {
      name: 'model',
      label: 'Model',
      sort: true,
      sortDirection: 'asc',
      options: {
        filter: false,
      },
    },
    {
      name: 'cases',
      label: 'Accessories',
    },
    {
      name: 'quantity',
      label: 'Qty',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const id = tableMeta.rowData[5]
          const handleChange = (event) => {
            const prod = orders.find((item) => item.prodId === id)
            prod.quantity = event.target.value
            setOrders((prevOrders) => {
              const updatedOrders = prevOrders.map((item) => {
                if (item.prodId === id ) {
                  item.quantity = event.target.value
                }
                 
                return item
              })
              return updatedOrders
            })
          }

          return (
            <div className='d-flex' style={{ maxWidth: '100px' }}>
              <input
                className='form-control input-sm'
                type='number'
                size='sm'
                value={value}
                onChange={handleChange}
              />
            </div>
          )
        },
      },
    },
    {
      name: 'addToCartCheck',
      label: 'ADD',
      options: {
        customBodyRender: (value, dataIndex, updateValue) => {
          const id = dataIndex.rowData[5]
          const cases = dataIndex.rowData[2]
          const prod = orders.find((item) => item.prodId === id)
          return (
            <Button
              color='primary'
              className='btn-rounded'
              onClick={() => addToCartOrders(prod)}
            >
              Add
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

  return (
    <div className='page-content'>
      <div className='container-fluid'>
        <Breadcrumbs title='SQUARE ONE' breadcrumbItem='Order List' />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <div className='d-flex justify-content-between'>
                  <div className='d-flex'>
                    <select
                      defaultValue='0'
                      className='form-select'
                      //  style={{ border: 'none', outline: 'none' }}
                      onChange={(e) => filterAccessories(e.target.value)}
                    >
                      <option value='Regular Glass'>Regular Glass</option>
                      <option value='Top Glass'>Top Glass</option>
                      <option value='Privacy Glass'>Privacy Glass</option>
                      <option value='Silicone Case'>Silicone Case</option>
                      <option value='Clear Case'>Clear Case</option>
                      <option value='Punjab Case'>Punjab Case</option>
                      <option value='OVO Case'>OVO Case</option>
                      <option value='Jatt Life Case'>Jatt Life Case</option>
                      <option value='Clear Coat'>Clear Coat</option>
                    </select>
                  </div>
                  <Button
                    to='#'
                    // className='btn btn-success'
                    color = 'primary'
                    onClick={() => handlePlaceOrder()}
                  >
                    Place Order
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={7}>
            <MUIDataTable
              data={filteredProducts}
              columns={columns}
              className='shadow-none table'
              options={{
                autoWidth: true,
                responsive: 'standard',
                scroll: { maxHeight: '500px' },
                pagination: true,
                tableLayout: 'auto',
                selectableRows: 'none',
                filter: false,
                print: false,
                download: false,
                filterType: 'dropdown',
                sort: true,
                viewColumns: false,
              }}
            />
          </Col>
          <Col lg={5}>
            <Card>
              <CardBody>
                <h4 className='card-title'>Order List</h4>
                <Table className='table'>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Model</th>
                      <th>Accessory</th>
                      <th>Qty</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartOrders.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.model}</td>
                        <td>{item.cases}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <Button
                            color='danger'
                            className='btn-sm'
                            onClick={() => removeFromCartOrders(item)}
                          >
                            <i
                              className='bx bxs-trash'
                            ></i>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

const mapStatetoProps = state => {
  return {
    order:  state.orders.orders,
    user: state.users.user
  };
};
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(Order)));
