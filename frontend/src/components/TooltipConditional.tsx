import React from 'react'

import Tooltip, { TooltipProps } from '@material-ui/core/Tooltip'

interface ITooltipConditionalProps extends TooltipProps {
    disabled?: boolean
}

const TooltipConditional = (props: ITooltipConditionalProps) => {
    const { disabled, children, ...rest } = props

    return disabled ? children : <Tooltip {...rest}>{children}</Tooltip>
}

export default TooltipConditional
