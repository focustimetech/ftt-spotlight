import React from 'react'
import { connect } from 'react-redux'

import { IUser } from '../types/auth'

interface IReduxProps {
    currentUser: IUser
}

class Profile extends React.Component<IReduxProps> {

}

const mapStateToProps = (state) => ({
    currentUser: state.auth.user
})

export default connect(mapStateToProps)(Profile)
