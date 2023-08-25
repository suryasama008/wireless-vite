import { createContext, useContext, useEffect, useState } from 'react'
import { auth, db } from './firebase'
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
  orderBy,
  limit,
} from 'firebase/firestore'

const productCollectionRef = collection(db, 'products')

const getProducts = async (store) => {
  if(store === '') return []
  let prodQuery
  if(store){
    prodQuery = query(
      productCollectionRef, 
      where('store', '==', store),
      // orderBy('updatedAt', 'desc'),
      // limit(10)
    )
    console.log(prodQuery)
  }
  const data = await getDocs(prodQuery)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}
const getAdminProducts = async () => {
  // if(store === '') return []
  // let prodQuery
  // if(store){
  //   prodQuery = query(
  //     productCollectionRef, 
  //     where('store', '==', store),
  //     // orderBy('updatedAt', 'desc'),
  //     // limit(10)
  //   )
  //   console.log(prodQuery)
  // }
  const data = await getDocs(productCollectionRef)
  // console.log(data)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}
 
const addProduct = async (product) => {
  console.log(product)
  await addDoc(productCollectionRef, product)
}
const updateProduct = async (product, id) => {
  console.log(product.id)
  const userDoc = doc(productCollectionRef, product.id)
  // const newFields = { age: age + 1 } run
  await updateDoc(userDoc, product)
  console.log('product updated successfully')
}
const deleteProduct = async (prod) => {
  const userDoc = doc(productCollectionRef, prod.id)
  await deleteDoc(userDoc)
}
const modelCollectionRef = collection(db, 'models')
const getModels = async () => {
  const data = await getDocs(modelCollectionRef)
  return (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
}
const updateModels = async (model, id) => {
  const userDoc = doc(modelCollectionRef, model.id)
  await updateDoc(userDoc, model)
}

const addValuesCollectionRef = collection(db, 'addValues')

const getAddValues = async () => {
  const data = await getDocs(addValuesCollectionRef)
  return (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
}
const addAddValues = async (addValue) => {
  await addDoc(addValuesCollectionRef, addValue)
}

const updateAddValues = async (addValue, id) => {
  const userDoc = doc(addValuesCollectionRef, addValue.id)
  await updateDoc(userDoc, addValue)
}
const deleteAddValues = async (id) => {
  const userDoc = doc(addValuesCollectionRef, id)
  await deleteDoc(userDoc)
}

const usersCollectionRef = collection(db, 'users')

const getUserData = async (id) => {
 const productDoc = doc(usersCollectionRef, id)
 const productSnapshot = await getDoc(productDoc)
 if (productSnapshot.exists()) {
   return { ...productSnapshot.data(), id: productSnapshot.id }
 } else {
   console.log('No such document!')
   return null
 }
}
const employeeCollectionRef = collection(db, 'employees')

const getEmployees = async () => {
  const data = await getDocs(employeeCollectionRef)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const ordersCollectionRef = collection(db, 'orders')

const getOrders = async (date) => {
  const ordersQuery = query(ordersCollectionRef, where('date', '==', date))
  const data = await getDocs(ordersQuery)
  return data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
}

const addOrder = async (order) => {
  await addDoc(ordersCollectionRef, order)
}

const updateOrder = async (order, id) => {
  const orderDoc = doc(ordersCollectionRef, order.id)
  await updateDoc(orderDoc, order)
}

const deleteOrder = async (id) => {
  const orderDoc = doc(ordersCollectionRef, id)
  await deleteDoc(orderDoc)
}

export {
  getProducts,
  getAdminProducts,
  updateProduct,
  deleteProduct,
  getUserData,
  addProduct,
  getModels,
  updateModels,
  getAddValues,
  addAddValues,
  updateAddValues,
  deleteAddValues,
  getEmployees,
  getOrders,
  addOrder,
  updateOrder,
  deleteOrder,
}