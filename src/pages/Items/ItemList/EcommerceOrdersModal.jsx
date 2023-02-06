import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Row,
  Label,
  Input,
} from "reactstrap"
import img7 from "../../../assets/images/product/img-7.png"
import img4 from "../../../assets/images/product/img-4.png"

const EcommerceOrdersModal = props => {
  const { isOpen, toggle, item } = props
  const empName = ""
  console.log(item)
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
        <ModalHeader toggle={toggle}>Order Details</ModalHeader>
        <ModalBody>
          <p className='mb-2'>
            Product id: <span className='text-primary'>#WP-P{item?.id}</span>
          </p>
          <p className=''>
            Added by: <span className='text-primary'>Rahil</span>
          </p>
          <Input
            type='text'
            className='form-control form-control-sm w-25 mb-2'
            id='autoSizingInput'
            placeholder='Emp Id'
          />
          {empName && (
            <p>
              Emp Name:  <span className='text-primary'>{empName}</span>{' '}
            </p>
          )}
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
                      <h1 className='text-truncate font-size-14'>
                        {item?.model }
                      </h1>
                      <p className='text-muted mb-0 mt-2'>Storage: {item?.storage}</p>
                      <p className='text-muted mb-0 mt-2'>Color: {item?.color}</p>
                      <p className='text-muted mb-0 mt-2'>Imei: { item?.imei}</p>
                    </div>
                  </td>
                  <td>{item?.sellingPrice}</td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <h6 className='m-0 text-end'>Sub Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <h6 className='m-0 text-end'>Shipping:</h6>
                  </td>
                  <td>Free</td>
                </tr>
                <tr>
                  <td colSpan='2'>
                    <h6 className='m-0 text-end'>Total:</h6>
                  </td>
                  <td>$ 400</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type='button' color='secondary' onClick={toggle}>
            Close
          </Button>
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
