import React, { useState, useMemo, useEffect } from 'react'
import {
  Card,
  CardBody,
} from 'reactstrap'
import TableContainer from "../../../components/Common/TableContainer";
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
import { db } from '../../../helpers/firebase'
import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

const ItemSearch = () => {
  const [items, setItems] = useState([])
  const [itemsList, setItemList] = useState([])

const itemsCollectionRef = collection(db, 'products')
const getItems = async () => {
  const itemQuery = query(itemsCollectionRef,
    where('status', '==', 'IN STOCK'),
  )
  const querySnapshot = await getDocs(itemsCollectionRef)
  const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  setItems(data)
}
useEffect(() => {
  getItems()
  const unsubscribe = () => {
    getItems()
  }
  return unsubscribe
}, [])

   const memoizedItems = useMemo(() => {
    if (items && items.length) {
      const newItemList = []
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
          newItemList.push(temp())
      })
  
      return newItemList;
    }
  }, [items]);
  
  useEffect(() => {
    if (memoizedItems) {
      setItemList(memoizedItems)
    }
  }, [memoizedItems])

  const columns = useMemo(
    () => [
      {
        Header: 'Store',
        accessor: 'store',
        filterable: true,
        Cell: (cellProps) => {
          return <Store {...cellProps} />
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
        Header: 'CP',
        accessor: 'price',
        filterable: true,
        Cell: (cellProps) => {
          return <Costprice {...cellProps} />
        }
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
        Header: 'Updated At',
        accessor: 'updatedAt',
        filterable: true,
        sort: false,
        // sortDirection: 'desc',
        Cell: (cellProps) => {
          return <UpdatedAt {...cellProps} />
        },
      },

    ],
    []
  )

  const options = {
    selectableRows: 'none',
    filterType: 'dropdown',
    rowsPerPage: 100,

  }

  return (
    <div className='page-content'>
        <Card>
          <CardBody>
            {items && (
              <TableContainer
                columns={columns}
                data={itemsList}
                isGlobalFilter={true}
                isAddOptions={false}
                isItemListGlobalFilter={true}
                options={options}
                customPageSize={100}
              />
            )}
          </CardBody>
        </Card>
    </div>
  )
}

export default ItemSearch

