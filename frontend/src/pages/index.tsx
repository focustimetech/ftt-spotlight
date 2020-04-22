import Link from 'next/link'
import React from 'react'


import { Paper } from '@material-ui/core'

import StudentLayout from '../components/Layout/StudentLayout'

const Index = () => {
    return (
        <div>
            <StudentLayout>
                <Link href='classrooms'><a>Let's see some Classrooms</a></Link>
            </StudentLayout>
        </div>

    )
}

export default Index
