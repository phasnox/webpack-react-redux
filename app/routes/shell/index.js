import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { footer } from './_Shell.scss'
import Icon from 'components/icon'

const Shell = ({ children }) =>
  <div>
    <h1><Icon className="filter" /> Filter table</h1>
    { children }
    <footer className={footer}>
    <Link to="/">Filterable Table</Link>
      <Link to="/about">About</Link>
    </footer>
  </div>

Shell.propTypes = {
  children: PropTypes.object
}

export default Shell
