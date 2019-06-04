import React, { Component } from "react";
/**
 * This is meant to be a menu of checkboxes where the client can opt for additional information about
 * the selected time frame to be shown.
 */
class ExtraSelector extends Component {
  constructor(props) {
    super();
    // TODO: it would be ideal if this content was created dynamically.
    /* props.forEach(option => {

    }); */
  }

  handleCheckboxChange = event => {
    /*switch (event.target.value) {
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
    }*/
  };


  render() {
    console.log("es:\n" +
                "budget: " + this.props.flag[0] +"\n"+
                "labor: " + this.props.flag[1] + "\n" +
                "lastYear: " + this.props.flag[2]);

    const Checkbox = props => (
      <input type="checkbox" {...props} />
    );

    return (
      <div>
        <label>
          <Checkbox
            checked={this.props.flag[0]}
            onChange={() => this.props.func(!this.props.flag[0], this.props.flag[1], this.props.flag[2])}
            value={0}
          />
          <span>Budget</span>
        </label>
        <br></br>
        <label>
          <Checkbox
            checked={this.props.flag[1]}
            onChange={() => this.props.func(this.props.flag[0], !this.props.flag[1], this.props.flag[2])}
            value={1}
          />
          <span>Labor Cost</span>
        </label>
        <br></br>
        <label>
          <Checkbox
            checked={this.props.flag[2]}
            onChange={() => this.props.func(this.props.flag[0], this.props.flag[1], !this.props.flag[2])}
            value={2}
          />
          <span>Last Year</span>
        </label>
      </div>
    );
  }
}

export default ExtraSelector;