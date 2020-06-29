import React from 'react'

import DocsLayout from '../../components/Layout/Layouts/DocsLayout'
import withAuth from '../../hocs/withAuth'
import { Typography } from '@material-ui/core'

interface IDocsPageProps {
    //
}

const DocsPage = (props: IDocsPageProps) => {
    return (
        <Typography variant='h1'>Hello world</Typography>
    )
}

DocsPage.getLayout = ({ children }) => <DocsLayout>{children}</DocsLayout>

export default withAuth()(DocsPage)
