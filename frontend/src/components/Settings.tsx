import * as React from 'react'

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
} from '@material-ui/core';

import { ISettingsGroup, ISetting } from '../types/appSettings'
import { fetchSettings } from '../actions/settingsActions'
import { TopNav } from './TopNav'

interface ReduxProps {
    settingsGroups: ISettingsGroup[]
    fetchSettings: () => void
}

interface IProps extends ReduxProps {}

interface IState {
    expanded: number,
    loading: boolean
}

class Settings extends React.Component<IProps, IState> {
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
        console.log(settingsGroups)
        return (
            <>
                <TopNav>
                    <ul><h3>Settings</h3></ul>
                </TopNav>
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
                                    <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}onClick={() => this.handleClick(index)}>
                                        <p className='expansion-panel__heading'>{settingsGroup.name}</p>
                                        <p className='expansion-panel__subheading'>{settingsGroup.description}</p>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {settingsGroup.settings.map((setting: ISetting) => {
                                            let settingInput: any
                                            switch (setting.type) {
                                                case 'boolean':
                                                    settingInput = <Switch id={setting.key} checked={setting.value} />
                                                    break
                                                case 'number':
                                                    settingInput = <TextField value={setting.value} id={setting.key} type='number' required />
                                                    break
                                                case 'string':
                                                default:
                                                    settingInput = <TextField value={setting.value} id={setting.key} type='string' required />
                                                    break
                                            }
                                            return (
                                                <div className='setting'>
                                                    <p>{setting.description}</p>
                                                    {settingInput}
                                                </div>
                                            )
                                        })}
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                            )
                        })}
                    </div>
                )}
                
            </>
        )
    }
}

const mapStateToProps = (state: any) => ({
    settingsGroups: state.settings.items
})

export default connect(mapStateToProps, { fetchSettings })(Settings)
