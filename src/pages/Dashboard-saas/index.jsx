import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import CardUser from './card-user'

import InStock from './InStock'
import MiniWidget from './mini-widget'
import Earning from './earning'
import Buysell from './buy-sell'
import LocationBasedLogin from './LoginBasedLogin'

import { useSelector, useDispatch } from 'react-redux'
import {
  getItems as onGetItems,
} from '../../store/actions'
import { getUsersData as onGetUsers } from '../../store/actions'
import {getAdminProducts} from '../../helpers/DataContext'
import PropTypes from 'prop-types'

const DashboardSaas = ({ user, items, employees }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [store, setStore] = useState('BCC LL')
  const [itemList, setItemList] = useState([])
  const [storeItems, setStoreItems] = useState([])
  const [brandCount, setBrandCount] = useState([])
  const dispatch = useDispatch()

  const getProducts = async () => {
    const products = await getAdminProducts()
    console.log(products)
  }

  useEffect(() => {
    setStore(user.store)
    if(user.admin){
      getProducts()
    }else{
      dispatch(onGetItems(user.store))
    }
  }, [user])

  useEffect(() => {
    const storeItems = items.filter((item) => item.store === store && item.status === 'IN STOCK')
    const brandCounts = storeItems.reduce((brands, item) => {
      // Ensure the item has a brand
      if (item.brand && item.brand !== 'SERVICE PHONE') {
        // If this brand has been seen before, increment its count
        if (brands[item.brand]) {
          brands[item.brand]++
        } 
        // If this brand hasn't been seen before, initialise its count to 1
        else {
          brands[item.brand] = 1
        }
      }
      return brands
    }, [])
  
    // Convert the brand counts to the desired format
    const brandCountsArray = Object.entries(brandCounts).map(([name, value]) => ({ name, value }))
    setBrandCount(brandCountsArray)
  }, [items])

  
  const itemCalculations = useMemo(() => {
    let itemsSoldPerMonthCurrentYear = Array(12).fill(0)
    let itemsRevenuePerMonthCurrentYear = Array(12).fill(0)
    let itemsExpensesPerMonthCurrentYear = Array(12).fill(0)
    let itemsSoldPerMonthLastYear = Array(12).fill(0)
    let itemsRevenuePerMonthLastYear = Array(12).fill(0)
    const currentYear = new Date().getFullYear()
    const lastYear = currentYear - 1
    const currentMonth = new Date().getMonth()
    var temp
    items.forEach((item) => {
      const date = new Date(item.updatedAt?.seconds * 1000)
      const year = date.getFullYear()
      const month = date.getMonth()
      const buyDate = new Date(item.createdAt?.seconds * 1000)
      const buyYear = buyDate.getFullYear()
      const buyMonth = buyDate.getMonth()
    
      if (item.store === store) {
        if (buyYear === currentYear && !isNaN(item.price)) {
          itemsExpensesPerMonthCurrentYear[buyMonth] += 1 * Number(item.price)
        }
      
        if (item.status === 'SOLD' && item.store === store) {
          if(month === currentMonth){
            console.log('Year:', year, 'Month:', month);
            }
          if (year === currentYear && item.sell !== undefined) {
          
            itemsSoldPerMonthCurrentYear[month] += 1
            itemsRevenuePerMonthCurrentYear[month] += 1 * item.sell
          } else if (year === lastYear) {
            itemsSoldPerMonthLastYear[month] += 1
            itemsRevenuePerMonthLastYear[month] += 1 * item.sell
          }else{
            console.log('no items sold')
          }
        }
      }
    })
  
    return {
      itemsSoldPerMonthCurrentYear,
      itemsRevenuePerMonthCurrentYear,
      itemsExpensesPerMonthCurrentYear,
      itemsSoldPerMonthLastYear,
      itemsRevenuePerMonthLastYear,
      currentMonth
    }
  }, [items, store])

  
  const {
    itemsSoldPerMonthCurrentYear,
    itemsRevenuePerMonthCurrentYear,
    itemsExpensesPerMonthCurrentYear,
    itemsSoldPerMonthLastYear,
    itemsRevenuePerMonthLastYear,
    currentMonth
  } = itemCalculations
  console.log(itemsRevenuePerMonthCurrentYear)


  /* An array of objects that is used to render the mini widgets. */
  const reports = useMemo(
    () => [
      {
        icon: 'bx bx-copy-alt',
        title: 'Sold Phones',
        value: itemsSoldPerMonthCurrentYear[currentMonth],
        badgeValue: '',
        color: 'success',
        desc: 'This Month',
      },
      {
        icon: 'bx bx-archive-in',
        title: 'Revenue',
        value: '$' + itemsRevenuePerMonthCurrentYear[currentMonth].toFixed(2),
        badgeValue: '',
        color: 'success',
        desc: 'This Month',
      },
      {
        icon: 'bx bx-purchase-tag-alt',
        title: 'Expenses',
        value: '$' + itemsExpensesPerMonthCurrentYear[currentMonth].toFixed(2),
        badgeValue: '',
        color: 'warning',
        desc: 'This Month',
      },
    ],
    [
      itemsSoldPerMonthCurrentYear,
      itemsRevenuePerMonthCurrentYear,
      itemsExpensesPerMonthCurrentYear,
      currentMonth,
    ]
  )


  //meta title
  document.title = 'Dashboard | Store Admin Dashboard '


  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Card User */}
            <CardUser items={items} store={store} />
          <Row>
            {/* welcome card */}
            <Col xl='6'>
              <Row>
            <InStock items={items} store={store} />
              </Row>
            </Col>
            <Col xl='6'>
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={reports} items={items} />
              </Row>
            </Col>
          </Row>
          <Row>
            <Col xl='4'>
            <Buysell brandCount = {brandCount} />
            </Col>

            {/* earning */}
            <Earning
              dataColors='["--bs-primary"]'
              items={items}
              earnings={{
                itemsRevenuePerMonthLastYear: itemsRevenuePerMonthLastYear,
                itemsRevenuePerMonthCurrentYear:
                  itemsRevenuePerMonthCurrentYear,
              }}
            />
          </Row>
        </Container>
      </div>

      {/* Render EmployeeLoginModal */}

    </React.Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.users.user,
    items: state.ItemReducer.items,
    employees: state.users.employees || [],
  }
}

DashboardSaas.propTypes = {
  items: PropTypes.array.isRequired,
  employees: PropTypes.array.isRequired,
}

export default connect(mapStateToProps)(DashboardSaas)
