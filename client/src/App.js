import React, { Component } from "react";
import moment from "moment";

import DatePicker from "./Components/DatePicker";
import DataTable from "./Components/Table";
import fetchDataForDays from "./data-fetcher";

class App extends Component {
  state = {
    activeWeek: [], // 7 date objects
    dataForWeek: []
  };

  handleSetWeek = async week => {
    this.setState({
      activeWeek: week
    });

    const dataForWeek = await fetchDataForDays(week);

    this.setState({ dataForWeek });

    // TODO: trigger a fetch for data
  };

  render() {
    const { activeWeek, dataForWeek } = this.state;

    return (
      <div>
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
        <DataTable data={dataForWeek} />
      </div>
    );
  }
}

export default App;
