import Link from 'next/link'
import React from 'react'

import TeacherLayout from '../components/Layout/TeacherLayout'

const Index = () => {
    return (
        <div>
            <h1>Index</h1>
            <TeacherLayout>
                <Link href='classrooms'><a>Let's see some Classrooms</a></Link>
            </TeacherLayout>
        </div>

    )
}

export default Index
