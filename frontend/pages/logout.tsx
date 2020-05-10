import { NextPageContext } from 'next'
import React from 'react'

import API from '../utils/api'
import redirect from '../utils/redirect'

/**
 * Router endpoint used to sign out the User without loading the app
 */
class Logout extends React.Component {
    static getServerSideProps = async (context: NextPageContext) => {
        redirect('/login', context)
    }
}

export default Logout
