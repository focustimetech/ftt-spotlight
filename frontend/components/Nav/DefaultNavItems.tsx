import React from 'react'

import AccountWidget, { IAccountWidgetProps } from './AccountWidget'
import HelpWidget from './HelpWidget'
import SettingsWidget from './SettingsWidget'

interface IDefaultNavItemsProps extends IAccountWidgetProps {
    noSettings?: boolean
}

const DefaultNavItems = (props: IDefaultNavItemsProps) => {
    return (
        <>
            <HelpWidget orientation={props.orientation} />
            {!props.noSettings && (
                <SettingsWidget orientation={props.orientation} />
            )}
            <AccountWidget {...props} />
        </>
    )
}

export default DefaultNavItems
