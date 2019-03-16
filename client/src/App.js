import React, { Component } from "react";
import moment from "moment";
import Nav from "./Layout/Nav";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

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
        {/* <Router>
            <Nav />
            </Router> */}

        <DatePicker
          activeWeek={activeWeek}
          handleSetWeek={this.handleSetWeek}
        />
        {activeWeek.length === 7 && (
          <div>
            {moment(activeWeek[0]).format("LL")} –{" "}
            {moment(activeWeek[6]).format("LL")}
          </div>
        )}
        <DataTable locations={locations} />
        <ChartView data={dataForWeek} />
        <CompanyChart data={dataForWeek} />
      </div>
    );
  }
}

export default App;
