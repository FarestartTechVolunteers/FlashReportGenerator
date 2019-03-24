import React, { Component } from "react";
import Chart from "react-google-charts";
let total = 0;
let salesData = [];
class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompanySales: "Loading",
      totalCompanySalesByWeek: [],
      salesData: []
    }
  }

  componentDidMount = () => {
    console.log("dataForWeek", this.props.data);
    this.getSalesTotal(this.props.data);
    this.getCompanySalesTotal(this.props.data);
    this.getCompanySalesWeeklyTotal(this.props.data);
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

  getCompanySalesWeeklyTotal = weeksData => {
    console.log(weeksData);

    let salesDataByDate = weeksData.data;
    console.log("salesDataByDate");
    console.log(salesDataByDate);
    let salesWeekly = [];
    for (let i = 0; i < salesDataByDate.length; i++) {
      let weekNumber = Math.floor(i/7.0) + 1;
      if (salesWeekly.length < weekNumber) {
        salesWeekly.push([weekNumber, 0]);
      }

      let dailyCompanySales = 0;
      salesDataByDate[i].locations.forEach(location => {
        dailyCompanySales += location.netSales;
      });
      salesWeekly[weekNumber - 1][1] += dailyCompanySales;
    }

    let totalCompanySales = 0;
    salesWeekly.forEach(week => {
      totalCompanySales += week[1];
    });

    let salesDataGraphPrefix = [
      ["x", "Sales"],
      [0, totalCompanySales]
    ]
    let salesGraphDataArray = salesDataGraphPrefix.concat(salesWeekly);

    console.log(salesGraphDataArray);

    this.setState({
      totalCompanySalesByWeek: salesGraphDataArray
    });
  };

  getCompanySalesTotal = weeksData => {

    let totalCompanySales = 0;

    weeksData.locations.forEach(location => {
      location.days.forEach(day => {
        totalCompanySales += day.netSales;
      });
    });

    this.setState({
      totalCompanySales: this.toDollarString(totalCompanySales)
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

  toDollarString = dollarValue => {
    return ("$" + dollarValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'));
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
          data={this.state.totalCompanySalesByWeek}
          /*data={[
            ["x", "Sales"],
            [0, total],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9]
          ]}*/
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
