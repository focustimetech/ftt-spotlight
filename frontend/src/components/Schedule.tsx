import * as React from 'react'

export class Schedule extends React.Component {
	render() {
		return (
			<div className='schedule'>
				<div className='schedule_row'>
					<div className='label'>
						<h5 className='day'>Mon</h5>
						<h2 className='date'>25</h2>
					</div>
					<div className='label --today'>
						<h5 className='day'>Tue</h5>
						<h2 className='date'>26</h2>
					</div>
					<div className='label'>
						<h5 className='day'>Wed</h5>
						<h2 className='date'>27</h2>
					</div>
				</div>
				<div className='schedule_row'>
					<div className='schedule_events'>
						<div className='event'>Assembly</div>
						<div className='event'>Another Assembly :-o</div>
					</div>
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
				</div>
			</div>
		)
	}
}
