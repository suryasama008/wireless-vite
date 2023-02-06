import React from "react"
import { Row, Col, Card } from "reactstrap"
import { Link } from 'react-router-dom'
//Import Images
import profileImg from "../../assets/images/profile-img.png"

function CardWelcome(props) {
  return (
    <React.Fragment>
      <Col xl='4'>
        <Card className='bg-primary bg-soft'>
          <div>
            <Row>
              <Col xs='7'>
                <div className='text-primary p-3'>
                  <h5 className='text-primary'>Welcome Back !</h5>
                  <ul className='ps-3 mb-0'>
                    <li className='py-1'>Amin</li>
                    <li className='py-1'>Rahil</li>
                    <li className='py-1'>Gurmandeep</li>
                  </ul>         
                    <Link to='' className='btn btn-primary  btn-sm'>
                      Employee Login{' '}
                      <i className='mdi mdi-arrow-right ms-1'></i>
                    </Link>
                </div>
              </Col>
              <Col xs='5' className='align-self-end'>
                <img src={profileImg} alt='' className='img-fluid' />
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default CardWelcome;