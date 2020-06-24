import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Checkbox,
    Icon,
    ListItemIcon,
    ListItemSecondaryAction,
    MenuItem,
    Typography,
    TextField,
} from '@material-ui/core'

import {
    addToCluster,
    createCluster,
    deleteCluster,
    fetchClusters,
    removeFromCluster
} from '../../../actions/clusterActions'
import { ISnackbar, queueSnackbar } from '../../../actions/snackbarActions'
import { ICluster, INewCluster, IClusterPivot } from '../../../types/cluster'
import p from '../../../utils/pluralize'

import Flexbox from '../../Layout/Flexbox'
import { FormRow, FormRowElement } from '..'
import ListForm, {
    ListFormActionArea,
    ListFormContent,
    ListFormEmptyState,
    ListFormHeader,
    ListFormList
} from '../ListForm'
import { LoadingButton } from '../Components/LoadingButton'
import PrivacyPicker, { PrivacySetting } from '../Components/PrivacyPicker'

interface IReduxProps {
    clusters: ICluster[]
    addToCluster: (clusterId: number, studentIds: number[]) => Promise<any>
    removeFromCluster: (clusterId: number, studentIds: number[]) => Promise<any>
    createCluster: (cluster: INewCluster) => Promise<any>
    deleteCluster: (clusterId: number) => Promise<any>
    fetchClusters: () => Promise<any>
    queueSnackbar: (snackbar: ISnackbar) => void
}

interface IClusterFormProps extends IReduxProps {
    studentIds: number[]
}

interface IClustersFormState {
    creating: boolean
    loadingCluster: boolean
    loadingInitialClusters: boolean
    inputValue: string
    isPublic: boolean
}

class ClustersForm extends React.Component<IClusterFormProps, IClustersFormState> {
    state: IClustersFormState = {
        creating: false,
        loadingCluster: false,
        loadingInitialClusters: false,
        inputValue: '',
        isPublic: false
    }

    componentDidMount() {
        if (!this.props.clusters || this.props.clusters.length === 0) {
            this.setState({ loadingInitialClusters: true })
            this.props.fetchClusters().then(() => {
                this.setState({ loadingInitialClusters: false })
            })
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const { value } = event.target
        this.setState({ inputValue: value })
    }

    handleOpenCreating = () => {
        this.setState({ creating: true })
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const cluster: INewCluster = {
            name: this.state.inputValue,
            public: this.state.isPublic,
        }
        this.setState({ loadingCluster: true })
        this.props.createCluster(cluster).then(() => {
            this.props.queueSnackbar({ message: 'Created new Cluster.'})
            this.setState({ loadingCluster: false, inputValue: '', isPublic: false })
        }, () => {
            this.props.queueSnackbar({ message: 'Could not create new Cluster.'})
            this.setState({ loadingCluster: false })
        })
    }

    handleSelectCluster = (cluster: ICluster, attach: boolean) => {
        if (this.props.studentIds.length === 0) {
            return
        }
        const syncCluster: (clusterId: number, studentIds: number[]) => Promise<any> = attach
            ? this.props.addToCluster
            : this.props.removeFromCluster
        syncCluster(cluster.id, this.props.studentIds).then(() => {
            this.props.queueSnackbar({ message: attach ? 'Added students to Cluster.' : 'Removed students from Cluster.'})
        }, (err: any) => {
            this.props.queueSnackbar({ message: 'Could not modify the Cluster.'})
        })
    }

    handlePrivacyChange = (setting: PrivacySetting) => {
        this.setState({ isPublic: setting === 'public' })
    }

    render() {
        const { clusters, studentIds } = this.props

        return (
            <ListForm onSubmit={this.handleSubmit} autoComplete='off'>
                <ListFormHeader>
                    {studentIds.length > 0
                        ? `Add ${studentIds.length > 1 ? `${studentIds.length} ` : ''}${p('student', studentIds.length)} to...`
                        : 'Clusters'
                    }
                </ListFormHeader>
                <ListFormList>
                    {clusters && clusters.length > 0 && clusters.map((cluster: ICluster) => {
                        const checked: boolean = studentIds.length > 0 && studentIds.every((id: number) => cluster.studentIds.some((studentId: number) => id === studentId))
                        const indeterminate: boolean = studentIds.length > 0 && cluster.studentIds.length > 0 && !checked && studentIds.some((id: number) => cluster.studentIds.some((studentId: number) => id === studentId))
                        const attach: boolean = !checked || indeterminate
                        return (
                            <MenuItem onClick={() => this.handleSelectCluster(cluster, attach)} disableRipple key={cluster.name}>

                                <ListItemIcon>
                                    <Checkbox
                                        color='primary'
                                        edge='start'
                                        checked={checked || indeterminate}
                                        indeterminate={indeterminate}
                                        disabled={studentIds.length === 0}
                                    />
                                </ListItemIcon>
                                {/*
                                <ListItemSecondaryAction>
                                    <Icon>{cluster.public ? 'public' : 'lock'}</Icon>
                                </ListItemSecondaryAction>
                                */}
                                <Typography variant='inherit' noWrap>{cluster.name}</Typography>
                            </MenuItem>
                        )
                    })}
                </ListFormList>
                {clusters && clusters.length === 0 || this.state.loadingInitialClusters && (
                    <ListFormEmptyState loading={this.state.loadingInitialClusters}>Your Topics will appear here.</ListFormEmptyState>
                )}
                <ListFormContent visible={this.state.creating}>
                    <>
                        <FormRow>
                            <FormRowElement>
                                <TextField
                                    variant='outlined'
                                    margin='dense'
                                    fullWidth
                                    name='cluster-name'
                                    label='Cluster'
                                    placeholder='Your Cluster name'
                                    value={this.state.inputValue}
                                    onChange={this.handleChange}
                                    required
                                />
                            </FormRowElement>
                            <FormRowElement>
                                <PrivacyPicker
                                    margin='dense'
                                    value={this.state.isPublic ? 'public' : 'private'}
                                    onChange={this.handlePrivacyChange}
                                    unlistable={false}
                                />
                            </FormRowElement>
                        </FormRow>
                        <FormRow justifyContent='flex-end'>
                            <LoadingButton loading={this.state.loadingCluster} type='submit' variant='text' color='primary'>Create</LoadingButton>
                        </FormRow>
                    </>
                </ListFormContent>
                <ListFormActionArea visible={!this.state.creating}>
                    <Button variant='text' onClick={() => this.handleOpenCreating()} startIcon={<Icon>add</Icon>}>Create Cluster</Button>
                </ListFormActionArea>
            </ListForm>
        )
    }
}

const mapStateToProps = (state) => ({
    clusters: state.clusters.items,
})

const mapDispatchToProps = {
    addToCluster,
    createCluster,
    deleteCluster,
    fetchClusters,
    removeFromCluster,
    queueSnackbar
}

export default connect(mapStateToProps, mapDispatchToProps)(ClustersForm)
