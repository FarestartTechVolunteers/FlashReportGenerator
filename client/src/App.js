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

const Trends = (props) => {
  return (
      <React.Fragment>
        <ChartView dataForWeek={props.dataForWeek}/>
      </React.Fragment>
  );
}

class App extends Component {
  state = {
    activeWeek1: [], // 7 date objects
    activeWeek2: [],
    dataForWeek1: {},
    dataForWeek2: {},
    dataForWeekLastYear: {},
    isLoading: false
  };

  handleSetWeek1 = async (activeWeek1) => {
    // console.log(activeWeek1); // for debugging
    this.setState({ isLoading: true, activeWeek1 });
    const dataForWeek = await fetchDataForWeek(activeWeek1[0]);
    this.setState({ isLoading: false, dataForWeek1: dataForWeek});
  };

  handleSetWeek2 = async (activeWeek2) => {
    // console.log(activeWeek2); // for debugging
    this.setState({ isLoading: true, activeWeek2 });
    const dataForWeek = await fetchDataForWeek(activeWeek2[0]);
    this.setState({ isLoading: false, dataForWeek2: dataForWeek});
  };

  handleSelect1Change = async (select1) => {
    // TODO get various calls from API
  }

  handleSelect2Change = async (select2) => {
    // TODO get various calls from API
  }

  componentDidMount() {
    document.title = "FareStart: Flash Report";
  }

  render() {
    const { activeWeek1, activeWeek2, dataForWeek1, dataForWeek2, isLoading } = this.state;
    const { locations } = dataForWeek1;
    const startDate = activeWeek1[0];

    return (
      <div className='mw9 center bg-white pa3'>
        <div className='flex flex-row items-baseline justify-between content-center'>
          <div className='flex-0'>
            <h1>FareStart: Flash Report</h1>
          </div>
          <div className='flex-0'>
              <select onChange={this.handleSelect1Change}>
                  <option value="1">Sales</option>
                  <option value="2">Cost</option>
              </select>
              <DatePicker activeWeek={activeWeek1} onSetWeek={this.handleSetWeek1} />
          </div>
          <div className='flex-0'>
              <select onChange={this.handleSelect2Change}>
                  <option value="1">Sales</option>
                  <option value="2">Cost</option>
              </select>
            <DatePicker activeWeek={activeWeek2} onSetWeek={this.handleSetWeek2} />
          </div>
        </div>

        {isLoading ? (
          <React.Fragment>loading...</React.Fragment>
        ) : (
          !isEmpty(dataForWeek1) ? (
            <React.Fragment>
              <Nav />

              <Router>
                <Overview path='/' locations={locations} startDate={startDate} />
                <Trends path='/trends' dataForWeek={[dataForWeek1, dataForWeek2]}/>
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
