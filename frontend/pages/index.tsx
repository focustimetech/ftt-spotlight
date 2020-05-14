import Link from 'next/link'
import React from 'react'


import withAuth from '../hocs/withAuth'

import StudentLayout from '../components/Layout/StudentLayout'
import TeacherLayout from '../components/Layout/TeacherLayout'
import EmptyState from '../components/EmptyState'

const Index = () => {
    console.log('Rendering index')
    return (
        <div>
            <Link href='classrooms'><a>Go to Classrooms</a></Link>
            <EmptyState image='bird' header='Hello world' subheader='Hello world' />
        </div>

    )
}

export default withAuth()(Index)
