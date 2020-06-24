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

export interface ICarouselImage {
    link: string
    src: string
}

interface IProps {
    images: ICarouselImage[]
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
        return this.props.images.length
    }

    componentDidMount() {
        if (this.props.timeout === 0) {
            return
        }
        this.timeout = this.props.timeout || DEFAULT_TIMEOUT
        this.resetTimer()
    }

    componentWillUnmount() {
        clearInterval(this.timer)
        this.timer = null
    }

    onPrevious = () => {
        this.setState((state: IState) => ({
            index: state.index > 0 ? state.index - 1 : this.numChildren() - 1
        }), () => {
            this.resetTimer()
        })
    }

    onNext = () => {
        this.setState((state: IState) => ({
            index: state.index >= this.numChildren() - 1 ? 0 : state.index + 1
        }), () => {
            this.resetTimer()
        })
    }

    onChangeIndex = (index: number) => {
        if (index >= 0 && index < this.numChildren()) {
            this.setState({ index }, () => {
                this.resetTimer()
            })
        }
    }

    resetTimer = () => {
        if (this.timer) {
            clearInterval(this.timer)
        }
        if (this.timeout) {
            this.timer = window.setInterval(() => this.onNext(), this.timeout)
        }
    }

    render() {
        const indecies: any[] = []
        for (let i: number = 0; i < this.numChildren(); i ++) {
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
                    {this.props.images.map((image: ICarouselImage) => (
                        <a key={image.src} href={image.link} target='_blank'><img src={image.src} /></a>
                    ))}
                </SwipeableViews>
            </div>
        )
    }
}

export default Carousel
