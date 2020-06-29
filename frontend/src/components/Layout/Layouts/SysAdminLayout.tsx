import React from 'react'
import { connect } from 'react-redux'

import { fetchClusters } from '../../../actions/clusterActions'
import { ICluster } from '../../../types/cluster'
import { ILayoutContainerProps } from '../../../types/layout'
import { staffAndTeacherMenuItems } from './StaffLayout'

import { INavMenuItem } from '../../Nav/NavMenuItem'
import VerticalNav from '../../Nav/VerticalNav'
import LayoutContainer from '../LayoutContainer'
import LayoutContent from '../LayoutContent'

const sysAdminMenuItems: INavMenuItem[] = [
    { label: 'Support Tickets', href: '/support', icon: 'live_help' }
]

interface IReduxProps {
    clusters: ICluster[]
    fetchClusters: () => Promise<void>
}

interface IState {
    loadingClusters: boolean
}

class SysAdminLayout extends React.Component<IReduxProps & ILayoutContainerProps, IState> {
    state: IState = {
        loadingClusters: false
    }

    componentDidMount() {
        if (!this.props.clusters || this.props.clusters.length === 0) {
            this.setState({ loadingClusters: true })
            this.props.fetchClusters().then(() => {
                this.setState({ loadingClusters: false })
            })
        }
    }

    render() {
        const clusters: INavMenuItem[] = this.props.clusters.map((cluster: ICluster) => ({
            label: cluster.name,
            href: '/clusters/[clusterId]',
            as: `/clusters/${cluster.id}`,
            icon: 'group'
        }))

        return (
            <LayoutContainer orientation='vertical'>
                <VerticalNav
                    menuItems={[...staffAndTeacherMenuItems, ...sysAdminMenuItems]}
                    hiddenMenuItems={clusters}
                    disableHiddenMenu={this.state.loadingClusters}
                />
                <LayoutContent orientation='vertical'>
                    {this.props.children}
                </LayoutContent>
            </LayoutContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    clusters: state.clusters.items
})

const mapDispatchToProps = { fetchClusters }

export default connect(mapStateToProps, mapDispatchToProps)(SysAdminLayout)
