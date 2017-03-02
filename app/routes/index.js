import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Shell from './shell'
import FilterableTable from './filterable-table'
import About from './about'

export default (
	<Route path="/" component={Shell}>
		<IndexRoute component={FilterableTable} />
		<Route path="/about" component={About} />
		<Route path="/test_dist" component={FilterableTable} />
	</Route>
)
