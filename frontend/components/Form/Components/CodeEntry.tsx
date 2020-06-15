import classNames from 'classnames'
import React from 'react'

import { 
    TextField
} from '@material-ui/core'
import Flexbox from '../../Layout/Flexbox'

interface ICodeEntryProps {
    length: number
    chunkSize?: number
}

interface ICodeEntryState {
    value: string
}

interface ITextField {
    index: number
    margin: boolean
}

class CodeEntry extends React.Component<ICodeEntryProps, ICodeEntryState> {
    state: ICodeEntryState = {
        value: ''
    }

    inputRefs = Array(this.props.length)

    handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const { value } = event.target
        if (value.length > this.props.length) {
            return
        }
        const stringIndex: number = index > this.state.value.length ? this.state.value.length - 1 : index
        this.setState((state: ICodeEntryState) => {
            return { value: `${state.value.substr(0, stringIndex)}${value}${state.value.substr(stringIndex)}` }
        }, () => {
            if (this.state.value.length < this.props.length) {
                this.inputRefs[this.state.value.length - 1].focus()
            }
        })
    }

    componentDidMount() {
        for (let i: number = 0; i < this.props.length; i ++) {
            this.inputRefs.push(React.createRef())
        }
        console.log(this.inputRefs)
    }

    render() {
        const { length } = this.props
        const chunkSize = this.props.chunkSize || 1
        const textFields: ITextField[] = []
        let i: number = 0;
        for (let i: number = 0; i < length; i ++) [
            textFields.push({ index: i, margin: (i + 1 ) % chunkSize === 0 })
        ]
        return (
            <div className='code-entry'>
                <Flexbox className='code-entry__text-fields'>
                    {textFields.map((textField: ITextField) => {
                        const { index, margin } = textField
                        return (
                            <TextField
                                className={classNames({ '--margin': margin })}
                                value={this.state.value[index] || ''}
                                onChange={(event) => this.handleChange(event, index)}
                                variant='outlined'
                                style={{ width: 48 }}
                                ref={this.inputRefs[index]}
                            />
                        )
                    })}
                </Flexbox>
            </div>
        )
    }
}

export default CodeEntry
