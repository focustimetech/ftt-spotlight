import * as React from 'react'

import { RouteComponentProps } from 'react-router-dom'

import {
    Button,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemSecondaryAction
} from '@material-ui/core'

import { TopNav } from './TopNav'
import { EmptyStateIcon } from './EmptyStateIcon'

interface ReduxProps {}

interface IProps extends RouteComponentProps, ReduxProps {}

interface IState {
    loading: boolean
    expanded: number
}

const data = [
    {
      "cluster": {
        "id": 1,
        "name": "East Harold",
        "public": 1,
        "hidden": 0,
        "owner": 5,
        "created_at": "2019-05-13 00:31:24",
        "updated_at": "2019-05-13 00:31:24"
      },
      "students": []
    },
    {
      "cluster": {
        "id": 2,
        "name": "East Meghan",
        "public": 1,
        "hidden": 0,
        "owner": 12,
        "created_at": "2019-05-13 00:31:24",
        "updated_at": "2019-05-13 00:31:24"
      },
      "students": [
        {
          "name": "Joesph Jenkins",
          "id": 4
        },
        {
          "name": "Kian Kling",
          "id": 8
        },
        {
          "name": "Anabelle West",
          "id": 16
        }
      ]
    },
    {
      "cluster": {
        "id": 3,
        "name": "New Fletaton",
        "public": 1,
        "hidden": 0,
        "owner": 15,
        "created_at": "2019-05-13 00:31:24",
        "updated_at": "2019-05-13 00:31:24"
      },
      "students": []
    },
    {
      "cluster": {
        "id": 4,
        "name": "Andersonstad",
        "public": 1,
        "hidden": 0,
        "owner": 10,
        "created_at": "2019-05-13 00:31:24",
        "updated_at": "2019-05-13 00:31:24"
      },
      "students": [
        {
          "name": "Joesph Jenkins",
          "id": 4
        },
        {
          "name": "Kian Kling",
          "id": 8
        },
        {
          "name": "Anabelle West",
          "id": 16
        }
      ]
    },
    {
      "cluster": {
        "id": 5,
        "name": "Port Clementineton",
        "public": 1,
        "hidden": 0,
        "owner": 2,
        "created_at": "2019-05-13 00:31:24",
        "updated_at": "2019-05-13 00:31:24"
      },
      "students": []
    },
    {
      "cluster": {
        "id": 6,
        "name": "Oak",
        "public": 0,
        "hidden": 0,
        "owner": 7,
        "created_at": "2019-05-16 05:22:59",
        "updated_at": "2019-05-16 06:17:36"
      },
      "students": []
    }
  ]

export class Clusters extends React.Component<IProps, IState> {
    state = {
        loading: false,
        expanded: -1
    }

    componentDidMount() {
        const params: any = this.props.match.params
        this.setState({
            loading: true,
            expanded: params.clusterID ? parseInt(params.clusterID) : -1
        })
    }

    onExpandedChange = (panel: number) => {
        this.setState((state: IState) => ({ expanded: state.expanded === panel ? -1 : panel }))
    }

    render() {
        return (
            <div className='content' id='content'>
                <TopNav>
					<ul>
						<li><h3>Clusters</h3></li>
					</ul>
					<ul>
						<li>
							<Button variant='text'>Add Cluster</Button>
						</li>
					</ul>
				</TopNav>
                <div className='expansion-panel'>
                    {data && data.length ? (
                        data.map((listing: any) => {
                            const cluster = listing.cluster
                            const students = listing.students
                            return (
                                <ExpansionPanel key={cluster.id} expanded={this.state.expanded === cluster.id} onChange={() => this.onExpandedChange(cluster.id)}>
                                    <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                        <p className='expansion-panel__heading'>{cluster.name}</p>
                                        <p className='expansion-panel__subheading'>{`${students.length} Students`}</p>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className='expansion-panel__details'>
                                        {students.length > 0 ? (
                                            <List>
                                                {students.map((student: any) => (
                                                    <ListItem key={student.id}>
                                                        {student.name}
                                                        <ListItemSecondaryAction>
                                                            <IconButton onClick={() => null}>
                                                                <Icon>close</Icon>
                                                            </IconButton>
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                ))}
                                            </List>
                                        ) : (
                                            <p>No students in this cluster.</p>
                                        )}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })
                    ) : (
                        <EmptyStateIcon variant='clusters'>
                            <h2>No Clusters were found</h2>
                            <h3>Student Clusters that have been created will appear here.</h3>
                            <Button variant='contained' color='primary'>Add Cluster</Button>
                        </EmptyStateIcon>
                    )}
                </div>
                
            </div>
        )
    }
}