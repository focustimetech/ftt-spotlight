import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Icon,
    Switch,
    TextField
} from '@material-ui/core'

import { fetchSettings } from '../../actions/settingsActions'
import { ISetting, ISettingsGroup } from '../../types/settings'

interface IReduxProps {
    settingsGroups: ISettingsGroup[]
    fetchSettings: () => void
}

interface IState {
    expanded: number,
    loading: boolean
}

class Settings extends React.Component<IReduxProps, IState> {
    state: IState = {
        expanded: 0,
        loading: false
    }

    handleClick = (index: number) => {
        this.setState((state: IState) => {
            return { expanded: state.expanded === index ? -1 : index }
        })
    }

    componentDidMount() {
        this.props.fetchSettings()
    }

    render() {
        const { settingsGroups } = this.props
        return (
            <div className='content' id='content'>
                <TopNav breadcrumbs={[{ value: 'Settings', to: '/settings' }]} />
                {settingsGroups.length && (
                    <div className='settings'>
                        {settingsGroups.map((settingsGroup: ISettingsGroup, index: number) => {
                            const expanded = index === this.state.expanded
                            return (
                                <ExpansionPanel
                                    className='expansion-panel'
                                    key={index}
                                    expanded={expanded}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<Icon>expand_more</Icon>}
                                        onClick={() => this.handleClick(index)}
                                    >
                                        <p className='expansion-panel__heading'>{settingsGroup.name}</p>
                                        <p className='expansion-panel__subheading'>{settingsGroup.description}</p>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails className='expansion-panel__details'>
                                        {settingsGroup.settings.length && (
                                            <div>
                                                {settingsGroup.settings.map((setting: ISetting) => {
                                                    let control: any
                                                    switch (setting.type) {
                                                        case 'boolean':
                                                            control = (
                                                                <Switch id={setting.key} checked={setting.value} />
                                                            )
                                                            break
                                                        case 'numeric':
                                                            control = (
                                                                <TextField
                                                                    value={setting.value}
                                                                    id={setting.key}
                                                                    type='number'
                                                                    required
                                                                />
                                                            )
                                                            break
                                                        case 'datetime':
                                                            control = (
                                                                <div />
                                                            )
                                                            break
                                                        case 'string':
                                                        default:
                                                            control = (
                                                                <TextField value={setting.value} id={setting.key} type='string' required />
                                                            )
                                                            break
                                                    }
                                                    return (
                                                        <div className='setting'>
                                                            <p>{setting.description}</p>
                                                            {control}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        )}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                    </div>
                )}
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    settingsGroups: state.settings.items
})

export default connect(mapStateToProps, { fetchSettings })(Settings)
