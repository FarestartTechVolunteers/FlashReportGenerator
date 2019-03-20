import React from "react";
import { Link } from "@reach/router"
import classNames from 'classnames'

const isActive = ({ isCurrent }) => {
  const sharedClasses = 'f3 b mr5 no-underline underline-hover pointer dib pb2'
  return {
    className: classNames([sharedClasses, isCurrent ? 'bb bw2 b--blue black' : 'silver'])
  }
}

const Nav = () => (
  <nav className='mv3 bb b--black bw1'>
    <Link getProps={isActive} to='/'>This Week</Link>
    <Link getProps={isActive} to='/trends'>Trends</Link>
  </nav>
)

export default Nav;
