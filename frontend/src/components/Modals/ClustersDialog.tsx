import * as React from 'react'

import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'

import { EmptyStateIcon } from '../EmptyStateIcon'
import { EnhancedDialogTitle } from './EnhancedDialogTitle'

interface ReduxProps {}

type LoadingState = 'idle' | 'submitting' | 'fetching'

interface IProps extends ReduxProps {
    open: boolean
    clusters: any[]
    selected?: number[]
    onClose: () => void
    onSubmit?: () => void
}

interface IState {
    selected: number[]
    loadingState: LoadingState
}

export class ClustersDialog extends React.Component<IProps, IState> {
    state: IState = {
        loadingState: 'idle',
        selected: this.props.selected || []
    }

    handleToggle = (index: number) => {

    }

    handleSubmit = () => {
        this.setState({ loadingState: 'submitting' })
    }

    render() {
        return (
            <Dialog open={this.props.open} className='clusters-dialog'>
                <EnhancedDialogTitle onClose={this.props.onClose} title='Add to Cluster' />
                {this.props.clusters.length > 0 ? (
                    <>
                        <List>
                            {this.props.clusters.map((cluster: any, index: number) => (
                                <ListItem key={index} dense button>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={this.state.selected.indexOf(index) !== -1}
                                            color='primary'
                                        />
                                    </ListItemIcon>
                                    {cluster}
                                </ListItem>
                            ))}
                        </List>
                        <DialogActions>
                            <Button onClick={() => this.props.onClose()}>Cancel</Button>
                            <Button color='primary' onClick={() => this.handleSubmit()}>Save</Button>
                        </DialogActions>
                    </>
                ) : (
                    <DialogContent>
                        <EmptyStateIcon variant='clusters'>
                            <h6>No Clusters found.</h6>
                        </EmptyStateIcon>
                    </DialogContent>
                )}
            </Dialog>
        )
    }
}
