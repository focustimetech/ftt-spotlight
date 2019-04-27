import * as React from 'react'

import {
	Button,
	Icon,
	IconButton,
	Dialog,
	Tooltip
} from '@material-ui/core'

export class Schedule extends React.Component {
	handlePrevious = () => {
		console.log('handlePrevious()')
	}

	handleNext = () => {
		console.log('handleNext()')
	}

	handleDateRangeOpen = () => {
		console.log('handleDateRangeOpen()')
	}

	render() {
		return (
			<div className='schedule_container'>
				<ul className='schedule_header'>
					<li><a className='schedule_daterange' onClick={this.handleDateRangeOpen}><Button>Jan 25 — 27, 2019</Button></a></li>
					<li><Tooltip title='Back' placement='top'><IconButton onClick={this.handlePrevious}><Icon>chevron_left</Icon></IconButton></Tooltip></li>
					<li><Tooltip title='Next' placement='top'><IconButton onClick={this.handleNext}><Icon>chevron_right</Icon></IconButton></Tooltip></li>
				</ul>
				<div className='schedule'>
					<div className='schedule_row'>
						<div className='label'>
							<h5 className='day'>Mon</h5>
							<h2 className='date'>25</h2>
						</div>
						<div className='label'>
							<h5 className='day'>Tue</h5>
							<h2 className='date'>26</h2>
						</div>
						<div className='label'>
							<h5 className='day'>Wed</h5>
							<h2 className='date'>27</h2>
						</div>
						<div className='label --today'>
							<h5 className='day'>Thu</h5>
							<h2 className='date'>28</h2>
						</div>
						<div className='label'>
							<h5 className='day'>Fri</h5>
							<h2 className='date'>29</h2>
						</div>
					</div>
					<div className='schedule_row'>
						<div className='schedule_events'>
							<div className='event'>Assembly</div>
							<div className='event'>Another Assembly :-o</div>
						</div>
						<div className='schedule_events'></div>
						<div className='schedule_events'></div>
						<div className='schedule_events'></div>
						<div className='schedule_events'>
							<div className='event'>Friday Breakfast</div>
						</div>
					</div>
					<div className='schedule_row'>
						<div className='schedule_blocks'>
							<div className='block --missed'>Hello world</div>
							<div className='block --attended'>Hello world</div>
							<div className='block --void'>Hello world</div>
							<div className='block --attended'>Hello world</div>
							<div className='block --attended'>Hello world</div>
						</div>
						<div className='schedule_blocks'>
							<div className='block --void'>Hello world</div>
							<div className='block --attended'>Hello world</div>
							<div className='block --attended'>Hello world</div>
						</div>
						<div className='schedule_blocks'>
							<div className='block --missed'>Hello world</div>
							<div className='block --attended'>Hello world</div>
						</div>
						<div className='schedule_blocks'>
							<div className='block --attended'>Hello world</div>
							<div className='block --pending'>Hello world</div>
							<div className='block --pending'>Hello world</div>
						</div>
						<div className='schedule_blocks'>
							<div className='block --pending'>Hello world</div>
							<div className='block --appointed'>Hello world</div>
							<div className='block --pending'>Hello world</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
