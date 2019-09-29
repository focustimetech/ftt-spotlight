import * as React from 'react'

import {
    Checkbox,
    Divider,
    Icon,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    TableSortLabel,
    Tooltip,
    Typography
} from '@material-ui/core'

import { SortOrder } from '../types/table'
import { SetState } from '../types/app'
import { LoadingIconButton } from './Form/LoadingIconButton'

export interface ISelectableListItem {
    id: string | number,
    label: string
}

export interface ISelectableListAction {
    icon: string
    title: string
    callback: (selected: (string | number)[]) => Promise<any>
}

interface IProps {
    actions: ISelectableListAction[]
    items: ISelectableListItem[]
    selected: (string | number)[]
    title: string
    sortable?: boolean
    sortLabel?: string
    onToggleSelected?: (id: string | number, selected: boolean) => void
    onSelectAll: () => void
}

interface IState {
    sortingActive: boolean
    sortingOrder: SortOrder
    loadingActions: number[]
}

export class SelectableList extends React.Component<IProps, IState> {
    state: IState = {
        sortingActive: false,
        sortingOrder: 'desc',
        loadingActions: []
    }

    handleSort = () => {
        this.setState({ sortingActive: true })
    }

    toggleSort = () => {
        this.setState((state: IState) => ({
            sortingOrder: state.sortingOrder === 'asc' ? 'desc' : 'asc'
        }))
    }

    setActionLoading = (index: number) => {
        this.setState((state: IState) => ({
            loadingActions: [...state.loadingActions, index]
        }))
    }

    unsetActionLoading = (index: number) => {
        this.setState((state: IState) => ({
            loadingActions: state.loadingActions.filter((actionIndex: number) => actionIndex !== index)
        }))
    }

    handleCallback = (callback: ISelectableListAction['callback'], index: number) => {
        this.setActionLoading(index)
        callback(this.props.selected)
            .then(() => {
                this.unsetActionLoading(index)
            })
            .catch(() => {
                this.unsetActionLoading(index)
            })
    }

    handleClick = (item: ISelectableListItem, selected: boolean) => {
        this.props.onToggleSelected(item.id, !selected)
    }

    render() {
        const { actions, items, selected, sortable, sortLabel, title } = this.props
        const allSelected: boolean = items.length === selected.length
        return (
            <div className='selectable-list'>
                <div className='selectable-list__header'>
                    <div className='selectable-list__title'>
                        <Checkbox
                            indeterminate={selected.length > 0 && !allSelected}
                            checked={allSelected}
                            onChange={this.props.onSelectAll}
                            color='primary'
                        />
                        {sortable ? (
                            <Tooltip title={`Sort by ${sortLabel}`}>
                                <TableSortLabel
                                    active={this.state.sortingActive}
                                    direction={this.state.sortingOrder}
                                    onClick={() => this.handleSort()}
                                >
                                    {title}
                                </TableSortLabel>
                            </Tooltip>
                        ) : (
                            <Typography variant='h6'>{title}</Typography>
                        )}
                    </div>
                    {selected.length > 0 && (
                        <div className='selectable-list__actions'>
                            {actions.map((action: ISelectableListAction, index: number) => (
                                <Tooltip title={action.title}>
                                    <LoadingIconButton
                                        onClick={() => this.handleCallback(action.callback, index)}
                                        loading={this.state.loadingActions.indexOf(index) !== -1}
                                    >
                                        <Icon>{action.icon}</Icon>
                                    </LoadingIconButton>
                                </Tooltip>
                            ))}
                        </div>
                    )}
                </div>
                <Divider />
                <List className='selectable-list__list'>
                    {items.map((item: ISelectableListItem) => {
                        const selected: boolean = this.props.selected.indexOf(item.id) !== -1
                        return (
                            <ListItem
                                dense
                                button
                                disableRipple
                                onClick={() => this.handleClick(item, selected)}
                                key={item.id}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        color='primary'
                                        edge="start"
                                        checked={selected}
                                        tabIndex={-1}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItem>
                        )
                    })}
                </List>
            </div>
        )
    }
}
