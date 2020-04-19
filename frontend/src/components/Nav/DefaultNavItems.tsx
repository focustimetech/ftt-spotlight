import React from 'react'

import AccountWidget, { IAccountWidgetProps } from './AccountWidget'
import HelpWidget from './HelpWidget'
import SettingsWidget from './SettingsWidget'

type IDefaultNavItemsProps = IAccountWidgetProps

const DefaultNavItems = (props: IDefaultNavItemsProps) => {
    return (
        <>
            <HelpWidget />
            <SettingsWidget />
            <AccountWidget {...props} />
        </>
    )
}

export default DefaultNavItems
