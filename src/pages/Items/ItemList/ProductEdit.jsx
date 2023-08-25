import React, {useEffect, useState} from 'react'
import ProductForm from './ProductForm'
import { useParams } from 'react-router';
const ProductEdit = () => {
    const { id } = useParams()
  return (
    <div>
        <ProductForm id = {id} /> 
    </div>
  )
}

export default ProductEdit