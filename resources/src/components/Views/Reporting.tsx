import * as React from 'react'

import { TopNav } from '../TopNav'

type ReportingState = 'idle' | 'running' | 'errored'

interface IProps {

}

interface IState {
    reportingState: ReportingState
}

class Reporting extends React.Component<IProps, IState> {
    state: IState = {
        reportingState: 'idle'
    }

    render() {
        return (
            <>
                <div className='content' id='content'>
                <TopNav
                    breadcrumbs={[{ value: 'Reporting' }]}
                />
                </div>
            </>
        )
    }
}

export default Reporting
