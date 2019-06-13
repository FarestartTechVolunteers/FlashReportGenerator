import React, { Component } from "react";
import Checkbox from "./Checkbox";
/**
 * This is meant to be a menu of checkboxes where the client can opt for additional information about
 * the selected time frame to be shown.
 */
const OPTIONS = ["budget", "laborCost", "netSales"];
class OverLapOptions extends Component {
    constructor(props) {
        super();
    }

    

    state = {
        checkboxes: OPTIONS.reduce(
          (options, option) => ({
            ...options,
            [option]: false
          }),
          {}
        )
    };

    handleCheckboxChange = changeEvent => {
        const { name } = changeEvent.target;

        this.setState(prevState => ({
            checkboxes: {
            ...prevState.checkboxes,
            [name]: !prevState.checkboxes[name]
            }
        }));

        this.props.onValueChange(this.state.checkboxes);

    };

    createCheckbox = option => (
    <Checkbox
        label={parseDataTypeName(option)}
        isSelected={this.state.checkboxes[option]}
        onCheckboxChange={this.handleCheckboxChange}
        key={option}
        name={option}
    />
    );

    createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  render() {

    return (
        <div className="container">
            <h3>Extra Data Options</h3>
            <div className="row mt-5">
                <div className="col-sm-12">
                    {this.createCheckboxes()}
                </div>
            </div>
        </div>
    );
  }
}

function parseDataTypeName(dataType){
    dataType = dataType.charAt(0).toUpperCase() + dataType.slice(1); // sets first letter uppercase
    let cleanName = dataType.match(/[A-Z][a-z]+/g); // this seperates the words by UpperCase letters
    cleanName = cleanName.join(" "); //  joins them with a space
    return cleanName;
  }

export default OverLapOptions;