import { NextPageContext } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'

import withAuth from '../hocs/withAuth'
import { RootState } from '../store'
import API from '../utils/api'

class Classrooms extends React.Component {
    /*
    static async getInitialProps(context: NextPageContext) {
        console.log('classrooms.getInitialProps')
    }
    */

    componentDidMount() {
        console.log('classrooms.componentDidMount.props:', this.props)
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

export default withAuth('staff', 'teacher')(Classrooms)
