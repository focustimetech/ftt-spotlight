import classNames from 'classnames'
import React from 'react'
import SwipeableViews from 'react-swipeable-views'

import {
    Icon,
    IconButton
} from '@material-ui/core'

/**
 * Default timeout for carousel auto-play
 */
const DEFAULT_TIMEOUT: number = 5000

interface IProps {
    children: any
    timeout?: number
}

interface IState {
    index: number
}

class Carousel extends React.Component<IProps, IState> {
    timeout: number
    timer: number
    state: IState = {
        index: 0
    }

    numChildren = (): number => {
        return this.props.children.length
    }

    componentDidMount() {
        this.timeout = this.props.timeout || DEFAULT_TIMEOUT
        if (this.timeout > 0 ) {
            this.timer = window.setInterval(() => this.onNext(), this.timeout)
        }
        console.log(this.props.children.length)
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        this.timer = null
    }

    onPrevious = () => {
        this.setState((state: IState) => ({
            index: state.index > 0 ? state.index - 1 : this.numChildren() - 1
        }))
    }

    onNext = () => {
        this.setState((state: IState) => ({
            index: state.index >= this.numChildren() - 1 ? 0 : state.index + 1
        }))
    }

    onChangeIndex = (index: number) => {
        if (index > 0 && index < this.numChildren()) {
            this.setState({ index })
        }
    }

    render() {
        const indecies: any[] = []
        for (let i: number = 0; i < this.numChildren(); i ++) {
            console.log('i = ' + i)
            indecies.push(
                <a
                    key={i}
                    onClick={() => this.onChangeIndex(i)}
                    className={classNames('carousel__index', {'--selected': i === this.state.index})}
                />
            )
        }

        return (
            <div className='carousel'>
                <div className='carousel__actions'>
                    <div className='carousel__previous'>
                        <IconButton onClick={() => this.onPrevious()} style={{color: 'inherit'}}>
                            <Icon>chevron_left</Icon>
                        </IconButton>
                    </div>
                    <div className='carousel__next'>
                        <IconButton onClick={() => this.onNext()} style={{color: 'inherit'}}>
                            <Icon>chevron_right</Icon>
                        </IconButton>
                    </div>
                </div>
                <div className='carousel__indecies'>
                    {indecies}
                </div>
                <SwipeableViews index={this.state.index}>
                    {this.props.children}
                </SwipeableViews>
            </div>
        )
    }
}

export default Carousel
