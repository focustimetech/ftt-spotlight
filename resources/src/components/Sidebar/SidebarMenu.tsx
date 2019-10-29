import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { Switch, Route, RouteComponentProps } from 'react-router-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { IStaffUser } from '../../types/auth'
import { MenuItem } from './MenuItem'
import { WikiMenu } from '../Wiki/WikiMenu'

interface ReduxProps {
    currentUser: IStaffUser
    settings: any
}

interface IProps extends ReduxProps {
    routeComponentProps: RouteComponentProps
}

class SidebarMenu extends React.Component<IProps> {
    render() {
        const schoolName: string = this.props.settings.values['school_name'].value || null
        const schoolLogo: string = this.props.settings.values['school_logo'].value || null
        const isAdministrator: boolean = this.props.currentUser && this.props.currentUser.details.administrator === true
        return (
            <div className='sidebar__menu'>
                <div className='menu_content'>
                    <div className='menu_header'>
                        <div className={classNames('menu_header__logo', {['--logo']: schoolLogo})}>{schoolLogo && (
                            <img src={`/static/images/logos/${schoolLogo}`} />	
                        )}</div>
                        <h4>{schoolName}</h4>
                    </div>
                    <TransitionGroup>
                        <CSSTransition
                            timeout={3000}
                            classNames='fade'
                            key={this.props.routeComponentProps.location.key}
                        >
                            <Switch location={this.props.routeComponentProps.location}>
                                <Route path='/wiki' component={() => (
                                    <div className='router-page'>
                                        <WikiMenu />
                                    </div>
                                )} />
                                <Route render={() => (
                                    <div className='router-page'>
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
                                    </div>
                                )} />
                            </Switch>
                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user,
    settings: state.settings.items
})

export default connect(mapStateToProps, null)(SidebarMenu)
