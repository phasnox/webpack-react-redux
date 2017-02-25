import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Shell from './shell/Shell'
import FilterableTable from './filterable-table'
import About from './about'

export default (
	<Route path="/" component={Shell}>
		<IndexRoute component={FilterableTable} />
		<Route path="/about" component={About} />
	</Route>
)
