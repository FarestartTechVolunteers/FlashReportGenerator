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
      cleanDataType: "",
      overLapOptions: [],
      weeksToGoBack: 5
    }
  }

  componentDidMount = () => {
    let data = this.props.dataForWeek;
    let dataType = this.props.dataType;
    let overLapOptions = this.props.overLapOptions;
    let cleanDataType = parseDataTypeName(dataType);
    this.setState({
        startDate: data[0].data[0].date.toDateString() + " - " +  data[0].data[data[0].data.length-1].date.toDateString(),
        dataType: dataType,
        cleanDataType: cleanDataType,
        weeksToGoBack: this.props.weeksToGoBack
    });
    this.getCompanySalesWeeklyTotal(data, dataType, overLapOptions);
    this.getSalesDataByLocationByWeek(data, dataType, overLapOptions);
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
  getCompanySalesWeeklyTotal(weeksData, dataType, extraOptions){
    let salesWeekly = getWeeklySales(weeksData[0].data, dataType);
    let totalCompanySales = getTotalSales(salesWeekly);
    // Above is the main data
    let salesDataGraphPrefix = [
      ["x", parseDataTypeName(dataType)],
    ]
    if(extraOptions["lastYear"] === true){
      // Concatenates the other weekly sales so that we can graph other trends
      let otherSalesWeekly = getWeeklySales(weeksData[1].data, dataType);
      for (let j = 0; j < salesWeekly.length; j++){
        salesWeekly[j].push(otherSalesWeekly[j][1]);
      }
      // This part adds on to the legend with what date the sales are counted from
      salesDataGraphPrefix[0].push(parseDataTypeName("lastYear"));
      
    }

    //This goes through the extra data options. It will not re graph already graphed data
    for (let extraDataType in extraOptions){
      if(extraOptions[extraDataType] === false || extraDataType === dataType || extraDataType === "lastYear"){
        continue;
      }
      let extraData = getWeeklySales(weeksData[0].data, extraDataType);
      for (let j = 0; j < salesWeekly.length; j++){
        salesWeekly[j].push(extraData[j][1]);
      }
      salesDataGraphPrefix[0].push(parseDataTypeName(extraDataType));
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
   * Takes a set weeks worth of data and parses it for
   * use in the main trends data table.
   * @param weeksData
   */
  getSalesDataByLocationByWeek(weeksData, dataType, extraOptions) {
    let perLocationSalesGraphData = [];
    let bottomLabel = ""
    let locationSalesTableHeader = [{ type: 'string', label: 'Location' }];
    let locationIndex = 0; // This is strictly for getting the last years locaton content
    weeksData[0].locations.forEach(location => {
      let locationDataRow = [];
      let locationTotal = 0;
      for (let i = 0; i < location.days.length; i++) {
        let weekNumber = Math.floor(i/7.0) + 1;
        if (locationDataRow.length < weekNumber) {
          locationDataRow.push({});
          
          // insert main data type
          locationDataRow[weekNumber - 1][dataType] = {v: 0, f: '$0'};

          //insert last year if needed
          if(extraOptions["lastYear"] === true){
            locationDataRow[weekNumber - 1]["lastYear"] = {v: 0, f: '$0'};
          }
        
          //insert extra data types
          for(let extraDataType in extraOptions){
            if(extraDataType === dataType || extraOptions[extraDataType] === false || extraDataType === "lastYear"){
              continue;
            }
            locationDataRow[weekNumber - 1][extraDataType] = {v: 0, f: '$0'};
          }

          if (locationSalesTableHeader.length - 1 < weekNumber) {
            let date = new Date(location.days[i].date.getTime()); // clone the date as we will add days
            let month = date.getMonth() + 1;
            let day = date.getDate();
            if(bottomLabel === ""){
              bottomLabel += date.toDateString() + " - ";
              date.setDate(day + 6)
              bottomLabel += date.toDateString();
            }else{
              date.setDate(day + 6)
            }
            let endDay = date.getDate();
            let endMonth = date.getMonth() + 1;
            let dateLabel = month + "/" + day + " - " + endMonth + "/" + endDay;
            // the cleanest way to include a line break was to allowHtml in the table options and have the break character
            let headerList = 'Week ' + weekNumber.toFixed(0) + '<br>' + dateLabel;
            locationSalesTableHeader.push({ type: 'number', label: headerList});
          }
        }
        let locationDaysData = location.days[i];
        locationTotal += locationDaysData[dataType];

        // insert main data type
        locationDataRow[weekNumber - 1][dataType].v += locationDaysData[dataType];
        locationDataRow[weekNumber - 1][dataType].f = this.toDollarString(locationDataRow[weekNumber - 1][dataType].v);

        //insert last year if needed
        if(extraOptions["lastYear"] === true){
          let lastYearLocationDaysData = weeksData[1].locations[locationIndex].days[i];
          locationDataRow[weekNumber - 1]["lastYear"].v += lastYearLocationDaysData[dataType];
          locationDataRow[weekNumber - 1]["lastYear"].f = this.toDollarString(locationDataRow[weekNumber - 1]["lastYear"].v);
        }

        //insert extra data types
        for(let extraDataType in extraOptions){
          if(extraDataType === dataType || extraOptions[extraDataType] === false || extraDataType === "lastYear"){
            continue;
          }
          locationDataRow[weekNumber - 1][extraDataType].v += locationDaysData[extraDataType];
          locationDataRow[weekNumber - 1][extraDataType].f = this.toDollarString(locationDataRow[weekNumber - 1][dataType].v);
        }
        
      }

      // here, the location names are Strings, but somehow they are rendered in the table with a line break...
      locationDataRow.unshift(location.name);
      locationDataRow.push({v: locationTotal, f: this.toDollarString(locationTotal)});
      perLocationSalesGraphData.push(locationDataRow);
      locationIndex++;
    });

    locationSalesTableHeader.push({ type: 'number', label: 'Total' });

    perLocationSalesGraphData.unshift(locationSalesTableHeader);

    // Convert table graph data to line graph format
    let companyPerWeekSalesGraphData = [];


    // i = 1 & j = 1 to discard the unwanted line graph header data
    //.length -1 to not duplicate the top chart at the end.
    for (let i = 1; i < perLocationSalesGraphData.length ; i++) {
      let companyName = perLocationSalesGraphData[i][0];
      let graphData = [];
      let dataheader = ["x"];
      let locationTotalSales = 0;

      // .length - 1 to remove table graph's "total" value
      for (let j = 1; j < perLocationSalesGraphData[i].length - 1; j++) {
        let label =  perLocationSalesGraphData[0][j].label.split("<br>");
        let dateLabel = label[1].split(" - ")[0];
        let dataRow = [dateLabel];
        
        for(let types in perLocationSalesGraphData[i][j]){
          dataRow.push(perLocationSalesGraphData[i][j][types].v);
        
          if(j === 1){
            dataheader.push(parseDataTypeName(types)); // Do this only once
          }
          
        }
        graphData.push(dataRow);

        // Since data has been put in the data row revert to main data for the table
        perLocationSalesGraphData[i][j] = perLocationSalesGraphData[i][j][dataType];
        
        locationTotalSales += perLocationSalesGraphData[i][j].v;
        
      }

      graphData.unshift(dataheader);
      companyPerWeekSalesGraphData.push({
        "name": companyName,
        "data": graphData,
        "cleanDataType": parseDataTypeName(dataType),
        "bottomLabel": bottomLabel
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
    let mainChartSize = "600px";
    let smallChartSize = "w-33 pa0 mr0";
    console.log(this.state.weeksToGoBack)
    if(this.state.weeksToGoBack > 5){ // 12 weeks
      mainChartSize = "800px";
      smallChartSize = "w-50 pa0 mr0";
    }
    return (
      <div>
        <h2>Total {this.state.cleanDataType}: {this.state.totalCompanySales}</h2>
        <div className='flex flex-wrap items-center justify-center'>
          <div className='flex-0 outline ma3'>
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
          <div className='flex-0 ma3'>
            <Chart
              width={mainChartSize}
              height={"400px"}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={this.state.totalCompanySalesByWeek}
              options={{
                title: "Total Company " + this.state.cleanDataType + ": " + this.state.totalCompanySales,
                hAxis: {
                  title: this.state.startDate
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
                        <div class= {smallChartSize}>
                          <CompanyChart cleanDataType={companyGraphData.cleanDataType} key={index} 
                          name={companyGraphData.name} graphData={companyGraphData.data} 
                          bottomLabel={companyGraphData.bottomLabel}/>
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
      salesWeekly.push([data[i].date.getMonth() + 1 + "/" + data[i].date.getDate(), 0]);
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
  //if special case of lastyear, return LY Net Sales 
  if(dataType === "lastYear"){
    return "LY Net Sales";
  }
  dataType = dataType.charAt(0).toUpperCase() + dataType.slice(1); // sets first letter uppercase
  let cleanName = dataType.match(/[A-Z][a-z]+/g); // this seperates the words by UpperCase letters
  cleanName = cleanName.join(" "); //  joins them with a space
  return cleanName;
}

export default ChartView;
