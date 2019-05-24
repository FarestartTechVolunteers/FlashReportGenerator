import React, { Component } from "react";
import { Router } from "@reach/router"
import Nav from "./Layout/Nav";
import isEmpty from 'lodash/isEmpty'

import DatePicker from "./Components/DatePicker";
import DataTable from "./Components/DataTable";
import fetchDataForWeek from "./data-fetcher";
import ChartView from "./Components/ChartView";
import CompanyChart from "./Components/CompanyChart";

import "tachyons/css/tachyons.css";

const Overview = ({ locations, startDate }) => <DataTable locations={locations} startDate={startDate} />

const Trends = ({ dataForWeek }) => (
  <React.Fragment>
    <ChartView data={dataForWeek} />
  </React.Fragment>
)

class App extends Component {
  state = {
    activeWeek: [], // 7 date objects
    dataForWeek: {},
    dataForWeek_LASTYEAR: {},
    isLoading: false
  };

  handleSetWeek = async (activeWeek) => {
    this.setState({ isLoading: true, activeWeek });
    const dataForWeek = await fetchDataForWeek(activeWeek[0]);
      // below gets the date last year TODO: get Nth monday
    //let d = new Date(activeWeek[0].getTime());
    const dataForWeek_LASTYEAR = await fetchDataForWeek(d.setUTCFullYear(d.getUTCFullYear() - 1));
    this.setState({ isLoading: false, dataForWeek, dataForWeek_LASTYEAR});
  };

  componentDidMount() {
    document.title = "FareStart: Flash Report";
  }

  render() {
    const { activeWeek, dataForWeek, dataForWeek_LASTYEAR, isLoading } = this.state;
    const { locations } = dataForWeek
    const startDate = activeWeek[0]

    console.log([dataForWeek, dataForWeek_LASTYEAR]);

    return (
      <div className='mw9 center bg-white pa3'>
        <div className='flex flex-row items-baseline justify-between content-center'>
          <div className='flex-0'>
            <h1>FareStart: Flash Report</h1>
          </div>
          <div className='flex-0'>
            <DatePicker activeWeek={activeWeek} onSetWeek={this.handleSetWeek} />
          </div>
        </div>

        {isLoading ? (
          <React.Fragment>loading...</React.Fragment>
        ) : (
          !isEmpty(dataForWeek) ? (
            <React.Fragment>
              <Nav />

              <Router>
                <Overview path='/' locations={locations} startDate={startDate} />
                <Trends path='/trends' dataForWeek={[dataForWeek_LASTYEAR, dataForWeek]} />
              </Router>
            </React.Fragment>
          ) : (
            <p>Please select a date range to view the report.</p>
          )
        )}
      </div>
    );
  }
}

export default App;
