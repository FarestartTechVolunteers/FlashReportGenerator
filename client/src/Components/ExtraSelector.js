import React, { Component } from "react";
/**
 * This is meant to be a menu of checkboxes where the client can opt for additional information about
 * the selected time frame to be shown.
 */
class ExtraSelector extends Component {
  constructor(props) {
    super();
    props.func()
    // TODO: it would be ideal if this content was created dynamically.
    /* props.forEach(option => {

    }); */
  }

  state = { // TODO: maybe include last month feature? Although there would be a lot of overlap
    budget: false,
    labor: false,
    lastYear: false
  };

  componentDidMount = () => {

  }

  handleCheckboxChange = event => {
    switch (event.target.value) {
      case "0":
        this.setState({budget: !this.state.budget});
        break;
      case "1":
        this.setState({labor: !this.state.labor});
        break;
      case "2":
        this.setState({lastYear: !this.state.lastYear});
        break;
      default:
        console.log("system error: " + event.target.value + " not recognized.");
        break;
    }
  };


  render() {
    const {budget, labor, lastYear} = this.state;

    const Checkbox = props => (
      <input type="checkbox" {...props} />
    );

    return (
      <div>
        <label>
          <Checkbox
            checked={budget}
            onChange={this.handleCheckboxChange}
            value={0}
          />
          <span>Budget</span>
        </label>
        <br></br>
        <label>
          <Checkbox
            checked={labor}
            onChange={this.handleCheckboxChange}
            value={1}
          />
          <span>Labor Cost</span>
        </label>
        <br></br>
        <label>
          <Checkbox
            checked={lastYear}
            onChange={this.handleCheckboxChange}
            value={2}
          />
          <span>Last Year</span>
        </label>
      </div>
    );
  }
}

export default ExtraSelector;