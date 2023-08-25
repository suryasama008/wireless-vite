
import React, { useEffect, useState } from 'react';

import { Data } from '../context/DataContext';
import { UserAuth } from '../context/AuthContext';
import MUIDataTable from 'mui-datatables'
import moment from 'moment'
import ProductDailog from './Dialog/ProductDailog';

const Main = () => {
  const { users, productData, loadProductData } = Data()
  const { user } = UserAuth()
  const [store, setStore] = useState("")
  const [products, setProducts] = useState(null)
  const [productId, setProductId] = useState(null)
  const [product, setProduct] = useState(null)
  const [showStore, setShowStore] = useState(false)
  const [invoiceNumber, setInvoiceNumber] = useState(null)

  useEffect(() => {
    loadProductData()
  }, [])

  useEffect(() => {
    setProducts(productData)
    setStore(users.filter((item) => item?.id === user?.uid)[0]?.store)
    setShowStore(users.filter((item) => item?.id === user?.uid)[0]?.admin)
    setInvoiceNumber(productData?.filter((item) => item?.status === "SOLD").length + 1)
  }, [productData, users, user, loadProductData])
  const dateFormat = 'DD/MM/YYYY'
// console.log(invoiceNumber)
  const columns = [
    {
      name: 'store',
      label: 'STORE',
      options: {
        filter: true,
        sort: true,
        filterList: [store],
        // options: { sortDirection: "asc" },
      },
    },
    {
      name: 'brand',
      label: 'BRAND',

      options: {
        filter: true,
        sort: true,

        options: { sortDirection: 'desc' },
      },
    },
    {
      name: 'model',
      label: 'MODEL',
      options: {
        filter: false,
        sort: true,
        // options: { sortDirection: "asc" },
      },
    },
    {
      name: 'color',
      label: 'COLOR',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'storage',
      label: 'STORAGE',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'imei',
      label: 'IMEI',
      options: {
        filter: false,
        sort: false,
      },
    },
    {
      name: 'condition',
      label: 'CONDITION',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'status',
      label: 'STATUS',
      options: {
        filter: true,
        sort: false,
        filterList: ['IN STOCK'],
      },
    },
    {
      name: 'price',
      label: 'COST PRICE',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'sellingPrice',
      label: 'SELLING PRICE',
      options: {
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'sell',
      label: 'SOLD PRICE',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'purchase',
      label: 'PURCHASE',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'battery',
      label: 'BATTERY',
      options: {
        display: true,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'remarks',
      label: 'REMARKS',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'soldRemarks',
      label: 'SOLD REMARKS',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },

    {
      name: 'soldDate',
      label: 'SOLD DATE',
      options: {
        display: false,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'supplier',
      label: 'SUPPLIER',
      options: {
        display: true,
        filter: false,
        sort: true,
      },
    },
    {
      name: 'phoneNo',
      label: 'PHONE NUMBER',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
    {
      name: 'updatedAt',
      label: 'UPDATED AT',
      options: {
        // display: false,
        filter: false,
        sort: true,
        sortOrder: { direction: 'asc' },
        customBodyRender: (data, dataIndex, rowIndex) => {
          var date = handleDate(data)

          return <>{date}</>
        },
      },
    },
    {
      name: 'id',
      label: 'N/A',
      options: {
        display: false,
        filter: false,
        sort: false,
      },
    },
  ]

  const handleDate = (data) => {
    var seconds = data.seconds
    var formatted = moment.utc(seconds * 1000).format(dateFormat)
    return formatted
  }
  const handleRowClick = (rowData) => {
     
    if (store === rowData[0] || showStore) {     
      setProductId(rowData[rowData.length - 1])
       const prod = products.filter(
         (item) => item.id === rowData[rowData.length - 1]
       )
      setProduct(prod[0])
      console.log(prod[0])
     }
   }

  const options = {
    selectableRows: 'none',
    onRowClick: handleRowClick,
    filterType: 'dropdown',
    sortOrder: { name: 'updatedAt', direction: 'desc' },
  }


  return (
    <div className=' h-screen m-10 z-0'>
      {productId && (
        <ProductDailog
          product={product}
          content='dashboard'
          setProductId={setProductId}
          loadProductData={loadProductData}
          invoiceNumber={invoiceNumber}
        />
      )}
      {products && (
        <MUIDataTable
          data={products}
          columns={columns}
          options={options}
          className='border-t border-gray-300'
        />
      )}
    </div>
  )
};

export default Main;
// data={!instockSold ?  inStockItems : outStockItems}