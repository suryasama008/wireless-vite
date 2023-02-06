import React, { useState } from "react";
import {
  Col,
  Card,
  CardBody,
  InputGroup,
  Button,
  Label,
  Input,
  FormGroup,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Table,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  UncontrolledDropdown,
} from 'reactstrap'
import classnames from "classnames";
import { Link } from 'react-router-dom'
import OffCanvas from "./OffCanvas";
import ProductSell from "./ProductSell";
const BuySell = ({items}) => {
  // Declare a new state variable, which we'll call "menu"
  const [activeTab, setactiveTab] = useState("1");
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
   const [isRight, setIsRight] = useState(false)
function searchByImei(data, imei) {
   setSearchResults(data.filter(item => item.imei.includes(imei))[0])
}
   const toggleRightCanvas = () => {
     setIsRight(!isRight)
   }
// console.log(searchByImei(items, '012345678901253'))

  return (
    <React.Fragment>
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
              <ProductSell searchResults={searchResults} />
            </Row>

            <div className='text-center'>
              <Button color='primary' onClick={() => {
                if(searchResults) toggleRightCanvas()
              }
              }>
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
