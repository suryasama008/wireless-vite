import React from "react";
import getChartColorsArray from "../../../components/Common/ChartsDynamicColor";
import ChartistGraph from "react-chartist";

const barchart = ({ dataColors, barChartData }) => {
  var barChartistColors = getChartColorsArray(dataColors)

  var barChartOptions = {
    low: 0,
    showArea: true,
    seriesBarDistance: 10,
  }

  return (
    <React.Fragment>
      <ChartistGraph
        style={{ height: '300px' }}
        data={barChartData}
        options={barChartOptions}
        type={'Bar'}
      />
    </React.Fragment>
  )
}

export default barchart;
