import React, { Component } from "react";
/**
 * This is meant to be a menu of checkboxes where the client can opt for additional information about
 * the selected time frame to be shown.
 */
class OverLapOptions extends Component {
  constructor(props) {
    super();
  }

  render() {
    const Checkbox = props => (
      <input type="checkbox" {...props} />
    );

    return (
      <div>
        <h3> Overlapping Options </h3>
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
          <span>Net Sales</span>
        </label>
      </div>
    );
  }
}

export default OverLapOptions;