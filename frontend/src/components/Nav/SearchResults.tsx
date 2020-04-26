import Link from 'next/link'
import React from 'react'

import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@material-ui/core'

import { IAvatar, IStaff, IStudent, ITeacher } from '../../types/auth'
import { IClassroom } from '../../types/classroom'
import { ICluster, IClusterDetails } from '../../types/cluster'
import { ISearchResults, SearchResultKey } from '../../types/components/search'

interface ISearchResultProps {
    results: ISearchResults
}

interface ISearchResultListItem {
    avatar?: IAvatar
    value: string
    link: string
}

const searchGroupNames: Record<SearchResultKey, string> = {
    teacher: 'Teachers',
    staff: 'Staff',
    student: 'Students',
    cluster: 'Clusters',
    classroom: 'Classrooms'
}

const SearchResults = (props: ISearchResultProps) => {
    const { results } = props
    const keys = Object.keys(results)
        .filter((key: SearchResultKey) => results[key] && results[key].length > 0)
        .sort((a: SearchResultKey, b: SearchResultKey) => results[a].length - results[b].length)

    return (
        <div className='search-results'>
            {keys.map((key: SearchResultKey) => {
                let resultListItems: ISearchResultListItem[]
                switch (key) {
                    case 'teacher':
                        resultListItems = results.teacher.map((teacher: ITeacher) => ({
                            avatar: teacher.avatar,
                            value: teacher.name,
                            link: `teachers/${teacher.id}`
                        }))
                        break
                    case 'staff':
                        resultListItems = results.staff.map((staff: IStaff) => ({
                            avatar: staff.avatar,
                            value: staff.name,
                            link: `staff/${staff.id}`
                        }))
                        break
                    case 'student':
                        resultListItems = results.student.map((student: IStudent) => ({
                            avatar: student.avatar,
                            value: student.name,
                            link: `students/${student.id}`
                        }))
                        break
                    case 'classroom':
                        resultListItems = results.classroom.map((classroom: IClassroom) => ({
                            value: classroom.name,
                            link: `classrooms/${classroom.id}`
                        }))
                        break
                    case 'cluster':
                        resultListItems = results.cluster.map((cluster: IClusterDetails) => ({
                            value: cluster.name,
                            link: `clusters/${cluster.id}`
                        }))
                        break
                    default:
                        return []
                }
                return (
                    <>
                        <Typography variant='overline'>{searchGroupNames[key]}</Typography>
                        <List dense>
                            {resultListItems.map((resultListItem: ISearchResultListItem) => (
                                <Link href={resultListItem.link}>
                                    <ListItem dense>
                                        {resultListItem.avatar && (
                                            <ListItemAvatar>
                                                <Avatar className='avatar --small' style={{ background: `#${resultListItem.avatar.color}` }}>
                                                    {resultListItem.avatar.initials}
                                                </Avatar>
                                            </ListItemAvatar>
                                        )}
                                        <ListItemText>{resultListItem.value}</ListItemText>
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </>
                )
            })}
        </div>
    )
}

export default SearchResults
