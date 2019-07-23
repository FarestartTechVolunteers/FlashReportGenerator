import React, { Component } from "react";
/**
 * This is meant to be a menu of radio buttons where the client can opt for additional information about
 * the selected time frame to be shown.
 */

class ExtraSelector extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "netSales"
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      selectedOption: changeEvent.target.value
    });
    this.props.onValueChange(changeEvent.target.value);
  };

  render() {
    return (
      <div className="container">
        <h3>Main Data Options</h3>
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              <select value={this.state.selectedOption} onChange={this.handleOptionChange}>
                <option value={"netSales"}>Net Sales</option>
                <option value={"budget"}>Budget</option>
                <option value={"laborCost"}>Labor Cost</option>
              </select>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ExtraSelector;