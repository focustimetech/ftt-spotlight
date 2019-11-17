import React from 'react'
import ContentLoader from 'react-content-loader'

import { ListItem } from '@material-ui/core'

import { IBlogGroup } from '../../types/wiki'
import { MenuItem } from '../Sidebar/MenuItem'

interface IProps {
    wikiGroups: IBlogGroup[]
}

const WikiMenu = (props: IProps) => {
    return (
        <ul className='menu_list'>
            {props.wikiGroups && props.wikiGroups.length > 0 ? (
                <>
                    <MenuItem inactive to='/' icon='chevron_left' label='Back to Spotlight' />
                    {props.wikiGroups.map((group: IBlogGroup) => (
                        <MenuItem to={`/wiki/${group.id}`} label={group.title} />
                    ))}
                </>
            ) : (
                <div style={{height: 600, width: 228}}>
                    <ContentLoader height={600} width={256}>
                        <rect x={16} y={16} rx={24} ry={24} height={32} width={32}/>
                        <rect x={64} y={24} rx={4} ry={4} height={16} width={64}/>
                        <rect x={16} y={68} rx={24} ry={24} height={32} width={32}/>
                        <rect x={64} y={76} rx={4} ry={4} height={16} width={176}/>
                        <rect x={16} y={120} rx={24} ry={24} height={32} width={32}/>
                        <rect x={64} y={128} rx={4} ry={4} height={16} width={96}/>
                        <rect x={16} y={172} rx={24} ry={24} height={32} width={32}/>
                        <rect x={64} y={180} rx={4} ry={4} height={16} width={64}/>
                        <rect x={16} y={224} rx={24} ry={24} height={32} width={32}/>
                        <rect x={64} y={232} rx={4} ry={4} height={16} width={80}/>
                        <rect x={16} y={276} rx={24} ry={24} height={32} width={32}/>
                        <rect x={64} y={184} rx={4} ry={4} height={16} width={136}/>
                    </ContentLoader>
                </div>
            )}
        </ul>
    )
}

export { WikiMenu }
