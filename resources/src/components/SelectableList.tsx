import React from 'react'

import {
    Checkbox,
    Divider,
    Fade,
    Icon,
    LinearProgress,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TableSortLabel,
    Tooltip,
    Typography
} from '@material-ui/core'

import { SortOrder } from '../types/table'
import { LoadingIconButton } from './Form/LoadingIconButton'

export interface ISelectableListItem {
    id: string | number,
    label: string
}

export interface ISelectableListAction {
    icon: string
    title: string
    callback: (selected: Array<string | number>) => Promise<any>
}

interface IProps {
    actions: ISelectableListAction[]
    items: ISelectableListItem[]
    selected: Array<string | number>
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
        if (this.isLoading()) {
            return
        }
        this.props.onToggleSelected(item.id, !selected)
    }

    handleSelectAll = () => {
        if (this.isLoading()) {
            return
        }
        this.props.onSelectAll()
    }

    isLoading = (): boolean => {
        return this.state.loadingActions.length > 0
    }

    render() {
        const { actions, items, selected, sortable, sortLabel, title } = this.props
        const allSelected: boolean = items.length === selected.length
        const isLoading: boolean = this.isLoading()

        return (
            <div className='selectable-list'>
                <div className='selectable-list__header'>
                    <div className='selectable-list__title'>
                        <Checkbox
                            indeterminate={selected.length > 0 && !allSelected}
                            checked={allSelected}
                            onChange={() => this.handleSelectAll()}
                            color='primary'
                        />
                        {/*sortable ? (
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
                        )*/}
                        <Typography variant='h6'>{title}</Typography>
                    </div>
                    <Fade in={selected.length > 0}>
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
                    </Fade>
                </div>
                {isLoading ? <LinearProgress /> : <Divider />}
                <List className='selectable-list__list'>
                    {items.map((item: ISelectableListItem) => {
                        const isSelected: boolean = this.props.selected.indexOf(item.id) !== -1
                        return (
                            <ListItem
                                disabled={isLoading}
                                dense
                                button
                                disableRipple
                                onClick={() => this.handleClick(item, isSelected)}
                                key={item.id}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        color='primary'
                                        edge='start'
                                        checked={isSelected}
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
