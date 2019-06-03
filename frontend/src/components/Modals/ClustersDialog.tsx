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

interface IProps extends ReduxProps {
    open: boolean
    onClose: () => void
    onSelect?: () => void
}

const data = [
    'Cluster 1', 'Cluster 2', 'Cluster 3'
]

export const ClustersDialog = (props: IProps) => {
    return (
        <Dialog open={props.open} className='clusters-dialog'>
            <EnhancedDialogTitle onClose={props.onClose} title='Add to Cluster' />
            {data.length > 0 ? (
                <>
                    <List>
                        {data.map((cluster: any, index: number) => (
                            <ListItem key={index} dense button>
                                <ListItemIcon>
                                    <Checkbox />
                                </ListItemIcon>
                                {cluster}
                            </ListItem>
                        ))}
                    </List>
                    <DialogActions>
                        <Button onClick={() => props.onClose()}>Cancel</Button>
                        <Button color='primary'>Save</Button>
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
