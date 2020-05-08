import React from 'react'
import { connect } from 'react-redux'

import { ITopic } from '../../types/topic'

interface IReduxProps {
    topics: ITopic[]
    dispatchTopics: () => Promise<any>
}

interface ITopcisFormState {
    //
}

class TopicsForm extends React.Component<IReduxProps, ITopcisFormState> {
    render() {
        return (
            <div />
        )
    }
}

const mapStateToProps = (state) => ({
    topics: state.topics.items
})

const mapDispatchToProps = { dispatchTopics }

export default connect(mapStateToProps, mapDispatchToProps)(TopicsForm)
