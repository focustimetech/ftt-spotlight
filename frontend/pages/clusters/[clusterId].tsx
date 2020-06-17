import Head from 'next/head'
import React from 'react'

import { Typography } from '@material-ui/core'

import { IStudent } from '../../types/auth'
import { ICluster } from '../../types/cluster'
import { makeDocumentTitle } from '../../utils/document'

import TopBar from '../../components/TopBar'
import Section from '../../components/Layout/Section'
import withAuth from '../../hocs/withAuth'

interface IClusterPageProps {
    cluster: ICluster
}

interface IClusterPageState {
    selected: number[]
}

class ClusterPage extends React.Component<IClusterPageProps, IClusterPageState> {
    static async getInitialProps(context) {
        
    }

    state: IClusterPageState = {
        selected: []
    }

    render() {
        const { cluster } = this.props
        return (
            <>
                {/*<Head><title>{makeDocumentTitle(cluster.name)}</title></Head>*/}
                <TopBar
                    // title={cluster.name}
                />
                <Section>
                    <Typography>My cluster</Typography>
                </Section>
            </>
        )
    }
}

export default withAuth('teacher', 'sysadmin', 'staff')(ClusterPage)
