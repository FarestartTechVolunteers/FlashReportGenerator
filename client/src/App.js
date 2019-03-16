import React, { Component } from "react";
import moment from "moment";

import DatePicker from "./Components/DatePicker";
import DataTable from "./Components/DataTable";
import fetchDataForDays from "./data-fetcher";

import 'tachyons/css/tachyons.css'

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

    return (
      <div className='sans-serif'>
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
        <DataTable locations={dataForWeek.locations} />
      </div>
    );
  }
}

export default App;
