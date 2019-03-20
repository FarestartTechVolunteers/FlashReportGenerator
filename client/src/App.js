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

const Overview = ({ locations }) => <DataTable locations={locations} />

const Trends = ({ dataForWeek }) => (
  <React.Fragment>
    <ChartView data={dataForWeek} />
    <CompanyChart data={dataForWeek} />
  </React.Fragment>
)

class App extends Component {
  state = {
    activeWeek: [], // 7 date objects
    dataForWeek: {}
  };

  handleSetWeek = async (activeWeek) => {
    this.setState({ activeWeek });
    const dataForWeek = await fetchDataForWeek(activeWeek[0]);
    this.setState({ dataForWeek });
  };

  render() {
    const { activeWeek, dataForWeek } = this.state;
    const { locations } = dataForWeek

    return (
      <div className='mw8 center bg-white pa3'>
        <div className='flex flex-row items-baseline justify-between'>
          <div className='flex-0'>
            <h1>FareStart: Flash Report</h1>
          </div>
          <div className='flex-0'>
            <DatePicker activeWeek={activeWeek} onSetWeek={this.handleSetWeek} />
          </div>
        </div>

        {!isEmpty(dataForWeek) ? (
          <React.Fragment>
            <Nav />

            <Router>
              <Overview path='/' locations={locations} />
              <Trends path='/trends' dataForWeek={dataForWeek} />
            </Router>
          </React.Fragment>
        ) : (
          <p>Please select a date range to view the report.</p>
        )}
      </div>
    );
  }
}

export default App;
