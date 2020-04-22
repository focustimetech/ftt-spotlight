import React from 'react'

import HorizontalNav from '../Nav/HorizontalNav'

interface IStudentLayoutProps {
    children: any
}

class StudentLayout extends React.Component<IStudentLayoutProps> {
    render() {
        return (
            <>
                <HorizontalNav hasFavorites />
            </>
        )
    }
}

export default StudentLayout
