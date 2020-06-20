import React from 'react'
import { connect } from 'react-redux'

import {
    Button,
    Checkbox,
    FormControl,
    Icon,
    InputLabel,
    ListItem,
    ListItemIcon,
    MenuItem,
    Typography,
    TextField,
} from '@material-ui/core'

import { createCluster, deleteCluster, fetchClusters } from '../../../actions/clusterActions'
import { ISnackbar, queueSnackbar } from '../../../actions/snackbarActions'
import { ICluster, INewCluster } from '../../../types/cluster'

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
    createCluster: (cluster: INewCluster) => Promise<any>
    deleteCluster: (clusterId: number) => Promise<any>
    fetchClusters: () => Promise<any>
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
        //
    }

    handleAddToCluster = (cluster: ICluster) => {
        //
    }

    handlePrivacyChange = (setting: PrivacySetting) => {
        this.setState({ isPublic: setting === 'public' })
    }

    render() {
        const { clusters, studentIds } = this.props

        return (
            <ListForm onSubmit={this.handleSubmit} autoComplete='off'>
                <ListFormHeader>Clusters</ListFormHeader>
                <ListFormList>
                    {clusters && clusters.length > 0 && clusters.map((cluster: ICluster) => (
                        <MenuItem onClick={() => this.handleAddToCluster(cluster)} disableRipple key={cluster.name}>
                            <ListItemIcon>
                                <Checkbox
                                    edge='start'
                                    checked={cluster.studentIds.some((id: number) => studentIds.some((studentId: number) => id === studentId))}
                                    indeterminate={!cluster.studentIds.every((id: number) => studentIds.some((studentId: number) => id === studentId))}
                                />
                            </ListItemIcon>
                            <Typography variant='inherit' noWrap>{cluster.name}</Typography>
                        </MenuItem>
                    ))}
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

const mapDispatchToProps = { createCluster, deleteCluster, fetchClusters, queueSnackbar }

export default connect(mapStateToProps, mapDispatchToProps)(ClustersForm)
