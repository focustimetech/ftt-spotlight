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
		axios.get('/api/blocks')
			.then((res) => {
				const blocks: Block[] = res.data.reduce((acc: Block[], block: Block) => {
					acc[block.day_of_week] = block
					return acc
				}, [])
				this.setState({ blocks })
			})
	}

	render() {
		const days: any[] = Object.keys(this.state.blocks).map((value: string) => {
			return (
				<div className='label'>
					<h2 className='date'>{WEEK_DAY_NAMES[parseInt(value) - 1]}</h2>
				</div>
			)
		})

		return (
			<div className='schedule_container --blocks'>
				<div className='schedule'>
					<div className='schedule_row'>
						{days}
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
