import React from 'react'

import AccountWidget, { IAccountWidgetProps } from './AccountWidget'
import HelpWidget from './HelpWidget'
import SettingsWidget from './SettingsWidget'

type IDefaultNavItemsProps = IAccountWidgetProps

const DefaultNavItems = (props: IDefaultNavItemsProps) => {
    return (
        <>
            <HelpWidget orientation={props.orientation} />
            <SettingsWidget orientation={props.orientation} />
            <AccountWidget {...props} />
        </>
    )
}

export default DefaultNavItems
