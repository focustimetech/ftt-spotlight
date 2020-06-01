import React from 'react'

import AccountWidget, { IAccountWidgetProps } from './Widgets/AccountWidget'
import HelpWidget from './Widgets/HelpWidget'
import SettingsWidget from './Widgets/SettingsWidget'

interface IDefaultNavItemsProps extends IAccountWidgetProps {
    noSettings?: boolean
}

const DefaultNavItems = (props: IDefaultNavItemsProps) => {
    return (
        <>
            <HelpWidget orientation={props.orientation} />
            {/*
            {!props.noSettings && (
                <SettingsWidget orientation={props.orientation} />
            )}
            */}
            <AccountWidget {...props} />
        </>
    )
}

export default DefaultNavItems
