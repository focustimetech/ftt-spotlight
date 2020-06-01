import React from 'react'

import { Popover } from '@material-ui/core'

import TopicsForm from '../Form/Forms/TopicsForm'

interface ITopicsDialogProps {
    anchorEl: Element
    onClose: () => void
}

const TopicsDialog = (props: ITopicsDialogProps) => {
    return (
        <Popover open={Boolean(props.anchorEl)} PaperProps={{ className: 'list-form' }} anchorEl={props.anchorEl} onClose={props.onClose}>
            <TopicsForm />
        </Popover>
    )
}

export default TopicsDialog

