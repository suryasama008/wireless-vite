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

//Import Images
import avatar1 from "../../assets/images/jobs.png"

function CardUser(props) {
  const [settingsMenu, setSettingsMenu] = useState(false)
  //Setting Menu
  const { items } = props
  const store = "EMTC"

  //category of Accesssories
  
  const tabletCount = items.filter((item) => item.category === "Tablets").length
  const accessoryCount = items.filter((item) => {
    if ((!item.storage && item.status === "IN STOCK")){
      return item
    }
  }).length
  const phoneCount = items.filter((item) => item.status !== "SOLD").length - tabletCount - accessoryCount

  return (
    <React.Fragment>
      <Row>
        <Col lg='12'>
          <Card>
            <CardBody>
              <Row>
                <Col lg='4'>
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
                        <h5 className='mb-1'>EMTC</h5>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg='4' className='align-self-center'>
                  <div className='text-lg-center mt-4 mt-lg-0'>
                    <Row>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Phones
                          </p>
                          <h5 className='mb-0'>{phoneCount}</h5>
                        </div>
                      </Col>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Accesssories
                          </p>
                          <h5 className='mb-0'>{accessoryCount}</h5>
                        </div>
                      </Col>
                      <Col xs='4'>
                        <div>
                          <p className='text-muted text-truncate mb-2'>
                            Tablets
                          </p>
                          <h5 className='mb-0'>{tabletCount}</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

                <Col lg='4' className='d-none d-lg-block'>
                  <div className='clearfix mt-4 mt-lg-0'>
                    <Dropdown
                      isOpen={settingsMenu}
                      toggle={() => {
                        setSettingsMenu(!settingsMenu)
                      }}
                      className='float-end'
                    >
                      <DropdownToggle tag='button' className='btn btn-primary'>
                        <i className='bx bxs-cog align-middle me-1' /> Setting
                      </DropdownToggle>
                      <DropdownMenu className='dropdown-menu-end'>
                        <DropdownItem href='#'>Action</DropdownItem>
                        <DropdownItem href='#'>Another action</DropdownItem>
                        <DropdownItem href='#'>Something else</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default CardUser
