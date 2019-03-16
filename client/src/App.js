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

  handleSetWeek = async week => {
    this.setState({
      activeWeek: week
    });

    const dataForWeek = await fetchDataForDays(week);

    this.setState({ dataForWeek });
  };

  render() {
    const { activeWeek, dataForWeek } = this.state;
    const { locations } = dataForWeek

    return (
      <div className="sans-serif">
        <div className='flex flex-row'>
          <div className='flex-0'>
            {/* <Router>
                <Nav />
                </Router> */}

            <DatePicker
            activeWeek={activeWeek}
            handleSetWeek={this.handleSetWeek}
            />
          </div>
          <div className='flex-1 ml4'>
            {activeWeek.length === 7 && (
            <h1>
                {moment(activeWeek[0]).format("LL")} –{" "}
                {moment(activeWeek[6]).format("LL")}
            </h1>
            )}
            {!isEmpty(dataForWeek) && (
              <React.Fragment>
            <DataTable locations={locations} />
            <ChartView data={dataForWeek} />
            <CompanyChart data={dataForWeek} />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
