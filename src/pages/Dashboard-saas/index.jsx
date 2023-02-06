import React, { useEffect,useState } from "react";
import { Container, Row, Col } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Components
import CardUser from "./card-user";
import CardWelcome from "./card-welcome";
import MiniWidget from "./mini-widget";
import Transactions from './transactions'
import Earning from "./earning";
import SalesAnalytics from "./sales-analytics";
import TotalSellingProduct from "./total-selling-product";
import Tasks from "./tasks";
import ChatBox from "./chat-box";
import Buysell from "./buy-sell";
import LatestTranaction from "./LatestTranaction";
import ActivityFeed from "./ActivityFeed";
import { useSelector, useDispatch } from 'react-redux'
import { getItems as onGetItems } from '../../store/actions'
const DashboardSaas = (props) => {
  const store = "EMTC"
  const [itemList, setItemList] = useState([])
/* This is a function that is used to calculate the number of items sold, revenue, and expenses per
month for the current year and last year. */
    const dispatch = useDispatch()
    const { items } = useSelector((state) => ({
      items: state.ItemReducer.items,
    }))
  const storeItems = items.filter((item) => item.store === store)

    useEffect(() => {
      dispatch(onGetItems())
    }, [dispatch])
 

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
    const date = new Date(item.updatedAt.seconds * 1000)
    const year = date.getFullYear()
    const month = date.getMonth()
    const buyDate = new Date(item.createdAt.seconds * 1000)
    const buyYear = buyDate.getFullYear()
    const buyMonth = buyDate.getMonth()
    let quantity = 0
    if (item.store === store) {
      if (buyYear === currentYear) {
        itemsExpensesPerMonthCurrentYear[buyMonth] += 1 * item.price
      }
      if (item.status === 'SOLD' && item.store === store) {
        if (year === currentYear) {
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
  const reports = [
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
      value: '$' + itemsRevenuePerMonthCurrentYear[currentMonth],
      badgeValue: '',
      color: 'success',
      desc: 'This Month',
    },
    {
      icon: 'bx bx-purchase-tag-alt',
      title: 'Expenses',
      value: '$' + itemsExpensesPerMonthCurrentYear[currentMonth],
      badgeValue: '',
      color: 'warning',
      desc: 'This Month',
    },
  ]

 
/* Filtering the items by status and condition and then grouping them by model and store. */


  useEffect(() => {
    const getItems = () => {
      //remove space after model "iPhone 11 Pro Max " => "iPhone11ProMax"
      const dataList = items.map((item) => {
        if (item.status === 'IN STOCK') {
          return {
            ...item,
            model: item.model.trim(),
          }
        }
      })
        
       const newItems = dataList.filter(
         (item) => item?.status === 'IN STOCK' && item.condition === 'NEW'
       )
       const usedItems = dataList.filter(
         (item) => item?.status === 'IN STOCK' && item.condition === 'USED'
       )
       const models = [
         ...new Set(
           items.map((item) => {
             if (item.status === 'IN STOCK') {
               return item.model
             }
           })
         ),
       ]
       const modelsArray = []

       models.forEach((model) => {
         //ignore space
         const newModel = newItems.filter((item) => item.model === model)
         const usedModel = usedItems.filter((item) => item.model === model)
         const stores = [...new Set(items.map((item) => item.store))]
         const storeObj = stores.map((store) => {
           const newStore = newModel.filter((item) => item.store === store)
           const usedStore = usedModel.filter((item) => item.store === store)
           //dont show store if no items
           if (newStore.length === 0 && usedStore.length === 0) {
             return
           }
           return `${store}(${newStore.length}, ${usedStore.length})`
         })
         //make a string of stores remove empty strings in the object
         const storeObjFiltered = storeObj.filter((item) => item !== undefined)

         const storeString = storeObjFiltered.join(', ')
         if (newModel.length + usedModel.length) {
           const modelObj = {
             model,
             new: newModel.length,
             used: usedModel.length,
             total: newModel.length + usedModel.length,
             store: storeString,
           }

           modelsArray.push(modelObj)
         }
       })

       //remove space at the end of model."IPHONE 11 " -> "IPHONE 11 "
       const modelsArrayFiltered = modelsArray.filter(
         (item) => item.model !== undefined
       )

       modelsArrayFiltered.sort((a, b) => a.total - b.total)
       return modelsArrayFiltered
     }
    const itemsArray = getItems()
    setItemList(itemsArray)
  }, [items])
  //meta title
  document.title =
    "Dashboard | Store Admin Dashboard ";

  return (
    <React.Fragment>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title='Dashboard' breadcrumbItem='EMTC' />
          {/* Card User */}
          <CardUser items={storeItems} />
          <Row>
            {/* welcome card */}
            <CardWelcome />

            <Col xl='8'>
              <Row>
                {/*mimi widgets */}
                <MiniWidget reports={reports} items={items} />
              </Row>
            </Col>
          </Row>
          <Row>
            <Buysell items={items} />

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
          <Row>
            <LatestTranaction itemList={itemList} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
};

export default DashboardSaas;
