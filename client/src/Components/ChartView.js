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
      startDate: "",
      salesData: [],
      dataType: "",
      cleanDataType: ""
    }
  }

  componentDidMount = () => {
    let data = this.props.dataForWeek;
    let dataType = this.props.dataType;
    let cleanDataType = parseDataTypeName(dataType);
    this.setState({
        startDate: data[0].data[0].date.toDateString(),
        dataType: dataType,
        cleanDataType: cleanDataType
    });
    this.getCompanySalesWeeklyTotal(data, dataType);
    this.getSalesDataByLocationByWeek(data[0], dataType);
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

  /*
  Param: weeksData, is an array of json objects. The first array should be the main object
  while consecutive elements stored in the array would be the other sales that are to be compared with
  the main sales data.

  This method sets the variables of totalCompanySalesByWeek and totalCompanySales

  totalCompanySalesByWeek will contain information which will be of the form:
  {
    [["x", "Sales starting from XX/XX/XXXX", "Sales starting from XX/XX/XXXX"], ------> This will function as the legend
    [0, sales1, sales2],  ----> the values in the array correspond vertically to the other arrays eg:
    [1, sales1, sales2],        x will have points on 0,1,2
    [2, sales1, sales2]]
   }

   totalCompanySales holds the total representation of the main sale's total

   For more info for how this works with the <Chart>
   refer to: https://react-google-charts.com/line-chart?fbclid=IwAR3zgNXq8eEnUxwXttmFs3bZO6TzaLne2tZCzXcC5rEqowRc8KcQ4Bmj7Ao
   */
  getCompanySalesWeeklyTotal(weeksData, dataType){
    let salesWeekly = getWeeklySales(weeksData[0].data, dataType);
    let totalCompanySales = getTotalSales(salesWeekly);
    // Above is the main data
    let salesDataGraphPrefix = [
      ["x", weeksData[0].data[0].date.toDateString() + " through " + weeksData[0].data[weeksData[0].data.length-1].date.toDateString()],
    ]
    // Concatenates the other weekly sales so that we can graph other trends
    for (let i = 1; i < weeksData.length; i++){
      let otherSalesWeekly = getWeeklySales(weeksData[i].data, dataType);
      for (let j = 0; j < salesWeekly.length; j++){
        salesWeekly[j].push(otherSalesWeekly[j][1]);
      }
      let date = weeksData[i].data[0].date;
      // This part adds on to the legend with what date the sales are counted from
      salesDataGraphPrefix[0].push(weeksData[i].data[0].date.toDateString() + " through " + weeksData[i].data[weeksData[i].data.length-1].date.toDateString());
    }

    // This combines the legend array (at the beginning)with the data array
    // to form a large array or arrays
    let salesGraphDataArray = salesDataGraphPrefix.concat(salesWeekly);

    this.setState({
      totalCompanySalesByWeek: salesGraphDataArray,
      totalCompanySales: this.toDollarString(totalCompanySales)
    });
  };

  /**
   * Takes a set of six weeks worth of data and parses it for
   * use in the main trends data table.
   * @param weeksData
   */
  getSalesDataByLocationByWeek(weeksData, dataType) {
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
            let date = location.days[i].date.toString();
            // Mon Apr 01 2019
            // 012345678901234
            let month = date.substring(4, 7);
            let day = parseInt(date.substring(8, 10));
            let endDay = day + 6;
            // let year = parseInt(date.substring(11, 15));
            let dateLabel = month + " " + day + "-" + endDay;
            // the cleanest way to include a line break was to allowHtml in the table options and have the break character
            let headerList = 'Week ' + weekNumber.toFixed(0) + '<br>' + dateLabel;
            locationSalesTableHeader.push({ type: 'number', label: headerList});
          }
        }
        let locationDaysData = location.days[i];
        locationTotal += locationDaysData[dataType];
        locationDataRow[weekNumber - 1].v += locationDaysData[dataType];
        locationDataRow[weekNumber - 1].f = this.toDollarString(locationDataRow[weekNumber - 1].v);
      }

      // here, the location names are Strings, but somehow they are rendered in the table with a line break...
      locationDataRow.unshift(location.name);
      locationDataRow.push({v: locationTotal, f: this.toDollarString(locationTotal)});

      perLocationSalesGraphData.push(locationDataRow);
    });

    locationSalesTableHeader.push({ type: 'number', label: 'Total' });

    perLocationSalesGraphData.unshift(locationSalesTableHeader);

    // Convert table graph data to line graph format
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

      graphData.unshift(["x", parseDataTypeName(dataType)]);
      
      companyPerWeekSalesGraphData.push({
        "name": companyName,
        "data": graphData,
        "cleanDataType": parseDataTypeName(dataType)
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
        <h2>Total {this.state.cleanDataType}: {this.state.totalCompanySales}</h2>
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
                allowHtml: true // for line breaks in table headers
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
                title: "Total Company " + this.state.cleanDataType + ": " + this.state.totalCompanySales,
                hAxis: {
                  title: "Weeks Since " + this.state.startDate
                },
                vAxis: {
                  title: this.state.cleanDataType + " (Dollars)"
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
                          <CompanyChart cleanDataType={companyGraphData.cleanDataType} key={index} name={companyGraphData.name} graphData={companyGraphData.data} />
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
function getWeeklySales(data, dataType) {
  let salesDataByDate = data; // see forEach(location ...
  let salesWeekly = [];

  // TODO salesDataByDate.length sometimes breaks for unknown reasons
  for (let i = 0; i < salesDataByDate.length; i++) { // go through a month day by day
    let weekNumber = Math.floor(i/7.0) + 1;
    if (salesWeekly.length < weekNumber) { // mapping a week to the amount of sales
      salesWeekly.push([weekNumber, 0]);
    }

    let dailyCompanySales = 0;
    // saleDataByDate contains a locations field, each of which has a netSales field
    salesDataByDate[i].locations.forEach(location => {
      dailyCompanySales += location[dataType];
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

function parseDataTypeName(dataType){
  dataType = dataType.charAt(0).toUpperCase() + dataType.slice(1); // sets first letter uppercase
  let cleanName = dataType.match(/[A-Z][a-z]+/g); // this seperates the words by UpperCase letters
  cleanName = cleanName.join(" "); //  joins them with a space
  return cleanName;
}

export default ChartView;
