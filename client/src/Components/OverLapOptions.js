import React, { Component } from "react";
import Checkbox from "./Checkbox";
/**
 * This is meant to be a menu of checkboxes where the client can opt for additional information about
 * the selected time frame to be shown.
 */
const OPTIONS = ["budget", "laborCost", "lastYear", "netSales"];
const LABEL_OPTIONS = {"budget":"Budget", "laborCost":"Labor Cost", "lastYear":"LY Net Sales", "netSales":"Net Sales"};
class OverLapOptions extends Component {
    constructor(props) {
        super();
        this.state = {
          checkboxes: {}
        }
    }

    componentDidMount = () => {
      let startCheckBoxes = {};
      for(let i = 0; i < OPTIONS.length; i++){
        startCheckBoxes[OPTIONS[i]] = false;
      }
      this.setState({
          checkboxes: startCheckBoxes
      });
    };

    handleCheckboxChange = changeEvent => {
        const name = changeEvent.target.name;
        let newCheckBoxes = this.state.checkboxes;
        newCheckBoxes[name] = !newCheckBoxes[name]
        this.setState({
          checkboxes: newCheckBoxes
        });

        this.props.onValueChange(newCheckBoxes);

    };

    createCheckbox = option => (
    <Checkbox
        label={LABEL_OPTIONS[option]}
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