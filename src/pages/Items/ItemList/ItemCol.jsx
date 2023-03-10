import React from 'react'
import { Badge } from 'reactstrap'
import { Link } from 'react-router-dom'

const Store = (cell) => {
  return cell.value ? cell.value : ''
}

const Brand = (cell) => {
  return cell.value ? cell.value : ''
}
const Color = (cell) => {
  return cell.value ? cell.value : ''
}

const Storage = (cell) => {
  return cell.value ? cell.value : ''
}
const Imei = (cell) => {
  return cell.value ? cell.value : ''
}

const Battery = (cell) => {
  return cell.value ? cell.value : ''
}
const SellingPrice = (cell) => {
  return cell.value ? cell.value : ''
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

const UpdatedAt = (cell) => {
  var date = new Date(cell.value.seconds * 1000 + cell.value.nanoseconds / 1000000);
  return date.toLocaleDateString();
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
  UpdatedAt,
}
