import Link from 'next/link'
import React from 'react'


import withAuth from '../hocs/withAuth'

import StudentLayout from '../components/Layout/StudentLayout'
import TeacherLayout from '../components/Layout/TeacherLayout'

const Index = () => {
    console.log('Rendering index')
    return (
        <div>
            <Link href='classrooms'><a>Let's see some Classrooms</a></Link>
        </div>

    )
}

export default withAuth('staff', 'teacher')(Index)
