import React, { Component } from "react";
import Chart from "react-google-charts";

class CompanyChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
        <Chart
          width={"100%"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={this.props.graphData}
          options={{
            title: this.props.name + " Sales",
            legend: "none",
            hAxis: {
              title: "Weeks"
            },
            vAxis: {
              title: "Sales Dollars"
            }
          }}
          rootProps={{ "data-testid": "1" }}
        />
    );
  }
}

export default CompanyChart;
