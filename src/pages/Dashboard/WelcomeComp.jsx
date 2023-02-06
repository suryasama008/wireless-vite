import React from "react"

import { Row, Col, Card, CardBody } from "reactstrap"
import { Link } from "react-router-dom"

import avatar1 from "../../assets/images/users/avatar-1.jpg"
import profileImg from "../../assets/images/jobs.png"

const WelcomeComp = () => {
  return (
    <React.Fragment>
      <Card className='overflow-hidden'>
        <div className='bg-primary bg-soft'>
          <Row>
            <Col xs='7'>
              <div className='text-primary p-3'>
                <h5 className='text-primary'>Welcome Back !</h5>
                <p>Store Dashboard</p>
              </div>
            </Col>
            <Col xs='5' className='align-self-end'>
              <img src={profileImg} alt='' className='img-fluid' />
            </Col>
          </Row>
        </div>
        <CardBody className='pt-0'>
          <Row>
            <Col sm='4'>
              <div className='avatar-md profile-user-wid mb-4'>
                <img
                  src={profileImg}
                  alt=''
                  className='img-thumbnail rounded-circle'
                />
              </div>
              <h5 className='font-size-15 text-truncate'>EMTC</h5>
              <p className='text-muted mb-0 text-truncate'>Amin</p>
              <p className='text-muted mb-0 text-truncate'>Rahil</p>
              <p className='text-muted mb-0 text-truncate'>Grumandeep</p>
            </Col>

            <Col sm='8'>
              <div className='pt-4'>
                <Row>
                  <Col xs='6'>
                    <h5 className='font-size-15'>1250</h5>
                    <p className='text-muted mb-0'>Products</p>
                  </Col>
                  <Col xs='6'>
                    <h5 className='font-size-15'>$1245</h5>
                    <p className='text-muted mb-0'>Todays Revenue</p>
                  </Col>
                </Row>
                <div className='mt-4'>
                  <Link to='' className='btn btn-primary  btn-sm'>
                    Employee Login <i className='mdi mdi-arrow-right ms-1'></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp
