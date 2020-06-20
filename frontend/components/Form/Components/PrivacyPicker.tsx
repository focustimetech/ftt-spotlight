import classNames from 'classnames'
import React from 'react'

import {
    FormControl,
    Icon,
    InputLabel,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Radio
} from '@material-ui/core'
import { MenuProps } from '@material-ui/core/Menu'
import Select, { SelectProps } from '@material-ui/core/Select'

import Flexbox from '../../Layout/Flexbox'

export type PrivacySetting = 'public' | 'private' | 'unlisted'

interface IPrivacyPickerProps extends Omit<SelectProps, 'onSelect'> {
    value: PrivacySetting
    onSelect: (setting: PrivacySetting) => void
    MenuProps?: MenuProps
    unlistable?: boolean
}

const PrivacyPicker = (props: IPrivacyPickerProps) => {
    const { value, onSelect, unlistable, MenuProps } = props

    const handleSelect = (event: React.ChangeEvent<{ value: PrivacySetting }>) => {
        const { value } = event.target
        onSelect(value)
    }

    return (
        <FormControl className='privacy-picker' variant={'outlined'} margin={undefined}>
            <InputLabel id='privacy-picker-label'>Privacy</InputLabel>
            <Select
                value={value}
                onChange={handleSelect}
                labelId='privacy-picker-label'
                MenuProps={MenuProps}
                label='Privacy'
                renderValue={(value: string) => {
                    switch (value) {
                        case 'public':
                            return 'Public'
                        case 'unlisted':
                            return 'Unlisted'
                        case 'private':
                            return 'Private'                        
                    }   
                }}
            >
                <MenuItem value='public'>
                    <ListItemIcon>
                        <Radio color='primary' checked={value === 'public'} />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Flexbox><Icon>public</Icon><span>Public</span></Flexbox>}
                        secondary='Anyone can search for and view'
                    />
                </MenuItem>
                {props.unlistable !== false && (
                    <MenuItem value='unlisted'>
                        <ListItemIcon>
                            <Radio color='primary' checked={value === 'unlisted'} />
                        </ListItemIcon>
                        <ListItemText
                            primary={<Flexbox><Icon>link</Icon><span>Unlisted</span></Flexbox>}
                            secondary='Only those with a link can view'
                        />
                    </MenuItem>
                )}
                <MenuItem value='private'>
                    <ListItemIcon>
                        <Radio color='primary' checked={value === 'private'} />
                    </ListItemIcon>
                    <ListItemText
                        primary={<Flexbox><Icon>lock</Icon><span>Private</span></Flexbox>}
                        secondary='Only you can view'
                    />
                </MenuItem>
            </Select>
        </FormControl>
    )
}

export default PrivacyPicker
