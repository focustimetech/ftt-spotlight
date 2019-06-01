import * as React from 'react'

import {
    Button,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    IconButton
} from '@material-ui/core'

const data = [
    {
        date: 'Monday, May 24',
        attended: 4,
        missed: 1
    },
    {
        date: 'Tuesday, May 25',
        attended: 6,
        missed: 0
    },
    {
        date: 'Wednesday, May 26',
        attended: 6,
        missed: 0
    },
    {
        date: 'Thursday, May 27',
        attended: 3,
        missed: 3
    },
    {
        date: 'Friday, May 28',
        attended: 5,
        missed: 0
    }
]

interface IState {
    expanded: number
    loading: boolean
}

export class Attendance extends React.Component<{}, IState> {
    state: IState = {
        expanded: -1,
        loading: false
    }

    componentDidMount() {
        
    }
    
    onExpandedChange = (panel: number) => {
        this.setState((state: IState) => ({ expanded: state.expanded === panel ? -1 : panel }))
    }

    render() {
        return (
            <>
                <div>Attendance</div>
                <div className='expansion-panel'>
                    {data && data.length ? (
                        data.map((record: any, index: number) => (
                            <ExpansionPanel key={index} expanded={this.state.expanded === index} onClick={() => this.onExpandedChange(index)}>
                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <h3 className='expansion-panel__heading'>{`${record.attended}/${record.attended + record.missed}`}</h3>
                                    <p className='expansion-panel__subheading'>{record.date}</p>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className='expansion-panel__details'><p>Info goes here.</p></ExpansionPanelDetails>

                            </ExpansionPanel>
                        ))
                    ) : (
                        <p>No attendance data available.</p>
                    )}
                </div>
            </>
        )
    }
}
