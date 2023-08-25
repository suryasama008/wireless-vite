import React, { useState } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"
import CardWelcome from "./card-welcome"

//Import Images
import avatar1 from "../../assets/images/jobs.png"

function CardUser(props) {
  const [settingsMenu, setSettingsMenu] = useState(false)
  //Setting Menu
  const { items,store} = props

  //category of Accesssories
  // console.log(items)
  // const tabletCount = items.filter((item) => item.category === "Tablets").length
  const tabletCount = items.filter((item) => {
    if (item.category === 'Tablets' && item.status === 'IN STOCK' && item.store === store) {
      return item
    }
  }).length
  const accessoryCount = items.filter((item) => {
    if (item.category === 'Accessories' && item.status === 'IN STOCK' && item.store === store) {
      return item
    }
  }).length
  const phoneCount = items.filter((item) => {
    if (item.status === 'IN STOCK' && item.store === store) {
      return item
    }
  }).length - tabletCount - accessoryCount

  return (
    <React.Fragment>
      <Row>
          <Card >
            <CardBody>
              <Row className="d-flex justify-between">
                <Col lg='8'>
                  <div className='d-flex'>
                    <div className='me-3'>
                      <img
                        src={avatar1}
                        alt=''
                        className='avatar-md rounded-circle img-thumbnail'
                      />
                    </div>
                    <div className='flex-grow-1 align-self-center'>
                      <div className='text-muted'>
                        <p className='mb-2'>Welcome to Store Dashboard</p>
                        <h5 className='mb-1'>{store}</h5>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg='4' className="mt-3 d-flex justify-content-end">
                 <CardWelcome />
                </Col>
              </Row>
            </CardBody>
          </Card>
      </Row>
    </React.Fragment>
  )
}

export default CardUser
