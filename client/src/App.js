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
import ExtraSelector from "./Components/ExtraSelector";

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
    budget: false,
    labor: false,
    lastYear: false,
    activeWeek: [], // 7 date objects
    weeksToGoBack: 5,
    dataForWeek: {},
    dataForWeekLastYear: {},
    isLoading: false
  };

  handleSetWeek = async (activeWeek) => {
    // console.log(activeWeek); // for debugging
    this.setState({ isLoading: true, activeWeek });
    const dataForWeek = await fetchDataForWeek([activeWeek[0], this.state.weeksToGoBack]);
    this.setState({ isLoading: false, dataForWeek: dataForWeek});
  };

  // TODO: add a layer of indirection here ^ V

  handleSetWeeksToGoBack = async (weeksToGoBack) => {
    // console.log(weeksToGoBack.target.value) // for debugging
    this.setState({ isLoading: true, weeksToGoBack: weeksToGoBack.target.value });
    const dataForWeek = await fetchDataForWeek([this.state.activeWeek[0], weeksToGoBack.target.value]);
    this.setState({ isLoading: false, dataForWeek: dataForWeek });
  };


  componentDidMount() {
    document.title = "FareStart: Flash Report";
  }

  render() {
    const { activeWeek, dataForWeek, isLoading } = this.state;
    const { locations } = dataForWeek;
    const startDate = activeWeek[0];

    console.log(this.state.budget);
    console.log(this.state.labor);
    console.log(this.state.lastYear);
    return (
      <div className='mw9 center bg-white pa3'>
        <div className='flex flex-row items-baseline justify-between content-center'>
          <div className='flex-0'>
            <h1>FareStart: Flash Report</h1>
          </div>
          <div className='flex-0'>
            <select
              value={this.state.weeksToGoBack}
              onChange={this.handleSetWeeksToGoBack}
            >
              <option value={5}>6 weeks</option>
              <option value={11}>12 weeks</option>
            </select>
            <DatePicker activeWeek={activeWeek} onSetWeek={this.handleSetWeek} />
            <ExtraSelector func={(es_budget, es_labor, es_lastYear)=>
              this.setState({budget: es_budget, labor: es_labor, lastYear: es_lastYear})}/>
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
                <Trends path='/trends' dataForWeek={[dataForWeek]}/>
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
