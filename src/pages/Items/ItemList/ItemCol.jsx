import React from 'react'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const Store = (cell) => {
  return cell ? cell.value: ''
}

const Brand = (cell) => {
  return cell.value ? cell.value : ''
}
const Color = (cell) => {
  const uppercaseString = cell.value ? cell.value.toUpperCase() : ''
  return uppercaseString
}

const Storage = (cell) => {
  return cell.value ? cell.value : ''
}
const Imei = (cell) => {
  return cell.value ? cell.value : ''
}

const Battery = (cell) => {
  return cell.value ? cell.value + '%' : ''
}
const SellingPrice = (cell) => {
  return cell.value ?  '$ ' + cell.value: ''
}

const Status = (cell) => {
  if (cell.value === 'In Stock' || cell.value === 'IN STOCK') {
    return <Badge className='badge-soft-success'>In Stock</Badge>
  } else if (cell.value === 'Sold' || cell.value === 'SOLD') {
    return <Badge className='badge-soft-danger'>Sold</Badge>
  }
}
const Condition = (cell) => {
  return cell.value ? cell.value : ''
}
const Model = (cell) => {
  return cell.value ? cell.value : ''
}
const Costprice = (cell) => {
  return cell.value ? cell.value : ''
}
const UpdatedAt = (cell) => {
  return cell.value ? cell.value : ''
}

export {
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
}
