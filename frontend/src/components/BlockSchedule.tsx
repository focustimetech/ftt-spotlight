import * as React from 'react'

import axios from 'axios'

import {
	Icon,
	IconButton,
	Dialog,
	Tooltip
} from '@material-ui/core'

const WEEK_DAY_NAMES: string[] = [
	'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Satruday' 
]

interface Block {
	id: number
	block_number: number
	day_of_week: number
	label: string
	start: string
	end: string
}

interface IProps {
	handleAdd: () => void
}

interface IState {
	blocks: any
	loadingState: 'idle' | 'loading'
}

export class BlockSchedule extends React.Component<IProps, IState> {
	state: IState = {
		blocks: [],
		loadingState: 'idle'
	}

	componentDidMount() {
		axios.get('http://localhost:8000/api/blocks')
			.then((res) => {
				const blocks: Block[] = res.data.reduce((acc: Block[], block: Block) => {
					acc[block.day_of_week] = block
					return acc
				})
				this.setState({ blocks })
			})
	}

	render() {
		const days: string[] = Object.keys(this.state.blocks).map((value: string) => {
			return WEEK_DAY_NAMES[parseInt(value) - 1]
		})

		return (
			<div className='schedule_container --blocks'>
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
