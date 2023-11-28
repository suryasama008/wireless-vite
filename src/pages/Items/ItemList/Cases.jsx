import React from 'react'
import {
    Col,
    Input,
    Row,
    UncontrolledTooltip,
    Card,
    CardHeader,
    CardBody,
    Button,
    Label,
    Form,
    Table,
    CardTitle
  } from 'reactstrap'
const Cases = () => {
  return (
    <div className='page-content'><Col lg={4}>
    <Card  className='mb-2'>
      <CardTitle className='mb-0 p-3 border-bottom bg-light'>
        <h5 className='mb-0'>Till</h5>
      </CardTitle>
      <CardBody>
      <Table striped bordered hover>
  <tbody>
    <tr>
      <td className='text-start'>Store</td>
    </tr>
    <tr>
      <td className='text-start'>Category</td>
    </tr>
    <tr>
      <td className='text-start'>Brand</td>
    </tr>
    <tr>
      <td className='text-start'>Model</td>
    </tr>
    <tr>
      <td className='text-start'>Color</td>
    </tr>
    <tr>
      <td className='text-start'>Storage</td>
    </tr>
    <tr>
      <td className='text-start'>Condition</td>
    </tr>
    <tr>
      <td className='text-start'>Status</td>
    </tr>
    <tr>
      <td className='text-start'>Battery</td>
    </tr>
        <tr>
          <td className='text-start'>CP</td>
        </tr>
        <tr>
          <td className='text-start'>Selling Price</td>
        </tr>
        <tr>
          <td className='text-start'>Supplier</td>
          <td className='text-start'>product?.supplier</td>
        </tr>
        <tr>
          <td className='text-start'>Contact</td>
        </tr>
        <tr>
          <td className='text-start'>Remarks</td>
        </tr>
        <tr>
          <td className='text-start'>CreatedBy</td>
        </tr>
        {/* {(addProducts || []).map((formRow, key) => (
            <tr key={key}>
              <td className='text-start'>IMEI/Serial No {key + 1}</td>
              <td className='d-flex'>
                <Col md='10'>
                {formRow.imei} 
                </Col>
                <Col md='2'>
                <Button color='primary'
              // className='m-4'
              // disabled = {!sold}
              onClick = {() => {
                printLabel(formRow.imei)
              }}
              >
                <i className='bx bx-printer '></i>
               </Button>
                </Col>
               </td>
            </tr>
          ))} */}
            </tbody>
           
            </Table>
            </CardBody>
        </Card>
      </Col></div>
  )
}

export default Cases