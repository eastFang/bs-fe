import React from 'react'
import { Redirect } from 'react-router-dom'
import { fetchCurrentUserProfile } from 'aliasServer/user'

export default function (Comp) {
	// fetchCurrentUserProfile()
	// 	.then(() => {
	// 		return () => <Comp />
	// 	})
	// 	.catch(() => {
	// 		return () => <Redirect to='/login' />
	// 	})
	return () => <Redirect to='/login' />
}
