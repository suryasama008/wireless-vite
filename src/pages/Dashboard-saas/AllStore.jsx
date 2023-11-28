import React,{useState, useEffect} from 'react'
import { useSelector, useDispatch, connect } from 'react-redux'
import { auth, db } from '../../helpers/firebase'
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy
} from 'firebase/firestore'
import {
    Col,
    Row,
    Card,
    CardBody,
    Table,
    CardTitle,
    Button,
    Badge
  } from 'reactstrap'
import moment from 'moment'
const AllStore = () => {
   const [todaysItems, setTodaysItems] = useState(null)
   const [todaysAddedItems, setTodaysAddedItems] = useState(null)
   const [todaysSoldItems, setTodaysSoldItems] = useState(null)
  const [store, setStore] = useState('')

   const user = useSelector((state) => state.users.user)
    useEffect(() => { 
        setStore(user.store)
    }, [user])

    const getTodaysItems = async () => {
        const soldItemsCollectionRef = collection(db, 'products')
        const date = moment().format('DD-MM-YYYY')
        const soldquery = query(soldItemsCollectionRef,
          where('soldDate', '==', moment().format('DD-MM-YYYY')),
        )
        const Addedquery = query(soldItemsCollectionRef,
            where('updatedDate', '==', moment().format('DD-MM-YYYY')),
          )
        const data = await getDocs(soldquery)
        const addedData = await getDocs(Addedquery)
        const todaysAddedData = addedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const todaysStoreData = todaysAddedData.filter((item) => item.store === store)
        const todaysData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        const todaysSoldItems = todaysData.filter((item) => item.store === store)
        const sortedData = todaysData.sort((a, b) => a.store.localeCompare(b.store));
        setTodaysItems(sortedData)
        setTodaysSoldItems(todaysSoldItems)
        setTodaysAddedItems(todaysStoreData)
        }
        useEffect(() => {
            getTodaysItems()
                const unsubscribe = () => {
                  getTodaysItems()
                }
                return unsubscribe
          }, [store])
          console.log(todaysItems)
  return (
    <div className='page-content'>
     <Row>
        <Col lg={6}> 
        <Card>
        <CardTitle className='mb-0 p-3 border-bottom bg-light'>
        <h5 className='mb-0'>Today's Sale</h5>
      </CardTitle>
            <CardBody>
                <Table className="table">
                    <thead>
                        <tr>
                            <td><h6>Srore</h6></td>
                            <td><h6>Model</h6></td>
                            <td><h6>Storage</h6></td>
                            <td><h6>Condition</h6></td>
                            <td><h6>Sell Price</h6></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                   todaysItems && todaysItems.map((item) => (
                        <tr key={item.id}>
                        <td>{item.store}</td>
                        <td>{item.model}</td>
                        <td>{item.storage}</td>
                        <td>{item.condition}</td>
                        <td>{item.soldPrice}</td>
                        </tr>
                    )) 
                    }
                    </tbody>
                </Table>
            </CardBody>
        </Card>
            </Col>
            <Col lg={6}>
                <Card>
                <CardTitle className='mb-0 p-3 border-bottom bg-light'>
                    <h5 className='mb-0'>Today's Store Inventory</h5>
                </CardTitle>
                <CardBody>
                <Table className="table">
                    <thead>
                        <tr>
                            <td><h6>Brand</h6></td>
                            <td><h6>Model</h6></td>
                            <td><h6>Storage</h6></td>
                            <td><h6>Condition</h6></td>
                            <td><h6>Action</h6></td>
                        </tr>
                    </thead>
                    <tbody>
                    {
                todaysAddedItems && todaysAddedItems.map((item) => (
                        <tr key={item.id}>
                        <td>{item.brand}</td>
                        <td>{item.model}</td>
                        <td>{item.storage}</td>
                        <td>{item.condition}</td>
                        {item.status === 'IN STOCK' ? <td className='badge-soft-success'><h6>Added</h6></td> :<td className='badge-soft-danger'><h6>Sold</h6></td>}
                        </tr>
                    )) 
                    }
                    </tbody>
                </Table>
                </CardBody>
                </Card>
            </Col>
            </Row>

        </div>
  )
}

export default AllStore