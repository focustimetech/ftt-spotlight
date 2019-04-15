import * as React from 'react'

import { Route } from 'react-router-dom'

interface IProps {
	component: React.Component
}

const ProtectedRoute = ({component, ...rest}: IProps) => {
	return (
		<Route {...rest} render={(props) => (
			
		)}
	)
}