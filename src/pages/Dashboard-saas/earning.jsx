import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";
import BarChart from '../AllCharts/chartist/barchart'
//actions
import { getEarningChartsData } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import getChartColorsArray from "../../components/Common/ChartsDynamicColor";

const Earning = ({ dataColors, items, earnings }) => {
const {itemsRevenuePerMonthLastYear, itemsRevenuePerMonthCurrentYear} = earnings

var barChartData = {
  labels: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  series: [itemsRevenuePerMonthLastYear, itemsRevenuePerMonthCurrentYear],
  color: ['--bs-primary, --bs-success'],
  options: {
    low: 0,
    showArea: true,
    seriesBarDistance: 10,
    tooltip: {
      y: {
        formatter: function (val) {
          return '$ ' + val + ' thousands'
        },
      },
    },
  },
}

  return (
    <React.Fragment>
      <Col xl='8'>
        <Card>
          <CardBody>
            <div className='clearfix'>
              <div className='float-end'>
                <div className='input-group input-group-sm'>
                  <label className='input-group-text'>Month</label>
                  {/* </div> */}
                </div>
              </div>
              <h4 className='card-title mb-4'>Earning</h4>
            </div>

            <Row>
              <Col lg='12 h-16'>
                <div id='line-chart' dir='ltr'>
                  <BarChart
                    dataColors='["--bs-primary, --bs-success"]'
                    barChartData = {barChartData}
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
};

export default Earning;
