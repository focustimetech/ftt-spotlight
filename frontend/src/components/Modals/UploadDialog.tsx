import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    Icon,
    List,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core'
import { DialogProps } from '@material-ui/core/Dialog'
import Flexbox from '../Layout/Flexbox'
import { StudentUploadForm } from '../Form/Forms/Upload'

const UploadDialog = (props: DialogProps) => {
    const [resource, setResource] = React.useState(null)
    const [index, setIndex] = React.useState(0)

    const handleSelectResource = (res: 'staff' | 'students' | 'clusters' | 'teachers') => {
        setIndex(1)
        setResource(res)
    }

    return (
        <Dialog {...props}>
            <SwipeableViews index={index}>
                <>
                    <DialogTitle>Upload data</DialogTitle>
                    <DialogContent>
                        <Typography>Upload large spreadsheets to quickly add resources for your school.</Typography>
                        <List>
                            <Flexbox>
                                <ListItem>
                                    <ListItemIcon><Icon>school</Icon></ListItemIcon>
                                    <ListItemText primary='Students' secondary='Create accounts for students.' />
                                </ListItem>
                                <Button onClick={() => handleSelectResource('students')}>Create</Button>
                            </Flexbox>
                            <Flexbox>
                                <ListItem>
                                    <ListItemIcon><Icon>person</Icon></ListItemIcon>
                                    <ListItemText primary='Teachers' secondary='Create accounts for teachers.' />
                                </ListItem>
                                <Button onClick={() =>  handleSelectResource('teachers')}>Create</Button>
                            </Flexbox>
                            <Flexbox>
                                <ListItem>
                                    <ListItemIcon><Icon>admin_panel_settings</Icon></ListItemIcon>
                                    <ListItemText primary='Staff' secondary='Create accounts for non-teaching staff and administrators.' />
                                </ListItem>
                                <Button onClick={() =>  handleSelectResource('staff')}>Create</Button>
                            </Flexbox>
                            <Flexbox>
                                <ListItem>
                                    <ListItemIcon><Icon>group</Icon></ListItemIcon>
                                    <ListItemText primary='Cluster' secondary='Organize students into manageable groups, such as Advisories.' />
                                </ListItem>
                                <Button onClick={() =>  handleSelectResource('clusters')}>Create</Button>
                            </Flexbox>
                        </List>
                    </DialogContent>
                </>
                <>
                    {resource === 'students' && (
                        <>
                            <DialogTitle>Student upload</DialogTitle>
                            <DialogContent><StudentUploadForm /></DialogContent>
                        </>
                    )}
                    {resource === 'teachers' && (
                        <span>Teachers</span>
                    )}
                    {resource === 'staff' && (
                        <span>Staff</span>
                    )}
                    {resource === 'clusters' && (
                        <span>Clusters</span>
                    )}
                </>
            </SwipeableViews>
            <DialogActions>
                <Button onClick={() => props.onClose(null, null)}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UploadDialog
