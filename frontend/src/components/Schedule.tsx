import * as React from 'react'

import ContentLoader from 'react-content-loader'

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
				<div style={{width: 216, height: 64}}>
					<ContentLoader width={216} height={64}>
						<rect x={0} y={16} rx={4} ry={4} width={120} height={24} />
						<rect x={136} y={8} rx={36} ry={36} width={36} height={36} />
						<rect x={180} y={8} rx={36} ry={36} width={36} height={36} />
					</ContentLoader>
				</div>
				<div style={{width: '100%'}}>
					<ContentLoader width={864} height={304}>
						<rect x={0} y={0} ry={4} rx={4} width={160} height={96} />
						<rect x={0} y={104} ry={4} rx={4} width={160} height={96} />
						<rect x={0} y={208} ry={4} rx={4} width={160} height={96} />

						<rect x={176} y={0} ry={4} rx={4} width={160} height={96} />
						<rect x={176} y={104} ry={4} rx={4} width={160} height={96} />

						<rect x={352} y={0} ry={4} rx={4} width={160} height={96} />
						<rect x={352} y={104} ry={4} rx={4} width={160} height={96} />
						<rect x={352} y={208} ry={4} rx={4} width={160} height={96} />

						<rect x={528} y={0} ry={4} rx={4} width={160} height={96} />

						<rect x={704} y={0} ry={4} rx={4} width={160} height={96} />
						<rect x={704} y={104} ry={4} rx={4} width={160} height={96} />
					</ContentLoader>
				</div>
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
