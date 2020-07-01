import Router from 'next/router'
import nprogress from 'nprogress'
import React from 'react'
import { connect } from 'react-redux'

import { IUser } from '../../types/auth'
import { ILayoutContainerProps, Orientation } from '../../types/layout'

import HorizontalNav from '../Nav/HorizontalNav'
import VerticalNav from '../Nav/VerticalNav'

import GuardianLayout from './Layouts/GuardianLayout'
import LayoutContainer from './LayoutContainer'
import StaffLayout from './Layouts/StaffLayout'
import StudentLayout from './Layouts/StudentLayout'
import SysAdminLayout from './Layouts/SysAdminLayout'
import TeacherLayout from './Layouts/TeacherLayout'

const DEFAULT_ORIENTATION: Orientation = 'horizontal'

interface ILayoutProps extends ILayoutContainerProps {
    user?: IUser
}

class Layout extends React.Component<ILayoutProps> {
    componentDidMount() {
        nprogress.configure({ trickleSpeed: 100, showSpinner: false })
        Router.events.on('routeChangeStart', () => nprogress.start())
        Router.events.on('routeChangeComplete', () => nprogress.done())
        Router.events.on('routeChangeError', () => nprogress.done())
    }

    componentWillUnmount() {
        Router.events.off('routeChangeStart', () => nprogress.start())
        Router.events.off('routeChangeComplete', () => nprogress.done())
        Router.events.off('routeChangeError', () => nprogress.done())
    }

    render() {
        const { user } = this.props

        if (this.props.getLayout) {
            return this.props.getLayout({ children: this.props.children })
        } else if (user && user.accountType) {
            switch (user.accountType) {
                case 'guardian':
                    return <GuardianLayout>{this.props.children}</GuardianLayout>
                case 'staff':
                    return <StaffLayout>{this.props.children}</StaffLayout>
                case 'student':
                    return <StudentLayout>{this.props.children}</StudentLayout>
                case 'teacher':
                    return <TeacherLayout>{this.props.children}</TeacherLayout>
                case 'sysadmin':
                    return <SysAdminLayout>{this.props.children}</SysAdminLayout>
                default:
                    return (
                        <LayoutContainer orientation={DEFAULT_ORIENTATION}>
                            {DEFAULT_ORIENTATION === 'horizontal' ? (
                                <HorizontalNav />
                            ) : (
                                <VerticalNav />
                            )}
                            {this.props.children}
                        </LayoutContainer>
                    )
            }
        }

        return <LayoutContainer orientation='horizontal'>{this.props.children}</LayoutContainer>
    }
}

const mapStateToProps = (state: any) => ({
    currentUser: state.auth.user
})

export default connect(mapStateToProps)(Layout)
