import { addDays, addWeeks, format, startOfWeek, startOfYear } from 'date-fns'
import React from 'react'

import { Button, Tooltip, Typography } from '@material-ui/core'

interface IHeatmapProps {
    data: Record<string, number>
    includeWeekends?: boolean
}

interface IHeatmapState {
    year: number
}

class Heatmap extends React.Component<IHeatmapProps, IHeatmapState> {
    state: IHeatmapState = {
        year: new Date().getFullYear()
    }
    render() {
        const { data, includeWeekends } = this.props
        const { year } = this.state
        const weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6 = includeWeekends ? 0 : 1
        const table: Array<Array<[Date, number]>> = Array(52)
        let date: Date = startOfWeek(new Date(`${year}-01-01`), { weekStartsOn })
        const weekLength: number = this.props.includeWeekends ? 7 : 5
        let key: string
        for (let j = 0; date.getFullYear() < year + 1; j ++) {
            table[j] = []
            for (let i: number = 0; i < weekLength; i ++) {
                key = format(date, 'yyyy-MM-dd')
                console.log(`${key}:`, data[key])
                if (data[key]) {
                    console.log('date[key]:', data[key])
                }
                table[j][i] = [date, data[key] === undefined ? 0 : Math.ceil(data[key] * 5)]
                date = addDays(date, 1)
            }
            date = startOfWeek(addWeeks(date, 1), { weekStartsOn })
        }
        console.log('table:', table)
        return (
            <div className='heatmap'>
                <div className='heatmap__day-labels'>
                    <Typography component='span' variant='subtitle2'>Mon</Typography>
                    <Typography component='span' variant='subtitle2'>Wed</Typography>
                    <Typography component='span' variant='subtitle2'>Fri</Typography>
                </div>
                <div className='heatmap__body'>
                    <div className='heatmap__container'>
                        {table.map((column: Array<[Date, number]>) => (
                            <div className='heatmap__column'>
                                {column.map((value: [Date, number]) => {
                                    let background: string = '#DDD'
                                    switch (value[1]) {
                                        case 1:
                                            background = '#FF0000'
                                            break
                                        case 2:
                                            background = '#00FF00'
                                            break
                                        case 3:
                                            background = '#0000FF'
                                            break
                                    }
                                    return (
                                        <Tooltip title={format(value[0], 'MMMM d')}>
                                            <div className='heatmap__data' style={{ background }} />
                                        </Tooltip>
                                    )
                                })}
                            </div>
                        ))}
                    </div>
                    <div className='heatmap__month-labels'>
                        <span>Jan</span>
                    </div>
                </div>
                <div className='heatmap__years'>
                    <Button>2020</Button>
                    <Button>2019</Button>
                </div>
            </div>
        )
    }
}

export default Heatmap
