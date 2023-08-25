import React, { useState } from 'react'
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Input,
  Row,
  Col,
} from 'reactstrap'
import logo from "../../../assets/images/logo-light.png"
const EcommerceOrdersModal = props => {
  const { isOpen, toggle, product } = props
  const [sellPrice, setSellPrice] = useState(0)
  const [toggleSwitchSize, settoggleSwitchSize] = useState(true)
  const searchResults = {
    store: 'Apple',
    brand: 'Apple',
    model: 'iPhone 12',
    storage: '128GB',
    color: 'Black',
    condition: 'New',
    imei: '123456789012345',
    status: 'Available',
    sellingPrice: 500,
  }
const remarks =
  '1 year limited manufacture warranty. warranties to claimed through the original manufacturer any hardware/software issues can be directed to the manufacturer. all sales final. no refunds or returns.'
  return (
    <Modal
      isOpen={isOpen}
      role='dialog'
      autoFocus={true}
      centered={true}
      className='exampleModal'
      tabIndex='-1'
      toggle={toggle}
    >
      <div className='modal-content'>
        <ModalHeader toggle={toggle} >
          <h4>Product Sale</h4>
        </ModalHeader>
        <ModalBody>
          <div className='text-center mb-2'>
            <img src={logo} alt='' height='45' />
          </div>
          <Row className='mx-1'>
            <Col lg='6'>
              <div className='text-start'>
                <p className='mb-2'>
                  <input
                    type='text'
                    style={{ width: '50%', outline: 'none' }}
                    onChange={(e) => setSellPrice(e.target.value)}
                    outline='none'
                    className='form-control col-6'
                    placeholder='Emp Id'
                  />
                </p>
                <p className='mb-2'>
                  Emp Name: <span className='text-primary'>Surya</span>
                </p>
                <p className='mb-2'>
                  Product id: <span className='text-primary'>#SK2540</span>
                </p>
              </div>
            </Col>
            <Col lg='6'>
              <p className='mb-2 text-end'>
                Invoice: <span className='text-primary'>12345</span>
              </p>
              <p className='mb-2 text-end'>
                Date: <span className='text-primary'>12/12/2021</span>
              </p>
            </Col>
          </Row>

          <div className='table-responsive'>
            <Table className='table align-middle table-nowrap'>
              <thead>
                <tr>
                  <th scope='col'>Product Name</th>
                  <th scope='col'>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div>
                      <h5 className='text-truncate font-size-14'>
                        {product?.brand} {product?.model}
                      </h5>
                      <p className='text-muted mb-0'>
                        {product?.storage} {product?.color}{' '}
                        {product?.condition === 'USED' ? 'Used' : ''}
                      </p>
                      <p>
                        Imei:{' '}
                        <span className='text-primary'>{product?.imei}</span>
                      </p>
                    </div>
                  </td>
                  <td>$ {product?.sellingPrice}</td>
                </tr>
                <tr>
                  <td>
                    <div>
                      <h5 className='text-truncate font-size-14'>Sell</h5>
                    </div>
                  </td>
                 {product?.status === 'IN STOCK' ? <td>
                    <span>
                      <input
                        type='text'
                        style={{ width: '40%' }}
                        onChange={(e) => setSellPrice(e.target.value)}
                        className='form-control col-6'
                        placeholder='Sell Price'
                      />
                    </span>
                    <span>
                      <div className='form-check form-switch mb-3'>
                        <input
                          type='checkbox'
                          className='form-check-input'
                          id='customSwitchsizesm'
                          onClick={(e) => {
                            settoggleSwitchSize(!toggleSwitchSize)
                          }}
                        />
                        <label
                          className='form-check-label'
                          htmlFor='customSwitchsizesm'
                        >
                          Tax-In
                        </label>
                      </div>
                    </span>
                  </td> :
                    <td>
                      {product?.soldPrice}
                    </td>
                  }
                </tr>
              </tbody>
            </Table>

            <Row>
              <Col xs={7}>
                <p>{remarks.toUpperCase()}</p>
              </Col>
              <Col xs={5}>
                <Row>
                  <Col xs={5}>
                    <p>Sub total</p>
                    <p>HST #</p>
                    <p>Tax</p>
                    <p>Net Total</p>
                  </Col>
                  <Col xs={5}>
                    <p>
                      {toggleSwitchSize
                        ? sellPrice
                        : (sellPrice / 1.13).toFixed(2)}
                    </p>
                    <p>819582198</p>
                    <p>
                      {toggleSwitchSize
                        ? (sellPrice * 0.13).toFixed(2)
                        : (sellPrice - sellPrice / 1.13).toFixed(2)}
                    </p>
                    <p>
                      {!toggleSwitchSize
                        ? sellPrice
                        : (sellPrice * 1.13).toFixed(2)}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row>
            <hr className='my-4 border-bottom' />
            <div className='text-center text-muted mb-0'>
              <h5>Wireless +</h5>
              <p className='mb-2'>
                25 Peel Centre Dr, Bramalea City Center (LL)
              </p>
              <p className='mb-2'>Brampton, ON L6T 3R5</p>
              <p className='mb-2'>Phone: (905)230-8200</p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type='button' color='secondary' onClick={toggle}>
            Close
          </Button>
          {product?.status === 'SOLD' ? <Button type='button' color='success px-4' onClick={toggle}>
            Print
          </Button> :
          <Button type='button' color='primary px-4' onClick={toggle}>
            Sell
            </Button>
          }
        </ModalFooter>
      </div>
    </Modal>
  )
}

EcommerceOrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
}

export default EcommerceOrdersModal
