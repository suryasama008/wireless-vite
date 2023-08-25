import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import { auth } from '../../helpers/firebase'
import Breadcrumbs from '../../components/Common/Breadcrumb'
import CardUser from './card-user'
import CardWelcome from './card-welcome'
import InStock from './InStock'
import MiniWidget from './mini-widget'
import Transactions from './transactions'
import Earning from './earning'
import SalesAnalytics from './sales-analytics'
import TotalSellingProduct from './total-selling-product'
import Tasks from './tasks'
import ChatBox from './chat-box'
import Buysell from './buy-sell'
import LatestTranaction from './LatestTranaction'
import ActivityFeed from './ActivityFeed'
// import EmployeeLoginModal from './EmployeeLoginModal' // Import EmployeeLoginModal component
import { useSelector, useDispatch } from 'react-redux'
import {
  getItems as onGetItems,
} from '../../store/actions'
import { getUsersData as onGetUsers } from '../../store/actions'
import PropTypes from 'prop-types'

const DashboardSaas = ({ user, items, employees }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [store, setStore] = useState('BCC LL')
  const [itemList, setItemList] = useState([])
  const [storeItems, setStoreItems] = useState([])
  const [brandCount, setBrandCount] = useState([])

  const dispatch = useDispatch()
  // Employee login and attendance related code
  const [employeeLoginModal, setEmployeeLoginModal] = useState(true)
  const toggleEmployeeLoginModal = useCallback(() => {
    setEmployeeLoginModal(!employeeLoginModal)
  }, [employeeLoginModal])


  /* This is a function that is used to calculate the number of items sold, revenue, and expenses per
month for the current year and last year. */
useEffect(() => {
  dispatch(onGetItems(store))
  setIsLoading(false)
}, [dispatch])

  useEffect(() => {
    setStore(user.store)
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
    }, {})
  
    // Convert the brand counts to the desired format
    const brandCountsArray = Object.entries(brandCounts).map(([name, value]) => ({ name, value }))
    setBrandCount(brandCountsArray)
  }, [storeItems])

  
 

  /* This is a function that is used to calculate the number of items sold, revenue, and expenses per
month for the current year and last year. */
  let itemsSoldPerMonthCurrentYear = Array(12).fill(0)
  let itemsRevenuePerMonthCurrentYear = Array(12).fill(0)
  let itemsExpensesPerMonthCurrentYear = Array(12).fill(0)
  let itemsSoldPerMonthLastYear = Array(12).fill(0)
  let itemsRevenuePerMonthLastYear = Array(12).fill(0)
  const currentYear = new Date().getFullYear()
  const lastYear = currentYear - 1
  const currentMonth = new Date().getMonth()
  items.forEach((item) => {
    const date = new Date(item.updatedAt?.seconds * 1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const buyDate = new Date(item.createdAt?.seconds * 1000)
    const buyYear = buyDate.getFullYear()
    const buyMonth = buyDate.getMonth()
    if (item.store === store) {
      if (buyYear === currentYear) {
        itemsExpensesPerMonthCurrentYear[buyMonth] += 1 * item.price
      }
      if (item.status === 'SOLD' && item.store === store) {
        if (year === currentYear && item.sell !== undefined) {
          itemsSoldPerMonthCurrentYear[month] += 1
          itemsRevenuePerMonthCurrentYear[month] += 1 * item.sell
          // itemsExpensesPerMonthCurrentYear[buyMonth] += 1 * item.price
        } else if (year === lastYear) {
          itemsSoldPerMonthLastYear[month] += 1
          itemsRevenuePerMonthLastYear[month] += 1 * item.sell
        }
      }
    }
  })


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

  /* Filtering the items by status and condition and then grouping them by model and store. */

  useEffect(() => {
    const storeitems = items.filter((item) => item?.store === store)
    setStoreItems(storeitems)
  }, [items])

  //meta title
  document.title = 'Dashboard | Store Admin Dashboard '

  const handleAddToTheCollection = () => {
    items.map((item) => {
      if(item.store === 'BCC LL'){
        dispatch(onAddNewItem(item))
      }
    })
  }
  
  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <div className='page-content'>
        <button onClick={handleAddToTheCollection}>Add to the collection</button> 
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
