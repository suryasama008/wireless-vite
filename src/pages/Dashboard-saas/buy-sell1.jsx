import React, { useState, useEffect } from 'react'
import {
  Col,
  Card,
  CardBody,
  InputGroup,
  Button,
  Label,
  Row,
  Table,
  
} from 'reactstrap'
import OffCanvas from "./OffCanvas";
import { useSelector, useDispatch } from 'react-redux'

import EcommerceOrdersModal from "../Ecommerce/EcommerceOrders/EcommerceOrdersModal";
import { use } from "i18next";
const BuySell = ({items}) => {
  // Declare a new state variable, which we'll call "menu"
  const [activeTab, setactiveTab] = useState("1");
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [store, setStore] = useState('')
  const [isRight, setIsRight] = useState(false)
  const [modal1, setModal1] = useState(false)
const user = useSelector((state) => state.users.user)

useEffect(() => {
  setStore(user.store)
}, [user])

  function searchByImei(data, term) {
    // find the product with a peice
    // that matches the search term
    const result = data.filter(item => {
      if (item.imei && item.imei.includes(term)) {
        return item
      }
    })
    setSearchResults(result[0])
  //  setSearchResults(data.filter(item => item.imei.includes(imei))[0])
}
   const toggleRightCanvas = () => {
    if(store === searchResults?.store){
     setIsRight(!isRight)
    }
   }
  const toggleViewModal = () => setModal1(!modal1)

  const handleOffcanvas = () => {
    
    setIsRight(!isRight)
  }
  

  return (
    <React.Fragment>
      <EcommerceOrdersModal isOpen={modal1} toggle={toggleViewModal} product={ searchResults} />
      <Col xl='4'>
        <Card>
          <CardBody>
            <Row>
              <InputGroup className='mb-3'>
                <Label className='input-group-text'>IMEI</Label>
                <input
                  className='form-control me-auto'
                  type='text'
                  placeholder='Add your item here...'
                  aria-label='Add your item here...'
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <div className='hstack gap-3'>
                  <Button
                    type='button'
                    color='primary'
                    onClick={() => searchByImei(items, searchTerm)}
                    className='btn btn-primary'
                  >
                    Search
                  </Button>
                </div>
              </InputGroup>
            </Row>

            <Row className='text-start'>
        
            <Table striped bordered hover>
        <tbody>
          <tr>
            <td className='text-start'>Store</td>
            <td className='text-start'>{searchResults?.store}</td>
          </tr>
          <tr>
            <td className='text-start'>Brand</td>
            <td className='text-start'>{searchResults?.brand} - {searchResults?.model} </td>
          </tr>
          <tr>
            <td className='text-start'>Model</td>
            <td className='text-start'>
              {searchResults?.storage}
              {searchResults?.color} ({searchResults?.condition})
            </td>
          </tr>
          <tr>
            <td className='text-start'>Imei</td>
            <td className='text-start'>{searchResults?.imei}</td>
          </tr>
          <tr>
            <td className='text-start'>Status</td>
            <td className='text-start'>{searchResults?.status}</td>
          </tr>
              <tr>
                <td className='text-start'>Selling Price</td>
                <td className='text-start'>{searchResults?.sellingPrice}</td>
              </tr>
        </tbody>
      </Table>
      </Row>
            <div className='text-center'>
              <Button color='primary' onClick={toggleRightCanvas}>
                Sell <i className='mdi mdi-arrow-right ms-1'></i>
              </Button>
            </div>
            <OffCanvas
              isRight={isRight}
              toggleRightCanvas={toggleRightCanvas}
              searchResults={searchResults}
            />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
};

export default BuySell;
