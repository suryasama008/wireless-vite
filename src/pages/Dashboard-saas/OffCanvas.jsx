import React from 'react'
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
import ProductSell from './ProductSell'
const OffCanvas = ({ isRight, toggleRightCanvas, searchResults }) => {
  return (
    <div>
      <Offcanvas isOpen={isRight} direction='end' toggle={toggleRightCanvas}>
        <OffcanvasHeader toggle={toggleRightCanvas}>
          Offcanvas Right
        </OffcanvasHeader>
              <ProductSell searchResults={searchResults} isOffCanvas = "offCanvas"/>
              {console.log(searchResults?.price)}
      </Offcanvas>
    </div>
  )
}

export default OffCanvas