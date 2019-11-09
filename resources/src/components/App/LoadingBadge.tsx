import React from 'react'

import { Fade } from '@material-ui/core'

const LoadingBadge = () => {
    return (
        <Fade in={true}>
            <div className='loading_badge'>
                <svg id='b9017edc-87e2-42a6-a85f-f4c32a078fe3' xmlns='http://www.w3.org/2000/svg' width='80.198' height='80.254' viewBox='0 0 80.198 80.254'>
                    <linearGradient id='gradient-right' x1='0%' y='0%'>
                        <stop offset='0%' stopColor='#000'>
                            <animate id='a3' attributeName='stop-color' dur='2s' values='#022740; #022740; #034872; #034872; #CCC; #DDD; #022740' begin='0; a3.end' />
                        </stop>
                        <stop offset='100%' stopColor='#000'>
                            <animate id='a1' attributeName='stop-color' dur='2s' values='#EEE; #022740; #022740; #034872; #034872; #CCC; #DDD' begin='0; a1.end' />
                        </stop>
                    </linearGradient>
                    <linearGradient id='gradient-left' x1='0%' y='0%'>
                        <stop offset='0%' stopColor='#000'>
                            <animate id='l1' attributeName='stop-color' dur='2s' values='#CCC; #DDD; #80f4ff; #80f4ff; #00caff; #00caff; #CCC' begin='0; l1.end' />
                        </stop>
                        <stop offset='100%' stopColor='#000'>
                            <animate id='l2' attributeName='stop-color' dur='2s' values='#00caff; #00caff; #CCC; #DDD; #80f4ff;  #80f4ff; #00caff' begin='0; l2.end' />
                        </stop>
                    </linearGradient>
                    <path className='left' style={{fill: "url('#gradient-left')"}} d='M26.207,41,41,26.207,55.373,11.834,46.84,3.3a8.234,8.234,0,0,0-11.678,0l-8.535,8.534-23.3,23.3a8.307,8.307,0,0,0,0,11.728l23.3,23.3L35.16,78.7a8.235,8.235,0,0,0,11.679,0l8.533-8.534L41,55.793Z' transform='translate(-0.901 -0.873)'/>
                    <path className='right' style={{fill: "url('#gradient-right')"}} d='M78.675,35.136l-23.3-23.3L46.84,3.3a8.234,8.234,0,0,0-11.678,0l-8.535,8.534L41,26.207,55.793,41,41,55.793,26.627,70.165,35.16,78.7a8.235,8.235,0,0,0,11.679,0l8.533-8.534,23.3-23.3A8.3,8.3,0,0,0,78.675,35.136Z' transform='translate(-0.901 -0.873)'/>
                </svg>
            </div>
        </Fade>
    )
}

export default LoadingBadge
