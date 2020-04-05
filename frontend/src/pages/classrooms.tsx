import React from 'react'
import { useSelector } from 'react-redux'

import withAuth from '../hocs/withAuth'
import { RootState } from '../store'
import API from '../utils/api'

class Classrooms extends React.Component {
    static async getInitialProps({ store }) {
        return
    }

    componentDidMount() {
        API.get('/classrooms').then((res: any) => {
            console.log('res.data:', res.data)
        })
    }

    render() {
        return (
            <div><h1>My Classrooms</h1></div>
        )
    }
}

export default Classrooms // withAuth(Classrooms)
