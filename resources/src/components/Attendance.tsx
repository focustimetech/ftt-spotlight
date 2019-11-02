import React from 'react'

import {
    Button,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    IconButton
} from '@material-ui/core'

import { SimpleTable } from './Table/SimpleTable'
import { EmptyStateIcon } from './EmptyStateIcon'
import {IAttendanceBlock} from '../types/student'

const data: any = { "1": { "label": "Block 1", "course_id": 17, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "2": { "label": "Block 2", "course_id": 18, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "3": { "label": "Block 3", "course_id": 19, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "4": { "label": "Block 4", "course_id": 4, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "5": { "label": "Block 5", "course_id": 13, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "6": { "label": "Block 6", "course_id": 14, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "7": { "label": "Block 7", "course_id": 15, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "8": { "label": "Block 8", "course_id": 8, "enrolled_at": "2019-06-10 00:01:00", "dropped_at": null, "flex": false, "total": 183, "attended": 80 }, "9": { "label": "Focus Block", "flex": true, "total": 248, "attended": 0 } }

interface IState {
    loading: boolean
}

export class Attendance extends React.Component<{}, IState> {
    state: IState = {
        loading: false
    }

    render() {
        const tableHeaders = ['Block', 'Attendance', 'Details']
        const tableData = Object.keys(data).map((key: string | number) => {
            const block: IAttendanceBlock = data[key]
       
                const attendance: number = Math.round(100 * block.attended / block.total)
                const details = (
                    <>
                        <p>{`${block.attended} attended`}</p>
                        <p>{`${block.total - block.attended} missed`}</p>
                    </>
                )
                return [block.label, attendance, details]
            
        })

        return (
            <>
                <div className='simple-table attendance-table'>
                    <div className='simple-table__row simple-table__header'>
                        {tableHeaders.map((header: string) => (
                            <div><h3>{header}</h3></div>
                        ))}
                    </div>
                    {tableData.map((tableRow: any[]) => {
                        return (
                            <div className='simple-table__row'>
                                {tableRow.map((tableCell: any, index: number) => {
                                    switch (index) {
                                        case 0:
                                            return (
                                                <div>
                                                    <span className='block-label'>{tableCell}</span>
                                                </div>
                                            )
                                        case 1:
                                            return (
                                                <div>
                                                    <h3 className='attendance-score'>{`${tableCell}%`}</h3>
                                                </div>
                                            )
                                        case 2:
                                        default:
                                            return <div>{tableCell}</div>
                                    }
                                })}
                            </div>
                        )})
                    }
                </div>
            </>
        )
    }
}
