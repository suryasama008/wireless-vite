import React, { useState, useMemo, useEffect } from 'react'
import { Container, Row, Col, Card, CardBody, CardTitle, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { withTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import {
  getItems as onGetItems,
  deleteItem as onDeleteItem,
  addNewItem as onAddNewItem,
  updateItem as onUpdateItem,
} from '/src/store/actions'
const InvoiceGrid = ({items, user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [invoices , setInvoices] = useState([{
    model: 'iPhone 12',
    brand: 'Apple',
    imei: '1234567890',
    color: 'Space Gray',
    soldPrice: '$999',
    soldDate: '2023-06-15',

  }])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(onGetItems(user.store))
  }, [dispatch,user ])

  useEffect(() => {
    setInvoices(items)
  }, [user])
    
  // const [invoices, setInvoices] = useState([
  //   {
  //     id: 1,
  //     phoneName: 'iPhone 12',
  //     imei: '1234567890',
  //     color: 'Space Gray',
  //     soldPrice: '$999',
  //     soldDate: '2023-06-15',
  //   },
  //   // Add more invoice objects here
  // ]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='page-content'>
    <Container>
      <Row>
        <Col md={12} className="mb-4">
          <Input
            type="text"
            placeholder="Search by phone name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <Row>
        {filteredInvoices.map((invoice, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <CardBody>
                <CardTitle>{invoice.model}</CardTitle>
                <p>brand: {invoice.brand}</p>
                <p>{invoice.color} - {invoice.storage} - {invoice.condition} </p>
                <p>IMEI: {invoice.imei}</p>
                <p>Sold Price: {invoice.sell}</p>
                <p>Sold Date: {invoice.soldDate}</p>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return {
    items: state.ItemReducer.items,
    user: state.users.user,
  }
}
export default connect(
  mapStatetoProps,
  {}
)(withRouter(withTranslation()(InvoiceGrid)))


