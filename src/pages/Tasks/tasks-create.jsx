import React, { useState } from "react"
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Input,
  FormGroup,
  Label,
  Button,
} from "reactstrap"

// Import Editor
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

//Import Date Picker
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

//Import Breadcrumb
import Breadcrumbs from "/src/components/Common/Breadcrumb"

const TasksCreate = () => {

  //meta title
  document.title = "Create order | Wireless + - Vite React Admin & Dashboard Template";

  const inpRow = [{ type: "Privacy Tempered Glass", model: "Iphone 13 pro max" }, {
    type: "Premium Tempered Glass",
    model: "Iphone 12 pro"
  }, {
    type: "Punjab",
    model: "Iphone 12 pro max"
    },
    {
      type: "Ovo",
      model: "Iphone 11",
    },
  ]
  const [startDate, setstartDate] = useState(new Date())
  const [endDate, setendDate] = useState(new Date())
  const [inputFields, setinputFields] = useState(inpRow)
  const [count, setCount] = useState(2)

  const startDateChange = date => {
    setstartDate(date)
  }

  const endDateChange = date => {
    setendDate(date)
  }

  // Function for Create Input Fields
  function handleAddFields() {
    const item1 = { name: "", file: "" }
    setinputFields([...inputFields, item1])
  }

  // Function for Remove Input Fields
  function handleRemoveFields(idx) {
    document.getElementById("nested" + idx).style.display = "none"
  }

  return (
    <>
      <div className='page-content'>
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title='Orders' breadcrumbItem='Create Order' />

          <Row>
            <Col lg='12'>
              <Card>
                <CardBody>
                  <CardTitle className='mb-4'>Create New Order</CardTitle>
                  <form className='outer-repeater'>
                    <div data-repeater-list='outer-group' className='outer'>
                      <div data-repeater-item className='outer'>
                        <FormGroup className='mb-4' row>
                          <Label
                            htmlFor='taskname'
                            className='col-form-label col-lg-2'
                          >
                            order Name
                          </Label>
                          <Col lg='10'>
                            <Input
                              id='taskname'
                              name='taskname'
                              type='text'
                              className='form-control'
                              placeholder='Enter order Name...'
                            />
                          </Col>
                        </FormGroup>

                        <FormGroup className='mb-4' row>
                          <Label className='col-form-label col-lg-2'>
                            order Date
                          </Label>
                          <Col lg='10'>
                            <Row>
                              <Col md={6} className='pr-0'>
                                <DatePicker
                                  className='form-control'
                                  selected={startDate}
                                  onChange={startDateChange}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </FormGroup>

                        <div className='inner-repeater mb-4'>
                          <div className='inner form-group mb-0 row'>
                            <Label className='col-form-label col-lg-2'>
                              Add Order Items
                            </Label>
                            <div
                              className='inner col-lg-10 ml-md-auto'
                              id='repeater'
                            >
                              {inputFields.map((field, key) => (
                                <div
                                  key={key}
                                  id={'nested' + key}
                                  className='mb-3 row align-items-center'
                                >
                                  <Col md='4'>
                                    <input
                                      type='text'
                                      className='inner form-control'
                                      defaultValue={field.type}
                                      placeholder='Enter Name...'
                                    />
                                  </Col>
                                  <Col md='3'>
                                    <input
                                      type='text'
                                      className='inner form-control'
                                      defaultValue={field.model}
                                      placeholder='Enter Name...'
                                    />
                                  </Col>
                                  <div style={{ width: '150px' }}>
                                    <div className='input-group'>
                                      <div className='input-group-prepend'>
                                        <button
                                          type='button'
                                          className='btn btn-primary'
                                          onClick={() => {
                                           setCount(count - 1)
                                          }}
                                        >
                                          -
                                        </button>
                                      </div>
                                      <Input
                                        type='text'
                                        value={count}
                                        name='demo_vertical'
                                        readOnly
                                      />
                                      <div className='input-group-append'>
                                        <button
                                          type='button'
                                          className='btn btn-primary'
                                          onClick={() => {
                                            setCount(count + 1)
                                          }}
                                        >
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>

                                  <Col md='2'>
                                    <div className='mt-2 mt-md-0 d-grid'>
                                      <Button
                                        color='primary'
                                        className='inner'
                                        onClick={() => {
                                          handleRemoveFields(key)
                                        }}
                                        block
                                      >
                                        Delete
                                      </Button>
                                    </div>
                                  </Col>
                                </div>
                              ))}
                            </div>
                          </div>
                          <Row className='justify-content-end'>
                            <Col lg='10'>
                              <Button
                                color='success'
                                className='inner'
                                onClick={() => {
                                  handleAddFields()
                                }}
                              >
                                Add New Order
                              </Button>
                            </Col>
                          </Row>
                        </div>
                        <FormGroup className='mb-4' row>
                          <label
                            htmlFor='taskbudget'
                            className='col-form-label col-lg-2'
                          >
                            Order Instructions
                          </label>
                          <div className='col-lg-10'>
                            <Input
                              id='taskbudget'
                              name='taskbudget'
                              type='text'
                              placeholder='Enter order Instructions...'
                              className='form-control'
                            />
                          </div>
                        </FormGroup>
                      </div>
                    </div>
                  </form>
                  <Row className='justify-content-end'>
                    <Col lg='10'>
                      <Button type='submit' color='primary'>
                        Create order
                      </Button>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default TasksCreate
