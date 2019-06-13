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
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    value="netSales"
                    checked={this.state.selectedOption === "netSales"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Net Sales
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    value="budget"
                    checked={this.state.selectedOption === "budget"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Budget
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    value="lastYear"
                    checked={this.state.selectedOption === "lastYear"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Last Year
                </label>
              </div>
              <div className="form-check">
                <label>
                  <input
                    type="radio"
                    value="laborCost"
                    checked={this.state.selectedOption === "laborCost"}
                    onChange={this.handleOptionChange}
                    className="form-check-input"
                  />
                  Labor Cost
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ExtraSelector;