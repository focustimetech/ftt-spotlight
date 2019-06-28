import * as React from 'react'

import { connect } from 'react-redux'

import {
    Button,
    Checkbox,
    ExpansionPanel,
    ExpansionPanelActions,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Switch
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

const data: any[] = []

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
                                    onClick={() => this.handleClick(index)}
                                    expanded={expanded}
                                >
                                    <ExpansionPanelSummary>
                                        <p className='expansion-panel__heading'>{settingsGroup.name}</p>
                                        <p className='expansion-panel__subheading'>{'Subheading'}</p>
                                    </ExpansionPanelSummary>
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
