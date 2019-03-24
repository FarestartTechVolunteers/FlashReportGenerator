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
      <div>
        <p>{this.props.name}</p>
        <Chart
          width={"600px"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={this.props.graphData}
          options={{
            chart: { title: "Total Company Sales" },
            hAxis: {
              title: "Weeks"
            },
            vAxis: {
              title: "Sales Dollars"
            }
          }}
          rootProps={{ "data-testid": "1" }}
        />
    </div>
    );
  }
}

export default CompanyChart;
