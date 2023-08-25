import React from 'react'
import Pie from "../AllCharts/echart/piechart"
import { Card, CardBody, CardTitle, Container } from "reactstrap"


const BuySell = ({brandCount}) => {
  return (
    <div>
           <Card>
                <CardBody>
                  <CardTitle>Brands Count</CardTitle>
                  <div id="pie-chart" className="e-chart">
                    <Pie dataColors='["--bs-primary","--bs-warning", "--bs-danger","--bs-info", "--bs-success"]' brandCount= {brandCount}/>
                  </div>
                </CardBody>
              </Card>
    </div>
  )
}

export default BuySell