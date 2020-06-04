import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

import withAuth from '../hocs/withAuth'

const Index = () => {
    console.log('Rendering index')
    return (
        <>
            <Head><title>Spotlight: Smart Attendance</title></Head>    
            <div>
                <Link href='classrooms'><a>Go to Classrooms</a></Link>
            </div>
        </>
    )
}

export default withAuth()(Index)
