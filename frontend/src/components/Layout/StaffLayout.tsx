import React from 'react'
import { connect } from 'react-redux'

import { fetchClusters } from '../../actions/clusterActions'
import { ICluster } from '../../types/cluster'
import { ILayoutContainerProps } from '../../types/layout'

import UploadDialog from '../Modals/UploadDialog'
import { INavMenuItem } from '../Nav/NavMenuItem'
import VerticalNav from '../Nav/VerticalNav'
import LayoutContainer from './LayoutContainer'
import LayoutContent from './LayoutContent'

export const staffAndTeacherMenuItems: INavMenuItem[] = [
    { label: 'Reporting', href: '/reporting', icon: 'assessment' }
]

interface IReduxProps {
    clusters: ICluster[]
    fetchClusters: () => Promise<void>
}

interface IState {
    loadingClusters: boolean
    uploadDialogOpen: boolean
}

class StaffLayout extends React.Component<IReduxProps & ILayoutContainerProps, IState> {
    state: IState = {
        loadingClusters: false,
        uploadDialogOpen: false
    }

    handleOpenUploadDialog = () => {
        this.setState({ uploadDialogOpen: true })
    }

    componentDidMount() {
        console.log('StaffLayout.componentDidMount()')
        if (!this.props.clusters || this.props.clusters.length === 0) {
            this.setState({ loadingClusters: true })
            this.props.fetchClusters().then(() => {
                this.setState({ loadingClusters: false })
            })
        }
    }

    render() {
        const staffMenuItems: INavMenuItem[] = [
            { label: 'Upload Data', onClick: () => this.handleOpenUploadDialog(), icon: 'cloud_upload' }
        ]

        const clusters: INavMenuItem[] = this.props.clusters.map((cluster: ICluster) => ({
            label: cluster.name,
            href: '/clusters/[clusterId]',
            as: `/clusters/${cluster.id}`,
            icon: 'group'
        }))

        return (
            <>
                <UploadDialog open={true} />
                <LayoutContainer orientation='vertical'>
                    <VerticalNav
                        menuItems={[...staffAndTeacherMenuItems, ...staffMenuItems]}
                        hiddenMenuItems={clusters}
                        disableHiddenMenu={this.state.loadingClusters}
                    />
                    <LayoutContent orientation='vertical'>
                        {this.props.children}
                    </LayoutContent>
                </LayoutContainer>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    clusters: state.clusters.items
})

const mapDispatchToProps = { fetchClusters }

export default connect(mapStateToProps, mapDispatchToProps)(StaffLayout)
