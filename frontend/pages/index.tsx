import Link from 'next/link'
import React from 'react'


import withAuth from '../hocs/withAuth'

import StudentLayout from '../components/Layout/StudentLayout'
import TeacherLayout from '../components/Layout/TeacherLayout'

const Index = () => {
    return (
        <div>
            <TeacherLayout>
                <Link href='classrooms'><a>Let's see some Classrooms</a></Link>
            </TeacherLayout>
        </div>

    )
}

export default withAuth()(Index)
