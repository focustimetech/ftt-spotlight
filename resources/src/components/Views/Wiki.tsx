import * as React from 'react'

import { TopNav } from '../TopNav'

class Wiki extends React.Component {
    render() {
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Spotlight Help', to: '/wiki' }]} />
            </div>
        )
    }
}

export default Wiki
