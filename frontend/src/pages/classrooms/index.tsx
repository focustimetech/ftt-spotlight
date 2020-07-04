import Head from 'next/head'
import React from 'react'

import { fetchClassrooms } from '../../actions/classroomActions'
import { NextPageContext } from '../../types'
import { makeDocumentTitle } from '../../utils/document'

import Section from '../../components/Layout/Section'
import TopBar from '../../components/TopBar'
import withAuth from '../../hocs/withAuth'

class ClassroomsPage extends React.Component {
    static async getInitialProps(context: NextPageContext) {
        const { store } = context
        return await store.dispatch(fetchClassrooms)
    }

    render() {
        return (
            <div className='classrooms'>
                <Head><title>{makeDocumentTitle('Classrooms')}</title></Head>
                <TopBar title='Classrooms' />
                <Section>
                    <div>hello</div>
                </Section>
            </div>
        )
    }
}

export default withAuth('staff', 'teacher', 'sysadmin')(ClassroomsPage)
