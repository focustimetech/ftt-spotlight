import React from 'react'

import { Popover } from '@material-ui/core'

import TopicsForm, { ITopicsFormProps } from '../Form/Forms/TopicsForm'

interface ITopicsDialogProps extends ITopicsFormProps {
    anchorEl: Element
    onClose: () => void
}

const TopicsDialog = (props: ITopicsDialogProps) => {
    const { anchorEl, onClose, ...rest } = props
    return (
        <Popover open={Boolean(props.anchorEl)} PaperProps={{ className: 'list-form' }} anchorEl={anchorEl} onClose={onClose}>
            <TopicsForm {...rest} />
        </Popover>
    )
}

export default TopicsDialog

