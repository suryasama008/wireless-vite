import React from 'react'
import { Row, Col, Card, CardBody} from 'reactstrap'

const InStock = (props) => {

    const { items,store } = props

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

const reports = [
  {
    title: "Phones",
    icon: "bx bx-mobile",
    value: phoneCount,
    desc: "In Stock",
  },
    {
      title: "Tablets",
      icon: "dripicons-device-tablet",
      value: tabletCount,
      desc: "In Stock",
    },
    {
      title: "Accessories",
      icon: "bx bx-headphone",
      value: accessoryCount,
      desc: "In Stock",
    },
]
  return (
<React.Fragment>
      {reports.map((report, key) => (
        <Col sm="4" key={key}>
          <Card>
            <CardBody>
              <div className="d-flex align-items-center mb-3">
                <div className="avatar-xs me-3">
                  <span className="avatar-title rounded-circle bg-primary bg-soft text-primary font-size-18">
                    <i className={report.icon} />
                  </span>
                </div>
                <h5 className="font-size-14 mb-0">{report.title}</h5>
              </div>
              <div className="text-muted mt-4 ml-4">
                <h4>
                  {report.value}{" "}
                </h4>
                <div className="d-flex">
                  <span className="ms-2 text-truncate">{report.desc}</span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

export default InStock