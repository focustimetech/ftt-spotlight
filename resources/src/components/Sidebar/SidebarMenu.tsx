import classNames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'
import { Route, RouteComponentProps, Switch } from 'react-router-dom'

import { Typography } from '@material-ui/core'

import { IStaffUser } from '../../types/auth'
import { ISetting, ISettingsGroup, SettingKey } from '../../types/settings'
import { IBlogGroup } from '../../types/wiki'
import { SettingsHelper } from '../../utils/SettingsHelper'
import { WikiMenu } from '../Wiki/WikiMenu'
import { MenuItem } from './MenuItem'

interface IAppSettings {
    values: Record<SettingKey, ISetting>
    groups: ISettingsGroup[]
}
interface IReduxProps {
    currentUser: IStaffUser
    settings: IAppSettings
    wikiGroups: IBlogGroup[]
}

interface IProps extends IReduxProps {
    routeComponentProps: RouteComponentProps
}

class SidebarMenu extends React.Component<IProps> {
    render() {
        const settings = new SettingsHelper(this.props.settings.values)
        const schoolName: string = settings.getValue('school_name') as string
        const schoolLogo: string = settings.getValue('school_logo') as string
        const isAdministrator: boolean = this.props.currentUser && this.props.currentUser.details.administrator === true
        return (
            <div className='sidebar__menu'>
                <div className='menu_content'>
                    <div className='menu_header'>
                        <div className={classNames('menu_header__logo', {['--logo']: schoolLogo})}>{schoolLogo && (
                            <img src={`/static/images/logos/${schoolLogo}`} />
                        )}</div>
                        <Typography variant='subtitle1'>{schoolName}</Typography>
                    </div>
                    <Switch location={this.props.routeComponentProps.location}>
                        {/*
                        <Route path='/wiki' component={() => (
                            <WikiMenu wikiGroups={this.props.wikiGroups} />
                        )} />
                        */}
                        <Route render={() => (
                            <ul className='menu_list'>
                                <MenuItem to='/check-in' icon='how_to_vote' label='Check-in' />
                                <MenuItem to='/staff' icon='supervisor_account' label='Staff' />
                                <MenuItem to='/students' icon='face' label='Students' />
                                <MenuItem to='/power-scheduler' icon='offline_bolt' label='Power Scheduler' />
                                {isAdministrator && (
                                    <>
                                        <MenuItem to='/credentials-manager' icon='security' label='Credentials Manager' />
                                    </>
                                )}
                            </ul>
                        )} />
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user,
    settings: state.settings.items,
    wikiGroups: state.wiki.groups
})

export default connect(mapStateToProps, null)(SidebarMenu)