import React from 'react'
import { Link } from 'react-router-dom'
import './index.scss'

export default function() {
	return <Link className='more-articles' to='/search'>更多文章</Link>
}