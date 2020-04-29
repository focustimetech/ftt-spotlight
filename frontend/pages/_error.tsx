import React from 'react'

interface IProps {
    statusCode: number
}

class Error extends React.Component<IProps> {
    render() {
        return <div>An error {this.props.statusCode} occured.</div>
    }
}

export default Error
