import * as React from 'react'

import {
    Button,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    IconButton,
    List,
    ListItem
} from '@material-ui/core'

import { TopNav } from './TopNav'
interface ReduxProps {}

interface IProps extends ReduxProps {}

interface IState {
    loading: boolean
}

export class Clusters extends React.Component<IProps, IState> {
    state = {
        loading: false
    }

    render() {
        return (
            <>
                <TopNav>
					<ul>
						<li><h3>Clusters</h3></li>
					</ul>
					<ul>
						<li>
							<Button variant='contained' color='primary'>Add Cluster</Button>
						</li>
					</ul>
				</TopNav>
                <List>
                    <ListItem>Cedar</ListItem>
                </List>
            </>
        )
    }
}