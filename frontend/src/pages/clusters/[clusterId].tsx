import Head from 'next/head'
import React from 'react'
import { connect } from 'react-redux'

import { Typography } from '@material-ui/core'

import { fetchClusters } from '../../actions/clusterActions'
import { fetchStudents } from '../../actions/studentActions'
import { IStudent, IUser } from '../../types/auth'
import { ICluster } from '../../types/cluster'
import { TableColumns } from '../../types/table'
import { makeDocumentTitle } from '../../utils/document'

import EnhancedTable from '../../components/Table/EnhancedTable'
import TopBar from '../../components/TopBar'
import Section from '../../components/Layout/Section'
import withAuth from '../../hocs/withAuth'
import API from '../../utils/api'

interface IReduxProps {
    students: Record<number, IStudent>
}

interface IClusterPageProps extends IReduxProps {
    cluster: ICluster
}

interface IClusterPageState {
    selected: number[]
}

interface IClusterStudent {
    name: string
}

class ClusterPage extends React.Component<IClusterPageProps, IClusterPageState> {
    static async getInitialProps(context) {
        const { store } = context
        const isServer: boolean = typeof window === 'undefined'
        const clusterId: number = Number(context.query.clusterId)
        console.log('[clusterId]:', clusterId)
        const currentUser: IUser = store.getState().auth.user
        let errorCode: number
        let editable: boolean = false
        let cluster: ICluster = null
        if (currentUser.accountType === 'teacher') {
            let clusters: ICluster[] = store.getState().clusters.items
            if (!clusters || clusters.length === 0) {
                await store.dispatch(fetchClusters()).catch((err: any) => {
                    if (isServer) {
                        errorCode = err.response.status
                    }
                })
                clusters = store.getState().clusters.items
                cluster = clusters.find((c: ICluster) => c.id === clusterId)
                if (cluster) {
                    editable = true
                }
            }
        } else {
            API.get<ICluster>(`/clusters/${clusterId}`).then((res) => {
                cluster = res.data
            }, (err: any) => {
                if (isServer) {
                    errorCode = err.response.status
                }
            })
        }

        const students: Record<number, IStudent> = store.getState().students.students
        if (!students || Object.keys(students).length === 0) {
            await store.dispatch(fetchStudents()).catch((err: any) => {
                if (isServer) {
                    errorCode = err.response.status
                }
            })
        }

        return { errorCode, editable, cluster }
    }

    state: IClusterPageState = {
        selected: []
    }

    handleSelect = (selected: number[]) => {
        this.setState({ selected })
    }

    render() {
        const { cluster } = this.props
        const tableColumns: TableColumns<IClusterStudent> = {
            name: { label: 'Student Name', type: 'string', primary: true, searchable: true, filterable: true }
        }

        const tableData: IClusterStudent[] = cluster && cluster.studentIds
        ? cluster.studentIds.map((studentId: number) => ({ name: this.props.students[studentId].name }))
        : []

        console.log('tableData:', tableData)
        return (
            <>
                <Head><title>{makeDocumentTitle(cluster.name)}</title></Head>
                <TopBar title={cluster.name} />
                <Section>
                    <EnhancedTable<IClusterStudent>
                        title='Students'
                        columns={tableColumns}
                        data={tableData}
                        selected={this.state.selected}
                        onSelect={this.handleSelect}
                    />
                </Section>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    students: state.students.students
})

const mapDispatchToProps = null

export default connect(mapStateToProps, mapDispatchToProps)(withAuth('teacher', 'sysadmin', 'staff')(ClusterPage))
