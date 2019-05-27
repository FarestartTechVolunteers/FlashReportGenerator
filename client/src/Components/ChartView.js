import React, { Component } from "react";
import Chart from "react-google-charts";

import CompanyChart from "./CompanyChart";


let total = 0;
let salesData = [];
class ChartView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCompanySales: "Loading",
      totalCompanySalesByWeek: [],
      salesDataByLocationByWeek: [],
      companyPerWeekSalesGraphData: [],
      salesData: []
    }
  }

  componentDidMount = () => {
    let data = this.props.dataForWeek;
    this.getCompanySalesWeeklyTotal(data);
    this.getSalesDataByLocationByWeek(data[0]);
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
    let salesWeekly = getWeeklySales(weeksData[0].data);
    let totalCompanySales = getTotalSales(salesWeekly);
    let salesDataGraphPrefix = [
      ["x", "Sales of " + weeksData[0].data[0].date.getFullYear()],
    ]
    // Concats the other weekly sales so that we can graph other trends
    for (let i = 1; i < weeksData.length; i++){
      let otherSalesWeekly = getWeeklySales(weeksData[i].data);
      for (let j = 0; j < salesWeekly.length; j++){
        salesWeekly[j].push(otherSalesWeekly[j][1]);
      }
      salesDataGraphPrefix[0].push("Sales of " + weeksData[i].data[0].date.getFullYear());
    }

    let salesGraphDataArray = salesDataGraphPrefix.concat(salesWeekly);
    this.setState({
      totalCompanySalesByWeek: salesGraphDataArray,
      totalCompanySales: this.toDollarString(totalCompanySales)
    });
  };

  getSalesDataByLocationByWeek = weeksData => {

    let perLocationSalesGraphData = [];
    let locationSalesTableHeader = [{ type: 'string', label: 'Location' }];

    weeksData.locations.forEach(location => {
      let locationDataRow = [];
      let locationTotal = 0;  

      for (let i = 0; i < location.days.length; i++) {
        let weekNumber = Math.floor(i/7.0) + 1;
        if (locationDataRow.length < weekNumber) {
          locationDataRow.push({v: 0, f: '$0'});

          if (locationSalesTableHeader.length - 1 < weekNumber) {
            locationSalesTableHeader.push({ type: 'number', label: 'Week ' + weekNumber.toFixed(0)});
          }
        }
        locationTotal += location.days[i].netSales;
        locationDataRow[weekNumber - 1].v += location.days[i].netSales;
        locationDataRow[weekNumber - 1].f = this.toDollarString(locationDataRow[weekNumber - 1].v);
      }

      locationDataRow.unshift(location.name);
      locationDataRow.push({v: locationTotal, f: this.toDollarString(locationTotal)});

      perLocationSalesGraphData.push(locationDataRow);
    });

    locationSalesTableHeader.push({ type: 'number', label: 'Total' });

    perLocationSalesGraphData.unshift(locationSalesTableHeader);

    // Convert table gragh data to line graph format
       let companyPerWeekSalesGraphData = [];

    // i = 1 & j = 1 to discard the unwanted line graph header data
    for (let i = 1; i < perLocationSalesGraphData.length; i++) {
      let companyName = perLocationSalesGraphData[i][0];
      let graphData = [];
      let locationTotalSales = 0;

      // .length - 1 to remove table graph's "total" value
      for (let j = 1; j < perLocationSalesGraphData[i].length - 1; j++) {
        graphData.push([j, perLocationSalesGraphData[i][j].v]);
        locationTotalSales += perLocationSalesGraphData[i][j].v;
      }

      graphData.unshift(["x", "Sales"]);
      
      companyPerWeekSalesGraphData.push({
        "name": companyName,
        "data": graphData
      });
    }

    this.setState({
      salesDataByLocationByWeek: perLocationSalesGraphData,
      companyPerWeekSalesGraphData: companyPerWeekSalesGraphData
    });
  };

  
  toDollarString = dollarValue => {
    return ("$" + dollarValue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')).slice(0, -3);
  };

  render() {
    return (
      <div>
        <h2>Total Sales: {this.state.totalCompanySales}</h2>
        <div className='flex flex-wrap items-center justify-around'>
          <div className='flex-0 outline'>
            <Chart
              width={'100%'}
              height={'100%'}
              chartType="Table"
              loader={<div>Loading Chart</div>}
              data={this.state.salesDataByLocationByWeek}
              options={{
                showRowNumber: false,
              }}
              rootProps={{ 'data-testid': '1' }}
            />
          </div>
          <div className='flex-0'>
            <Chart
              width={"600px"}
              height={"400px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.totalCompanySalesByWeek}
              options={{
                title: "Total Company Sales: " + this.state.totalCompanySales,
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
          </div>
        </div>



        <h2>Per Location Graph</h2>
        <div class="flex flex-wrap justify-around outline">
          {this.state.companyPerWeekSalesGraphData.map(
            function(companyGraphData, index){
                      return (
                        <div class="w-33 pa0 mr0">
                          <CompanyChart key={index} name={companyGraphData.name} graphData={companyGraphData.data} />
                        </div>
                      );
                    })
          }
        </div>
      </div>
    );
  }
}
////////////////////////////////////////////////////////////////
////////////////////////Methods/////////////////////////////////
////////////////////////////////////////////////////////////////
function getWeeklySales(data) {
  let salesDataByDate = data; // see forEach(location ...
  let salesWeekly = [];
  for (let i = 0; i < salesDataByDate.length; i++) { // go through a month day by day
    let weekNumber = Math.floor(i/7.0) + 1;
    if (salesWeekly.length < weekNumber) { // mapping a week to the amount of sales
      salesWeekly.push([weekNumber, 0]);
    }

    let dailyCompanySales = 0;
    // saleDataByDate contains a locations field, each of which has a netSales field
    salesDataByDate[i].locations.forEach(location => {
      dailyCompanySales += location.netSales;
    });
    salesWeekly[weekNumber - 1][1] += dailyCompanySales;
  }
  return salesWeekly;
}

function getTotalSales(salesWeekly){
  let totalCompanySales = 0; // TODO: why have this outside the original loop?
  salesWeekly.forEach(week => {
    totalCompanySales += week[1];
  });
  return totalCompanySales;
}

export default ChartView;
