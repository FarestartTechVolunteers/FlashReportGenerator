import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Nav extends Component {
  render() {
    const links = (
      <span>
        <Link to="/">This Week</Link>
        <Link to="/trends">Trends</Link>
      </span>
    );
    return (
      <div>
        <nav className="nav">{links}</nav>
      </div>
    );
  }
}

export default Nav;
