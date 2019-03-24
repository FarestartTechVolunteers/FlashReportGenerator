import React, { Component } from "react";
import Chart from "react-google-charts";
let total = 0;
let salesData = [];
class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompanySales: "Loading",
      salesData: []
    }
  }

  componentDidMount = () => {
    console.log("dataForWeek", this.props.data);
    this.getSalesTotal(this.props.data);
    this.getCompanySalesTotal(this.props.data);
  };

  fetchPreviousWeeks = num => {
    // fetch the num of previous weeks, num is input by the user
    // weeks need to have a start -7 and end -7 from the previous days array
    // return an array of weeksData
  };

  createSalesDataArray = weeksData => {
    // create object that looks like {[["x", "Sales"], [0, sales],[1, sales],[2, sales]]}
    // weeksData.forEach(getSalesTotal)
  };

  getCompanySalesTotal = weeksData => {
    console.log("getCompanySalesTotal");
    console.log("weeksData");
    console.log(weeksData);
    let totalCompanySales = 0;

    weeksData.locations.forEach(location => {
      location.days.forEach(day => {
        totalCompanySales += day.netSales;
      });
    });

    this.setState({
      totalCompanySales: "$" + totalCompanySales.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    });
  }

  getSalesTotal = weekData => {
    if (!data || !data.data) {
      return;
    }
    let total = 0;
    const { data } = weekData.data;
    console.log("WOKRING");
    data.data.forEach(day => {
      //   day.locations; // [{ name: "Maslows", netSales: 8419, budget: }]
      day.locations.forEach(location => {
        console.log("location", location);
        total += location.netSales;
        console.log("Total", total);
      });
    });
    // push sales number into salesData

    salesData.push([1, total]);
    return salesData;
  };

  render() {
    return (
      <div>
        <h1>Trends</h1>
        <Chart
          width={"600px"}
          height={"400px"}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          //data={salesData}
          data={[
            ["x", "Sales"],
            [0, total],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9]
          ]}
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
        <h2>Total Sales: {this.state.totalCompanySales}</h2>
        <h2>Sales Data: {salesData}</h2>
      </div>
    );
  }
}

export default ChartView;
