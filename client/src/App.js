import React, { Component } from "react";
import moment from "moment";
import Nav from "./Layout/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import isEmpty from 'lodash/isEmpty'

import DatePicker from "./Components/DatePicker";
import DataTable from "./Components/DataTable";
import fetchDataForDays from "./data-fetcher";
import ChartView from "./Components/ChartView";
import CompanyChart from "./Components/CompanyChart";

import "tachyons/css/tachyons.css";

class App extends Component {
  state = {
    activeWeek: [], // 7 date objects
    dataForWeek: {}
  };

  handleSetWeek = async (activeWeek) => {
    this.setState({ activeWeek });
    const dataForWeek = await fetchDataForDays(activeWeek);
    this.setState({ dataForWeek });
  };

  render() {
    const { activeWeek, dataForWeek } = this.state;
    const { locations } = dataForWeek

    return (
      <div className='mw8 center bg-white pa3'>
        <h1>FareStart: Flash Report</h1>

        <DatePicker activeWeek={activeWeek} onSetWeek={this.handleSetWeek} />

        {!isEmpty(dataForWeek) ? (
          <React.Fragment>
            <DataTable locations={locations} />
            <ChartView data={dataForWeek} />
            <CompanyChart data={dataForWeek} />
          </React.Fragment>
        ) : (
          <p>Please select a date range to view the report.</p>
        )}
      </div>
    );
  }
}

export default App;
