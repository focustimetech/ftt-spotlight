import * as React from 'react'

export class Schedule extends React.Component {
	render() {
		return (
			<div className='schedule'>
				<div className='schedule_column'>
					<div className='schedule_column__label'>
						<h5 className='day'>Mon</h5>
						<h2 className='date'>25</h2>
					</div>
					<div className='schedule_column__events'>
						<div className='schedule_event'>Assembly</div>
					</div>
					<div className='schedule_column__blocks'>
						<div className='schedule_block --missed'>Hello world</div>
						<div className='schedule_block --attended'>Hello world</div>
						<div className='schedule_block --void'>Hello world</div>
						<div className='schedule_block --attended'>Hello world</div>
						<div className='schedule_block --attended'>Hello world</div>
					</div>
				</div>
				<div className='schedule_column'>
					<div className='schedule_column__label --today'>
						<h5 className='day'>Tue</h5>
						<h2 className='date'>26</h2>
					</div>
					<div className='schedule_column__events'>
					</div>
					<div className='schedule_column__blocks'>
						<div className='schedule_block --missed'>Hello world</div>
						<div className='schedule_block --attended'>Hello world</div>
						<div className='schedule_block --pending --now'>Hello world</div>
						<div className='schedule_block --appointed'>Hello world</div>
					</div>
				</div>
				<div className='schedule_column'>
					<div className='schedule_column__label'>
						<h5 className='day'>Wed</h5>
						<h2 className='date'>27</h2>
					</div>
					<div className='schedule_column__events'>
						<div className='schedule_event'>Assembly</div>
					</div>
					<div className='schedule_column__blocks'>
						<div className='schedule_block --pending'>Hello world</div>
						<div className='schedule_block --pending'>Hello world</div>
						<div className='schedule_block --pending'>Hello world</div>
					</div>
				</div>
			</div>
		)
	}
}
