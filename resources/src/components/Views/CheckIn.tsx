import * as React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Checkbox
} from '@material-ui/core'

import { TopNav } from '../TopNav'

interface ReduxProps {

}

interface IProps extends ReduxProps {}

interface IState {

}

class CheckIn extends React.Component<IProps, IState> {
    render() {
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Check-in' }]} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({

})
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIn)
